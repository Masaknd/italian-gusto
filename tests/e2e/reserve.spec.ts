import { expect, test } from '@playwright/test';

const bookingUrl = 'https://select-type.com/rsv/?id=dfcuCU3lEUg';

for (const locale of ['ja', 'en'] as const) {
  test(`${locale} booking opens SelectType directly with the keyboard`, async ({ page }) => {
    await page.route(bookingUrl, (route) => route.fulfill({ body: 'Booking service' }));
    await page.goto(`/${locale}`);
    const booking = page.locator('#reservation .gusto-booking-button');
    await expect(booking).toHaveAttribute('href', bookingUrl);
    await expect(page.locator('iframe[src*="select-type.com"]')).toHaveCount(0);
    await booking.focus();
    await expect(booking).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(bookingUrl);
  });

  test(`${locale} reservation page is removed`, async ({ request }) => {
    const response = await request.get(`/${locale}/reserve`);
    expect(response.status()).toBe(404);
  });
}

test('sitemap excludes the removed reservation pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).not.toContain('/reserve');
});
