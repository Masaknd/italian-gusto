// Node-only preload for deterministic SSR tests. Production code never imports this file.
import { createHash } from 'node:crypto';

if (process.env.GUSTO_TRANSLATION_FIXTURES !== '1') {
  throw new Error(
    'The CMS fetch fixture must only run in the isolated translation test server',
  );
}

const hash = (item) =>
  createHash('sha256')
    .update(JSON.stringify([item.name, item.description ?? '']))
    .digest('hex');
const image = {
  url: '/images/slide-1.jpg',
  width: 1200,
  height: 800,
  alt: '日本語の料理写真',
};
const makeRecord = (
  id,
  name,
  nameEn,
  category,
  sortOrder,
  status = 'approved',
) => {
  const source = { name, description: `${name}の説明。` };
  return {
    id,
    ...source,
    nameEn,
    descriptionEn: `Freshly prepared ${nameEn.toLowerCase()}.`,
    category: [category],
    menuCategory: [category],
    priceExcludingTax: 1200,
    image,
    sortOrder,
    isAvailable: true,
    englishStatus: [status],
    englishSourceHash: hash(source),
    updatedAt: '2026-09-21T10:00:00.000Z',
    createdAt: '2026-09-01T10:00:00.000Z',
    publishedAt: '2026-09-21T10:00:00.000Z',
  };
};
const records = [
  makeRecord('approved-pasta', '季節のパスタ', 'Seasonal pasta', 'パスタ', 1),
  makeRecord('approved-pizza', '薪窯ピザ', 'Wood-fired pizza', 'ピザ', 2),
  {
    ...makeRecord(
      'stale-risotto',
      '更新されたリゾット',
      'Old risotto',
      'アラカルト',
      3,
    ),
    englishSourceHash: hash({ name: '旧リゾット', description: '古い説明。' }),
  },
  makeRecord(
    'review-salad',
    'レビュー待ちのサラダ',
    'Unreviewed salad',
    'サラダ',
    4,
    'needs-review',
  ),
];
const preview = makeRecord(
  'stale-risotto',
  '下書きのリゾット',
  'Draft mushroom risotto',
  'アラカルト',
  3,
  'needs-review',
);
const originalFetch = globalThis.fetch;

globalThis.fetch = async (input, init) => {
  const url = new URL(input instanceof Request ? input.url : String(input));
  if (
    url.hostname === 'api-free.deepl.com' ||
    url.hostname === 'api.deepl.com'
  ) {
    throw new Error('A visitor request must never call DeepL');
  }
  if (url.hostname !== 'gusto-fixture.microcms.io')
    return originalFetch(input, init);
  const method =
    init?.method ?? (input instanceof Request ? input.method : 'GET');
  if (method !== 'GET')
    throw new Error('Browser fixtures never write CMS content');
  const match = url.pathname.match(
    /^\/api\/v1\/(menus|featured-menus)(?:\/([\w-]+))?$/,
  );
  if (!match)
    return Response.json(
      { message: 'Unknown fixture endpoint' },
      { status: 404 },
    );
  const id = match[2];
  if (id) {
    if (url.searchParams.has('draftKey')) {
      if (
        url.searchParams.get('draftKey') !== 'fixture-draft-key' ||
        id !== preview.id
      ) {
        return Response.json({ message: 'Invalid draft' }, { status: 404 });
      }
      return Response.json(
        url.searchParams.get('fields') === 'id' ? { id } : preview,
      );
    }
    const record = records.find((item) => item.id === id);
    return record
      ? Response.json(record)
      : Response.json({ message: 'Missing content' }, { status: 404 });
  }
  const offset = Number(url.searchParams.get('offset') ?? 0);
  const limit = Number(url.searchParams.get('limit') ?? 100);
  return Response.json({
    contents: records.slice(offset, offset + limit),
    totalCount: records.length,
    offset,
    limit,
  });
};
