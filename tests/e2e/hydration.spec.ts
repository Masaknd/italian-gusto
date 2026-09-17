import { expect, test } from '@playwright/test';

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test.describe(`motion preference: ${reducedMotion}`, () => {
    test.use({ reducedMotion });

    for (const locale of ['ja', 'en']) {
      test(`${locale} pages hydrate without runtime errors`, async ({
        page,
      }) => {
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => {
          if (
            message.type() === 'error' &&
            /hydrat|server rendered/i.test(message.text())
          ) {
            errors.push(message.text());
          }
        });

        for (const route of ['', '/menu', '/about', '/reserve', '/privacy']) {
          const response = await page.goto(`/${locale}${route}`);
          expect(response?.status()).toBe(200);
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
          // The logo starts transparent on the server and animates after hydration.
          await expect(
            page
              .getByRole('banner')
              .getByRole('link', { name: 'Gusto Italian Bar' })
              .first()
              .locator('div')
              .first(),
          ).toHaveCSS('opacity', '1');
          expect(errors, `${locale}${route} hydration`).toEqual([]);
        }
      });
    }
  });
}
