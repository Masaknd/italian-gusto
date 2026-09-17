import { expect, test } from '@playwright/test';

test('booking controls stay actionable and route through the localized booking page', async ({
  page,
}, testInfo) => {
  await page.goto('/en');
  await expect(
    page
      .locator('#reservation')
      .getByRole('link', { name: /reservations and inquiries/i }),
  ).toHaveAttribute('href', '/en/reserve');

  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(
      page.locator('#mobile-nav').getByRole('link', { name: 'Reserve' }),
    ).toHaveAttribute('href', '/en/reserve');
  }

  await page.goto('/en/reserve');
  const externalBooking = page.getByRole('link', {
    name: /opens the reservation form/i,
  });
  const phoneFallback = page.getByRole('link', { name: '06-6180-6059' });
  expect((await externalBooking.count()) + (await phoneFallback.count())).toBe(
    1,
  );
  if (await externalBooking.count())
    await expect(externalBooking).toHaveAttribute('href', /^https:\/\//);
  else await expect(phoneFallback).toHaveAttribute('href', 'tel:+81661806059');
});

test('locale switch preserves the current route and fragment', async ({
  page,
}) => {
  await page.goto('/en/menu#category-pasta');
  const switcher = page
    .getByRole('link', { name: 'Switch to Japanese' })
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
    page.getByRole('heading', { level: 1, name: 'Privacy and analytics' }),
  ).toBeVisible();
  await expect(
    page
      .getByLabel('Change analytics choice')
      .getByRole('button', { name: 'Allow analytics' }),
  ).toBeVisible();
});
