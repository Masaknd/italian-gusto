import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { registerHooks } from 'node:module';
import { test } from 'node:test';

registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(
      specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)
        ? `${specifier}.ts`
        : specifier,
      context,
    );
  },
});
const { sourceHash } = await import('../lib/translation-source.ts');
const { parseJob, isActive } = await import('../lib/translations/contracts.ts');
const { needsTranslation, translateRecord } =
  await import('../lib/translations/worker.ts');
const { createTranslationCms } = await import('../lib/translations/cms.ts');
const { verifyMicroCmsSignature, webhookJob } =
  await import('../lib/translations/webhook.ts');

const japanese = { name: '季節のパスタ', description: '旬の野菜を使用。' };
const initial = () => ({
  metadata: {
    id: 'dish-1',
    status: ['PUBLISH'],
    draftKey: null,
    updatedAt: '2026-09-21T10:00:00Z',
  },
  content: {
    id: 'dish-1',
    ...japanese,
    priceExcludingTax: 1200,
    updatedAt: '2026-09-21T10:00:00Z',
  },
});
const reviewed = () => {
  const snapshot = initial();
  Object.assign(snapshot.content, {
    nameEn: 'Seasonal pasta',
    descriptionEn: 'Made with seasonal vegetables.',
    englishStatus: ['approved'],
    englishSourceHash: sourceHash(japanese),
  });
  return snapshot;
};

function workerHarness(snapshot = initial()) {
  const state = {
    snapshot: structuredClone(snapshot),
    patches: [],
    translations: [],
    reads: 0,
    duringTranslate: null,
    beforeRead: null,
    response: ['Seasonal pasta', 'Made with seasonal vegetables.'],
  };
  const dependencies = {
    async read(endpoint, id) {
      assert.equal(endpoint, 'menus');
      assert.equal(id, 'dish-1');
      state.reads += 1;
      state.beforeRead?.(state.reads);
      return structuredClone(state.snapshot);
    },
    async patchDraft(endpoint, id, patch) {
      assert.equal(endpoint, 'menus');
      assert.equal(id, 'dish-1');
      state.patches.push(structuredClone(patch));
      Object.assign(state.snapshot.content, patch, {
        updatedAt: `revision-${state.patches.length}`,
      });
      Object.assign(state.snapshot.metadata, {
        status: ['PUBLISH_AND_DRAFT'],
        draftKey: 'draft-secret',
        updatedAt: `revision-${state.patches.length}`,
      });
    },
    async translate(texts) {
      state.translations.push(texts);
      await state.duringTranslate?.();
      if (state.response instanceof Error) throw state.response;
      return state.response;
    },
  };
  return { state, run: () => translateRecord('menus', 'dish-1', dependencies) };
}

test('approved stored English is idempotent and shared price edits do not trigger translation', async () => {
  const snapshot = reviewed();
  snapshot.content.priceExcludingTax = 2000;
  snapshot.content.image = { url: 'https://images.example/new.jpg' };
  assert.equal(needsTranslation(snapshot.content), false);
  const harness = workerHarness(snapshot);
  assert.deepEqual(await harness.run(), { outcome: 'current' });
  assert.deepEqual(harness.state.patches, []);
  assert.deepEqual(harness.state.translations, []);
});

test('ambiguous translation status cannot be treated as current English', () => {
  const snapshot = reviewed();
  snapshot.content.englishStatus = ['approved', 'pending'];
  assert.equal(needsTranslation(snapshot.content), true);
});

test('fresh Japanese source becomes pending then needs-review, never automatically approved', async () => {
  const { state, run } = workerHarness();
  assert.deepEqual(await run(), { outcome: 'needs-review' });
  assert.deepEqual(state.translations, [[japanese.name, japanese.description]]);
  assert.deepEqual(state.patches, [
    { englishStatus: ['pending'] },
    {
      nameEn: 'Seasonal pasta',
      descriptionEn: 'Made with seasonal vegetables.',
      englishSourceHash: sourceHash(japanese),
      englishStatus: ['needs-review'],
    },
  ]);
  assert.ok(
    state.patches.every(
      (patch) =>
        !('name' in patch) &&
        !('description' in patch) &&
        !('priceExcludingTax' in patch),
    ),
  );
  assert.deepEqual(await run(), { outcome: 'current' });
  assert.equal(state.translations.length, 1);
});

