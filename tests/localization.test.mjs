import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { test } from 'node:test';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});
const { sourceHash } = await import('../lib/translation-source.ts');
const { localizeMenu, localizeFeaturedMenu, localizeMenuContent } =
  await import('../lib/microcms/localization.ts');
const { en } = await import('../locales/en.ts');
const { ja } = await import('../locales/ja.ts');

const source = { name: '季節のパスタ', description: '旬の野菜を使用。' };
const item = {
  id: 'pasta-1',
  ...source,
  category: ['Pasta'],
  priceExcludingTax: 1200,
  sortOrder: 1,
  isAvailable: true,
  image: { url: 'https://images.example/pasta.jpg', alt: '和文の説明' },
  nameEn: 'Seasonal pasta',
  descriptionEn: 'Made with seasonal vegetables.',
  englishStatus: ['approved'],
  englishSourceHash: sourceHash(source),
};

test('Japanese is the default, independent of translation status', () => {
  const result = localizeMenu(
    { ...item, englishStatus: ['failed'] },
    'ja',
    ja.menu.categories,
  );
  assert.equal(result.name, source.name);
  assert.equal(result.description, source.description);
  assert.equal(result.category, 'Pasta');
  assert.equal(result.categoryLabel, 'パスタ');
  assert.equal(result.priceExcludingTax, 1200);
  const content = localizeMenuContent(
    { menus: [item], featuredMenus: [] },
    undefined,
    ja.menu.categories,
  );
  assert.equal(content.menus[0].name, source.name);
});

test('English uses stored translation, stable category keys and only public fields', () => {
  const result = localizeMenu(item, 'en', en.menu.categories);
  assert.equal(result.name, 'Seasonal pasta');
  assert.equal(result.description, 'Made with seasonal vegetables.');
  assert.equal(result.category, 'Pasta');
  assert.equal(result.categoryLabel, 'Pasta');
  assert.equal(result.image.alt, result.name);
  assert.equal(result.priceExcludingTax, 1200);
  for (const key of [
    'nameEn',
    'descriptionEn',
    'englishStatus',
    'englishSourceHash',
  ]) {
    assert.equal(key in result, false);
  }
  assert.equal(JSON.stringify(result).includes(source.name), false);
});

test('English never silently falls back for missing, unreviewed, stale or incomplete text', () => {
  for (const patch of [
    { nameEn: undefined },
    { descriptionEn: ' ' },
    { englishStatus: undefined },
    { englishStatus: ['needs-review'] },
    { englishStatus: ['failed'] },
    { englishStatus: ['approved', 'pending'] },
    { englishSourceHash: undefined },
    { name: '変更した料理名' },
    { description: '変更した説明' },
  ]) {
    assert.equal(
      localizeMenu({ ...item, ...patch }, 'en', en.menu.categories),
      null,
    );
  }
});

test('preview accepts matching needs-review text only for the selected draft record', () => {
  const draft = { ...item, englishStatus: ['needs-review'] };
  assert.equal(
    localizeMenu(draft, 'en', en.menu.categories, true).name,
    'Seasonal pasta',
  );
  assert.equal(
    localizeMenu({ ...draft, name: 'changed' }, 'en', en.menu.categories, true),
    null,
  );
  const result = localizeMenuContent(
    { menus: [draft, { ...draft, id: 'other' }], featuredMenus: [] },
    'en',
    en.menu.categories,
    { endpoint: 'menus', id: item.id },
  );
  assert.deepEqual(
    result.menus.map(({ id }) => id),
    [item.id],
  );
  assert.equal(result.omittedMenus, 1);
});

test('optional descriptions remain optional and obsolete translated descriptions are dropped', () => {
  const noDescription = { ...item, description: undefined };
  noDescription.englishSourceHash = sourceHash(noDescription);
  assert.equal(
    localizeMenu(noDescription, 'en', en.menu.categories).description,
    undefined,
  );
});

test('unknown categories use a localized fallback without changing their anchor key', () => {
  const result = localizeMenu(
    { ...item, category: ['新カテゴリー'] },
    'en',
    en.menu.categories,
  );
  assert.equal(result.category, '新カテゴリー');
  assert.equal(result.categoryLabel, 'Other');
  assert.equal(
    localizeMenu(
      { ...item, category: ['新カテゴリー'] },
      'ja',
      ja.menu.categories,
    ).categoryLabel,
    '新カテゴリー',
  );
});

test('featured results are filtered before selecting the first five, with omissions counted', () => {
  const featured = Array.from({ length: 7 }, (_, index) => ({
    ...item,
    id: `pick-${index}`,
    menuCategory: 'Pasta',
    englishStatus: index === 0 ? ['pending'] : ['approved'],
  }));
  const result = localizeMenuContent(
    { menus: [], featuredMenus: featured },
    'en',
    en.menu.categories,
  );
  assert.deepEqual(
    result.featuredMenus.map(({ id }) => id),
    ['pick-1', 'pick-2', 'pick-3', 'pick-4', 'pick-5'],
  );
  assert.equal(result.omittedFeaturedMenus, 1);
  const pick = localizeFeaturedMenu(featured[1], 'en');
  assert.equal(pick.menuCategory, 'Pasta');
  assert.equal('englishStatus' in pick, false);
});

test('source fingerprint changes only with exact source text', () => {
  assert.equal(
    sourceHash(source),
    sourceHash({ ...source, priceExcludingTax: 1500 }),
  );
  assert.notEqual(
    sourceHash(source),
    sourceHash({ ...source, name: `${source.name} ` }),
  );
  assert.equal(
    sourceHash({ name: '料理' }),
    sourceHash({ name: '料理', description: '' }),
  );
});

test('recommendation select fields resolve to the canonical category key', () => {
  const featured = localizeFeaturedMenu(
    { ...item, menuCategory: ['パスタ'] },
    'en',
  );
  assert.equal(featured.menuCategory, 'パスタ');
});
