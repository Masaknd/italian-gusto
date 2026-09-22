import { expect, test, type Page } from '@playwright/test';
import { createHmac } from 'node:crypto';

test.skip(
  process.env.GUSTO_TRANSLATION_FIXTURES !== '1',
  'Run with playwright.translations.config.ts and its isolated CMS fixture',
);

const pageErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page) ?? []).toEqual([]);
});

const approvedEnglish = ['Seasonal pasta', 'Wood-fired pizza'];
const japanese = [
  '季節のパスタ',
  '薪窯ピザ',
  '更新されたリゾット',
  'レビュー待ちのサラダ',
];

test('Japanese is the default and shows every published available item', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/ja$/);
  await page.goto('/ja/menu');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText(japanese);
  await expect(
    page.getByText('一部のメニューは英語版を準備中です。'),
  ).toHaveCount(0);
});

test('English cards use stored approved text with canonical category anchors and no Japanese fallback', async ({
  page,
}) => {
  await page.goto('/en/menu');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText(approvedEnglish);
  const pasta = page.locator('[id="category-パスタ"]');
  await expect(
    pasta.getByRole('heading', { name: 'Pasta', exact: true }),
  ).toBeVisible();
  await expect(
    pasta.getByText('Freshly prepared seasonal pasta.'),
  ).toBeVisible();
  await expect(
    pasta.getByRole('img', { name: 'Seasonal pasta', exact: true }),
  ).toHaveCount(1);
  await expect(
    page
      .getByRole('navigation', { name: 'Menu categories' })
      .getByRole('link', { name: 'Pasta', exact: true }),
  ).toHaveAttribute('href', '#category-パスタ');
  for (const name of [...japanese, 'Old risotto', 'Unreviewed salad']) {
    await expect(
      page.locator('.gusto-menu-card').filter({ hasText: name }),
    ).toHaveCount(0);
  }
  await expect(
    page.getByText('Some items are not yet available in English.'),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'View the complete Japanese menu' }),
  ).toHaveAttribute('href', '/ja/menu');
});

test('language switch changes menu content in both directions and preserves its category fragment', async ({
  page,
}) => {
  await page.goto('/ja/menu#category-パスタ');
  const englishSwitch = page.getByRole('link', {
    name: 'Switch to English',
    exact: true,
  });
  await englishSwitch.focus();
  await page.keyboard.press('Enter');
  await expect
    .poll(() => decodeURI(page.url()))
    .toBe('http://127.0.0.1:3100/en/menu#category-パスタ');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText(approvedEnglish);
  const japaneseSwitch = page.getByRole('link', {
    name: '日本語に切り替える',
    exact: true,
  });
  await japaneseSwitch.focus();
  await page.keyboard.press('Enter');
  await expect
    .poll(() => decodeURI(page.url()))
    .toBe('http://127.0.0.1:3100/ja/menu#category-パスタ');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText(japanese);
});

test('English home recommendations use stored text and link to the matching canonical category', async ({
  page,
}) => {
  await page.goto('/en');
  const recommendations = page.locator('#recommendations');
  await recommendations.scrollIntoViewIfNeeded();
  await expect(
    recommendations.getByRole('heading', {
      name: 'Seasonal pasta',
      exact: true,
    }),
  ).toBeVisible();
  await expect(recommendations.locator('article')).toHaveCount(2);
  await expect(
    recommendations
      .locator('article')
      .nth(1)
      .getByRole('heading', { name: 'Wood-fired pizza', exact: true }),
  ).toBeVisible();
  await expect(
    recommendations.locator('article').nth(1).getByRole('link'),
  ).toHaveAttribute('href', '/en/menu#category-ピザ');
  await expect(recommendations).not.toContainText('Old risotto');
  await expect(recommendations).not.toContainText('Unreviewed salad');
  await expect(recommendations).not.toContainText('季節のパスタ');
  await expect(
    page.getByRole('link', { name: 'View the complete Japanese menu' }),
  ).toHaveAttribute('href', '/ja/menu');
});

test('authenticated draft preview shows only the target needs-review translation and keeps public requests isolated', async ({
  page,
  request,
}) => {
  await page.goto(
    '/api/draft?secret=fixture-preview-secret&endpoint=menus&contentId=stale-risotto&draftKey=fixture-draft-key',
  );
  await expect(page).toHaveURL(/\/ja\/menu$/);
  await page.goto('/en/menu');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText([
    ...approvedEnglish,
    'Draft mushroom risotto',
  ]);
  await expect(page.getByText('Draft preview is active.')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Unreviewed salad', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Old risotto', exact: true }),
  ).toHaveCount(0);
  const published = await request.get('/en/menu');
  expect(published.ok()).toBe(true);
  expect(await published.text()).not.toContain('Draft mushroom risotto');
  // A menu draft must not relax approval rules for recommendations.
  await page.goto('/en');
  await expect(page.locator('#recommendations article')).toHaveCount(2);
  await expect(
    page.getByRole('heading', { name: 'Unreviewed salad', exact: true }),
  ).toHaveCount(0);
});

test('invalid preview credentials cannot expose unpublished English', async ({
  page,
}) => {
  const response = await page.goto(
    '/api/draft?secret=wrong-secret&endpoint=menus&contentId=stale-risotto&draftKey=fixture-draft-key',
  );
  expect(response?.status()).toBe(401);
  await page.goto('/en/menu');
  await expect(page.locator('.gusto-menu-card h3')).toHaveText(approvedEnglish);
  await expect(page.getByText('Draft preview is active.')).toHaveCount(0);
});

test('translation entry points reject unsigned requests before doing background work', async ({
  request,
}) => {
  const webhook = await request.post('/api/microcms/webhook', {
    data: { service: 'gusto-fixture' },
  });
  expect(webhook.status()).toBe(401);
  const worker = await request.post('/api/translations/process', {
    data: { kind: 'translate', endpoint: 'menus', contentId: 'approved-pasta' },
  });
  expect(worker.status()).toBe(401);
  const cron = await request.get('/api/translations/reconcile');
  expect(cron.status()).toBe(401);
});

test('authenticated publication invalidates cache without translating unchanged Japanese', async ({
  request,
}) => {
  const value = { name: '季節のパスタ', description: '季節のパスタの説明。' };
  const data = JSON.stringify({
    service: 'gusto-fixture',
    api: 'menus',
    id: 'approved-pasta',
    contents: {
      old: { status: ['DRAFT'], draftValue: value },
      new: { status: ['PUBLISH'], publishValue: value },
    },
  });
  const signature = createHmac('sha256', 'fixture-webhook-secret')
    .update(data)
    .digest('hex');
  const response = await request.post('/api/microcms/webhook', {
    data,
    headers: {
      'content-type': 'application/json',
      'x-microcms-signature': signature,
    },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ queued: false });
  const page = await request.get('/en/menu');
  expect(page.ok()).toBe(true);
  expect(await page.text()).toContain('Seasonal pasta');
});