test('Japanese edits invalidate previously approved English and produce a new review draft', async () => {
  const snapshot = reviewed();
  snapshot.content.description = 'トマトのソース。';
  assert.equal(needsTranslation(snapshot.content), true);
  const { state, run } = workerHarness(snapshot);
  state.response = ['Seasonal pasta', 'With tomato sauce.'];
  await run();
  assert.equal(
    state.snapshot.content.englishSourceHash,
    sourceHash(snapshot.content),
  );
  assert.equal(state.snapshot.content.descriptionEn, 'With tomato sauce.');
  assert.deepEqual(state.snapshot.content.englishStatus, ['needs-review']);
});

test('DeepL failures persist failed status and reject so the queue retries', async () => {
  const { state, run } = workerHarness();
  const failure = new Error('DeepL responded 503');
  state.response = failure;
  await assert.rejects(run(), (error) => error === failure);
  assert.deepEqual(state.patches, [
    { englishStatus: ['pending'] },
    { englishStatus: ['failed'] },
  ]);
  assert.equal(state.snapshot.content.englishSourceHash, undefined);
});

test('incomplete translation output is retriable and never stored as translated content', async () => {
  for (const response of [['Only a name'], ['Name', ' '], []]) {
    const { state, run } = workerHarness();
    state.response = response;
    await assert.rejects(run(), /incomplete text/);
    assert.deepEqual(state.patches.at(-1), { englishStatus: ['failed'] });
    assert.equal(state.snapshot.content.nameEn, undefined);
  }
});

test('a record without a Japanese description clears obsolete English description', async () => {
  const snapshot = initial();
  delete snapshot.content.description;
  snapshot.content.descriptionEn = 'Outdated description';
  const { state, run } = workerHarness(snapshot);
  state.response = ['Seasonal pasta'];
  await run();
  assert.deepEqual(state.translations, [[japanese.name]]);
  assert.equal(state.snapshot.content.descriptionEn, '');
});

test('edits to Japanese or reviewed English during translation are not overwritten', async () => {
  for (const edit of [
    { name: '新しい料理' },
    { nameEn: 'Editor’s approved name', englishStatus: ['approved'] },
  ]) {
    const { state, run } = workerHarness();
    state.duringTranslate = () => Object.assign(state.snapshot.content, edit);
    assert.deepEqual(await run(), { outcome: 'superseded' });
    assert.deepEqual(state.patches, [{ englishStatus: ['pending'] }]);
    for (const [key, value] of Object.entries(edit))
      assert.deepEqual(state.snapshot.content[key], value);
  }
});

test('translation failure does not replace a concurrent editorial update with failed status', async () => {
  const { state, run } = workerHarness();
  state.response = new Error('Provider outage');
  state.duringTranslate = () =>
    Object.assign(state.snapshot.content, {
      nameEn: 'Reviewed manually',
      englishStatus: ['approved'],
    });
  await assert.rejects(run(), /Provider outage/);
  assert.deepEqual(state.patches, [{ englishStatus: ['pending'] }]);
  assert.deepEqual(state.snapshot.content.englishStatus, ['approved']);
});

test('deleted or inactive content is discarded without translation', async () => {
  const { state, run } = workerHarness(null);
  assert.deepEqual(await run(), { outcome: 'inactive' });
  assert.deepEqual(state.translations, []);
  assert.deepEqual(state.patches, []);
  const active = workerHarness();
  active.state.duringTranslate = () => {
    active.state.snapshot = null;
  };
  assert.deepEqual(await active.run(), { outcome: 'superseded' });
  assert.equal(active.state.patches.length, 1);
});

test('source changed before translation begins does not receive a stale pending draft', async () => {
  const { state, run } = workerHarness();
  state.beforeRead = (count) => {
    if (count === 2) state.snapshot.content.name = 'New source';
  };
  assert.deepEqual(await run(), { outcome: 'superseded' });
  assert.deepEqual(state.patches, []);
  assert.deepEqual(state.translations, []);
});

test('English edits immediately after the pending write are preserved', async () => {
  for (const edit of [
    {
      nameEn: 'Editor’s approved name',
      descriptionEn: 'Editor’s description',
      englishStatus: ['approved'],
      englishSourceHash: sourceHash(japanese),
    },
    { nameEn: 'Editor’s work in progress' },
  ]) {
    const { state, run } = workerHarness();
    state.beforeRead = (count) => {
      if (count === 3) Object.assign(state.snapshot.content, edit);
    };
    assert.deepEqual(await run(), { outcome: 'superseded' });
    assert.equal(state.snapshot.content.nameEn, edit.nameEn);
    assert.equal(state.patches.length, 1);
    assert.deepEqual(state.translations, []);
  }
});

