import './register-ts.mjs';
import nextEnv from '@next/env';
import { writeFile } from 'node:fs/promises';
const { sourceHash } = await import('../lib/translation-source.ts');
const { translationEndpoints } =
  await import('../lib/translations/contracts.ts');
const { createTranslationCms } = await import('../lib/translations/cms.ts');
const { createTranslationQueue } = await import('../lib/translations/queue.ts');

nextEnv.loadEnvConfig(process.cwd());
const args = process.argv.slice(2);
const outputIndex = args.indexOf('--output');
const allowed = new Set(['--enqueue', '--output', '--help']);
for (let index = 0; index < args.length; index++) {
  if (args[index] === '--output') {
    index++;
    continue;
  }
  if (!allowed.has(args[index]))
    throw new Error(`Unknown argument: ${args[index]}`);
}
if (args.includes('--help')) {
  console.log(
    'pnpm translations:audit [--output report.json] [--enqueue]\nDefault: read published records and report translation coverage.\n--enqueue: queue both APIs for draft-only translation; never approve or publish.\nRequires Node 24.',
  );
  process.exit(0);
}
function setting(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server setting: ${name}`);
  return value;
}
try {
  const serviceDomain = setting('MICROCMS_SERVICE_DOMAIN');
  if (!/^[a-z0-9-]+$/.test(serviceDomain))
    throw new Error('Invalid CMS service domain');
  const records = [];
  for (const endpoint of translationEndpoints) {
    for (let offset = 0; ; offset += 100) {
      const response = await fetch(
        `https://${serviceDomain}.microcms.io/api/v1/${endpoint}?limit=100&offset=${offset}`,
        {
          headers: { 'X-MICROCMS-API-KEY': setting('MICROCMS_API_KEY') },
          signal: AbortSignal.timeout(15000),
        },
      );
      if (!response.ok)
        throw new Error(`CMS audit responded ${response.status}`);
      const page = await response.json();
      records.push(
        ...page.contents.map((item) => ({
          endpoint,
          id: item.id,
          name: item.name,
          description: item.description ?? '',
          nameEn: item.nameEn ?? '',
          descriptionEn: item.descriptionEn ?? '',
          status: item.englishStatus?.[0] ?? 'missing',
          sourceMatches: item.englishSourceHash === sourceHash(item),
          complete: Boolean(
            item.nameEn?.trim() &&
            (!item.description?.trim() || item.descriptionEn?.trim()),
          ),
        })),
      );
      if (
        offset + page.contents.length >= page.totalCount ||
        page.contents.length < 100
      )
        break;
    }
  }
  const ready = records.filter(
    (item) => item.status === 'approved' && item.sourceMatches && item.complete,
  ).length;
  const report = {
    scope: 'published',
    total: records.length,
    approvedAndCurrent: ready,
    needsAttention: records.length - ready,
    records,
  };
  if (outputIndex >= 0) {
    const output = args[outputIndex + 1];
    if (!output || output.startsWith('--'))
      throw new Error('--output requires a file path');
    await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, {
      flag: 'wx',
    });
  }
  console.log(
    JSON.stringify(
      {
        total: report.total,
        approvedAndCurrent: ready,
        needsAttention: report.needsAttention,
        reportWritten: outputIndex >= 0,
      },
      null,
      2,
    ),
  );
  if (args.includes('--enqueue')) {
    setting('DEEPL_API_KEY');
    setting('QSTASH_CURRENT_SIGNING_KEY');
    setting('QSTASH_NEXT_SIGNING_KEY');
    const origin = new URL(setting('TRANSLATION_SITE_URL'));
    if (
      origin.protocol !== 'https:' ||
      origin.username ||
      origin.password ||
      origin.pathname !== '/' ||
      origin.search ||
      origin.hash
    )
      throw new Error('TRANSLATION_SITE_URL must be a public HTTPS origin');
    const cms = createTranslationCms({
      serviceDomain,
      apiKey: setting('MICROCMS_TRANSLATION_API_KEY'),
    });
    // Read-only permission preflight before enqueuing any work.
    for (const endpoint of translationEndpoints) await cms.list(endpoint);
    const queue = createTranslationQueue({
      token: setting('QSTASH_TOKEN'),
      baseUrl: process.env.QSTASH_URL || undefined,
      destination: new URL('/api/translations/process', origin).toString(),
      queueName:
        process.env.QSTASH_TRANSLATION_QUEUE || 'gusto-menu-translations',
    });
    for (const endpoint of translationEndpoints)
      await queue.enqueue({ kind: 'reconcile', endpoint, offset: 0 });
    console.log(
      'Queued draft translation reconciliation for menus and featured-menus. Review and publish in MicroCMS when ready.',
    );
  }
} catch (error) {
  console.error(
    error instanceof Error ? error.message : 'Translation audit failed',
  );
  process.exitCode = 1;
}
