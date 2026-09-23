import { expect, test } from '@playwright/test';

test('booking controls stay actionable and link directly to SelectType', async ({
  page,
}, testInfo) => {
  await page.goto('/en');
  await expect(
    page
      .locator('#reservation')
      .getByRole('link', { name: /reservations and inquiries/i }),
  ).toHaveAttribute('href', 'https://select-type.com/rsv/?id=dfcuCU3lEUg');

  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(
      page.locator('#mobile-nav').getByRole('link', { name: 'Reserve' }),
    ).toHaveAttribute('href', 'https://select-type.com/rsv/?id=dfcuCU3lEUg');
  }
});

test('locale switch preserves the current route and fragment', async ({
  page,
}) => {
  await page.goto('/en/menu#category-pasta');
  const switcher = page
    .getByRole('link', { name: '日本語に切り替える' })
    .first();
  await expect(switcher).toBeVisible();
  await switcher.click();
  await expect(page).toHaveURL(/\/ja\/menu#category-pasta$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
});

test('English mobile headline fits within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('/en');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  const box = await heading.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(393);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('privacy controls and localized footer home destination are available', async ({
  page,
}) => {
  await page.goto('/en/menu');
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'Home' }),
  ).toHaveAttribute('href', '/en');
  await page
    .getByRole('contentinfo')
    .getByRole('link', { name: 'Privacy' })
    .click();
  await expect(page).toHaveURL(/\/en\/privacy$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy Policy' }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('group', { name: 'Change analytics choice' })
      .getByRole('button', { name: 'Allow analytics' }),
  ).toBeVisible();
  const access = page.locator('#access');
  await expect(
    access.getByRole('heading', { level: 2, name: 'Access' }),
  ).toBeVisible();
  await expect(
    page.getByRole('contentinfo').getByRole('link', { name: 'Access' }),
  ).toHaveAttribute('href', '#access');
});

test('privacy content is centered while its introduction stays left aligned', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/en/privacy');

  const content = page.locator('.gusto-privacy-content');
  const intro = page.locator('.gusto-privacy-intro');
  const contentBox = await content.boundingBox();

  expect(contentBox).not.toBeNull();
  expect(contentBox!.x).toBeCloseTo((1440 - contentBox!.width) / 2, 1);
  await expect(intro.getByRole('heading', { level: 1 })).toHaveCSS(
    'text-align',
    'left',
  );
  await expect(intro.locator('p')).toHaveCSS('text-align', 'left');
});