const webhook = (oldValue, newValue) => ({
  service: 'gusto-test',
  api: 'menus',
  id: 'dish-1',
  contents: { old: oldValue, new: newValue },
});
const published = (source) => ({
  status: ['PUBLISH'],
  publishValue: source,
  draftValue: null,
});
const draft = (source) => ({
  status: ['PUBLISH_AND_DRAFT'],
  publishValue: japanese,
  draftValue: source,
});

test('webhook signatures accept authentic bytes and reject missing, malformed and tampered input', () => {
  const secret = 'test-webhook-secret';
  const body = JSON.stringify(webhook(null, published(japanese)));
  const signature = createHmac('sha256', secret).update(body).digest('hex');
  assert.equal(verifyMicroCmsSignature(body, signature, secret), true);
  assert.equal(verifyMicroCmsSignature(`${body} `, signature, secret), false);
  assert.equal(verifyMicroCmsSignature(body, signature, 'wrong-secret'), false);
  for (const bad of [
    null,
    '',
    'a'.repeat(63),
    'g'.repeat(64),
    'a'.repeat(66),
  ]) {
    assert.equal(verifyMicroCmsSignature(body, bad, secret), false);
  }
  assert.equal(verifyMicroCmsSignature(body, signature, ''), false);
});

test('webhooks ignore English/status/price-only writes, preventing translation loops', () => {
  for (const patch of [
    { nameEn: 'English text' },
    { englishStatus: ['needs-review'] },
    { englishStatus: ['approved'] },
    { priceExcludingTax: 2500 },
  ]) {
    assert.equal(
      webhookJob(
        webhook(draft(japanese), draft({ ...japanese, ...patch })),
        'gusto-test',
      ),
      null,
    );
  }
});

test('new Japanese source and changed draft text enqueue only identity, with draft preferred', () => {
  for (const event of [
    webhook(null, published(japanese)),
    webhook(published(japanese), draft({ ...japanese, name: '新しい料理' })),
    webhook(
      draft(japanese),
      draft({ ...japanese, description: '変更した説明。' }),
    ),
  ]) {
    assert.deepEqual(webhookJob(event, 'gusto-test'), {
      kind: 'translate',
      endpoint: 'menus',
      contentId: 'dish-1',
    });
  }
});

test('webhooks discard deleted/closed records and reject foreign services or endpoints', () => {
  assert.equal(
    webhookJob(webhook(published(japanese), null), 'gusto-test'),
    null,
  );
  assert.equal(
    webhookJob(
      webhook(null, { ...published(japanese), status: ['CLOSED'] }),
      'gusto-test',
    ),
    null,
  );
  assert.throws(
    () => webhookJob(webhook(null, published(japanese)), 'foreign-service'),
    /Unexpected/,
  );
  assert.throws(
    () =>
      webhookJob(
        { ...webhook(null, published(japanese)), api: 'users' },
        'gusto-test',
      ),
    /Unexpected/,
  );
});

test('job parsing constrains endpoint, identity and reconciliation offset', () => {
  assert.deepEqual(
    parseJob({ kind: 'reconcile', endpoint: 'featured-menus', offset: 100 }),
    { kind: 'reconcile', endpoint: 'featured-menus', offset: 100 },
  );
  for (const value of [
    null,
    { kind: 'translate', endpoint: 'menus', contentId: '../users' },
    { kind: 'translate', endpoint: 'users', contentId: 'dish-1' },
    { kind: 'reconcile', endpoint: 'menus', offset: -1 },
    { kind: 'reconcile', endpoint: 'menus', offset: 1.2 },
  ])
    assert.throws(() => parseJob(value));
  assert.equal(isActive({ status: ['DRAFT'] }), true);
  assert.equal(isActive({ status: ['PUBLISH_AND_DRAFT'] }), true);
  assert.equal(isActive({ status: ['PUBLISH', 'CLOSED'] }), false);
});

function cmsHarness(responses) {
  const calls = [];
  const cms = createTranslationCms(
    { serviceDomain: 'gusto-test', apiKey: 'test-write-key' },
    async (url, options) => {
      calls.push({ url, options });
      assert.ok(responses.length > 0, `Unexpected request: ${url}`);
      const next = responses.shift();
      return next instanceof Response ? next : Response.json(next);
    },
  );
  return { cms, calls };
}

