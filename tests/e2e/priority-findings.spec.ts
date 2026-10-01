import { expect, test } from '@playwright/test';

test('booking controls stay actionable and link directly to SelectType', async ({
  page,
}, testInfo) => {
  await page.goto('/en');
  await expect(
    page
      .locator('#reservation')
      .getByRole('link', { name: /continue to reservations/i }),
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

test('mobile menu has a clear close control, localized links, and keyboard focus restoration', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation check');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ja/menu');

  const trigger = page.getByRole('button', { name: 'メニュー' });
  const triggerBox = await trigger.boundingBox();
  expect(triggerBox?.width).toBeGreaterThanOrEqual(44);
  expect(triggerBox?.height).toBeGreaterThanOrEqual(44);

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'メニュー' });
  const close = dialog.getByRole('button', { name: 'メニューを閉じる' });
  const closeBox = await close.boundingBox();
  expect(closeBox?.width).toBeGreaterThanOrEqual(44);
  expect(closeBox?.height).toBeGreaterThanOrEqual(44);
  await expect(close.locator('svg path')).toHaveCount(2);
  await expect(dialog.locator('.site-header-mobile-link-list a')).toHaveText([
    'ホーム',
    'メニュー',
    'グストについて',
    'アクセス',
    'プライバシーポリシー',
  ]);
  const currentLink = dialog.getByRole('link', { name: 'メニュー' });
  await expect(currentLink).toHaveAttribute('aria-current', 'page');
  await expect(currentLink).toHaveCSS('text-decoration-line', 'underline');
  await expect(currentLink).toHaveCSS('font-family', /yamafont/i);
  await expect(dialog).toHaveCSS('transform', 'none');
  await page.evaluate(() => document.fonts.ready);
  const overflowingLinks = () =>
    dialog.locator('.site-header-mobile-link-list a').evaluateAll((links) =>
      links.flatMap((link) => {
        const { left, right } = link.getBoundingClientRect();
        return left >= 0 && right <= window.innerWidth
          ? []
          : [
              {
                text: link.textContent,
                left,
                right,
                viewport: window.innerWidth,
              },
            ];
      }),
    );
  expect(await overflowingLinks()).toEqual([]);
  await expect(dialog.getByRole('link', { name: 'アクセス' })).toHaveAttribute(
    'href',
    '/ja#access',
  );
  const reserve = dialog.getByRole('link', { name: '予約する' });
  await expect(reserve).toHaveCSS('font-family', /yamafont/i);
  await expect(reserve).toHaveAttribute(
    'href',
    'https://select-type.com/rsv/?id=dfcuCU3lEUg',
  );
  await expect(close).toBeFocused();

  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(currentLink).toHaveCSS('font-family', /yamafont/i);
  await expect(reserve).toHaveCSS('font-family', /yamafont/i);
  expect(await overflowingLinks()).toEqual([]);

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('English mobile menu marks the current page', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation check');
  await page.goto('/en/about');
  await page.getByRole('button', { name: 'Menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Menu' });
  await expect(dialog.getByRole('link', { name: 'About' })).toHaveCSS(
    'font-family',
    /kalam/i,
  );
  await expect(dialog.getByRole('link', { name: 'Reserve' })).toHaveCSS(
    'font-family',
    /kalam/i,
  );
  await expect(dialog.getByRole('link', { name: 'About' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(
    dialog.getByRole('link', { name: 'Directions' }),
  ).toHaveAttribute('href', '/en#access');
  await dialog.getByRole('button', { name: 'Close menu' }).click();
  await expect(
    page.getByRole('button', { name: 'Menu', exact: true }),
  ).toBeFocused();
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