test('CMS retrieves draft content using management metadata and writes only status=draft', async () => {
  const metadata = {
    ...initial().metadata,
    status: ['PUBLISH_AND_DRAFT'],
    draftKey: 'draft+secret/token',
  };
  const { cms, calls } = cmsHarness([
    metadata,
    initial().content,
    { id: 'dish-1' },
  ]);
  const snapshot = await cms.read('menus', 'dish-1');
  assert.deepEqual(snapshot.metadata, metadata);
  assert.equal(
    calls[0].url,
    'https://gusto-test.microcms-management.io/api/v1/contents/menus/dish-1',
  );
  assert.equal(
    calls[1].url,
    'https://gusto-test.microcms.io/api/v1/menus/dish-1?draftKey=draft%2Bsecret%2Ftoken',
  );
  const patch = { nameEn: 'Seasonal pasta', englishStatus: ['needs-review'] };
  await cms.patchDraft('menus', 'dish-1', patch);
  assert.equal(
    calls[2].url,
    'https://gusto-test.microcms.io/api/v1/menus/dish-1?status=draft',
  );
  assert.equal(calls[2].options.method, 'PATCH');
  assert.deepEqual(JSON.parse(calls[2].options.body), patch);
  for (const { options } of calls) {
    assert.equal(options.cache, 'no-store');
    assert.equal(options.headers['X-MICROCMS-API-KEY'], 'test-write-key');
  }
});

test('CMS refuses to use the published version when draft metadata has no draft key', async () => {
  const { cms, calls } = cmsHarness([
    { ...initial().metadata, status: ['DRAFT'], draftKey: null },
  ]);
  await assert.rejects(cms.read('menus', 'dish-1'), /missing a draft key/);
  assert.equal(calls.length, 1);
});

test('CMS deleted and closed records return inactive without fetching content', async () => {
  for (const response of [
    new Response(null, { status: 404 }),
    { ...initial().metadata, status: ['CLOSED'] },
  ]) {
    const { cms, calls } = cmsHarness([response]);
    assert.equal(await cms.read('menus', 'dish-1'), null);
    assert.equal(calls.length, 1);
  }
});

test('CMS pagination preserves management totalCount and explicit offsets', async () => {
  const first = {
    contents: Array.from({ length: 100 }, (_, index) => ({
      ...initial().metadata,
      id: `dish-${index}`,
    })),
    totalCount: 101,
  };
  const last = {
    contents: [{ ...initial().metadata, id: 'dish-100' }],
    totalCount: 101,
  };
  const { cms, calls } = cmsHarness([first, last]);
  assert.deepEqual(await cms.list('menus'), first);
  assert.deepEqual(await cms.list('menus', 100), last);
  assert.equal(
    calls[0].url,
    'https://gusto-test.microcms-management.io/api/v1/contents/menus?limit=100&offset=0',
  );
  assert.equal(
    calls[1].url,
    'https://gusto-test.microcms-management.io/api/v1/contents/menus?limit=100&offset=100',
  );
});

test('CMS upstream and draft write failures reject instead of acknowledging lost work', async () => {
  const upstream = cmsHarness([new Response(null, { status: 503 })]);
  await assert.rejects(upstream.cms.read('menus', 'dish-1'), /503/);
  const disappeared = cmsHarness([new Response(null, { status: 404 })]);
  await assert.rejects(
    disappeared.cms.patchDraft('menus', 'dish-1', {
      englishStatus: ['pending'],
    }),
    /disappeared/,
  );
});

test('saving a new draft of untranslated published Japanese requests translation', () => {
  const text = { name: 'パスタ', description: '旬の野菜。' };
  const payload = {
    service: 'gusto',
    api: 'menus',
    id: 'dish',
    contents: {
      old: { status: ['PUBLISH'], publishValue: text },
      new: {
        status: ['PUBLISH', 'DRAFT'],
        publishValue: text,
        draftValue: text,
      },
    },
  };
  assert.deepEqual(webhookJob(payload, 'gusto'), {
    kind: 'translate',
    endpoint: 'menus',
    contentId: 'dish',
  });
  payload.contents.new.draftValue = { ...text, englishStatus: ['pending'] };
  assert.equal(webhookJob(payload, 'gusto'), null);
});
