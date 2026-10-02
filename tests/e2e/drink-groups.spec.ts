import { expect, test } from '@playwright/test';

test.skip(
  process.env.GUSTO_TRANSLATION_FIXTURES !== '1',
  'Run with playwright.menu.config.ts and its isolated CMS fixture',
);

for (const locale of ['ja', 'en'] as const) {
  test(`${locale} drinks have subcategory and type headings above their own cards`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/${locale}/menu`);
    const drink = page.locator('.gusto-menu__group').last();
    const subcategories = drink.locator('.gusto-menu__drink-subcategory');
    const wine = subcategories.nth(0);
    const wineTypes = wine.locator('.gusto-menu__drink-type');
    const labels =
      locale === 'ja'
        ? ['ワイン', 'ビール', 'ソフトドリンク']
        : ['Wine', 'Beer', 'Soft drinks'];
    const typeLabels =
      locale === 'ja'
        ? ['スパークリング', '白ワイン', '赤ワイン']
        : ['Sparkling', 'White wine', 'Red wine'];

    await expect(drink.getByRole('heading', { level: 2 })).toHaveText(
      locale === 'ja' ? 'ドリンク' : 'Drink',
    );
    await expect(drink.locator('.gusto-menu__subcategory-title')).toHaveText(
      labels,
    );
    await expect(wine.locator('.gusto-menu__type-title')).toHaveText(
      typeLabels,
    );
    await expect(wineTypes).toHaveCount(4);
    await expect(wineTypes.nth(0).locator('.gusto-menu-card h5')).toHaveText(
      locale === 'ja'
        ? ['スパークリングＡ', 'スパークリングＢ']
        : ['Sparkling A', 'Sparkling B'],
    );
    await expect(wineTypes.nth(1).locator('.gusto-menu-card h5')).toHaveText(
      locale === 'ja' ? '白ワインＡ' : 'White A',
    );
    await expect(wineTypes.nth(2).locator('.gusto-menu-card h5')).toHaveText(
      locale === 'ja' ? '赤ワインＡ' : 'Red A',
    );
    await expect(
      wineTypes.nth(3).locator('.gusto-menu__type-title'),
    ).toHaveCount(0);
    await expect(wineTypes.nth(3).locator('.gusto-menu-card h4')).toHaveText(
      locale === 'ja' ? 'ハウスワイン' : 'House wine',
    );
    await expect(
      subcategories.nth(1).locator('.gusto-menu__type-title'),
    ).toHaveCount(0);
    await expect(
      subcategories.nth(1).locator('.gusto-menu-card h4'),
    ).toHaveText(locale === 'ja' ? 'ビールＡ' : 'Beer A');
    await expect(
      subcategories.last().locator('.gusto-menu__subcategory-title'),
    ).toHaveCount(0);
    await expect(
      subcategories.last().locator('.gusto-menu-card h3'),
    ).toHaveText(locale === 'ja' ? '本日のドリンク' : 'Daily drink');
    await expect(
      subcategories
        .last()
        .getByRole('heading', { level: 3, name: typeLabels[0], exact: true }),
    ).toHaveCount(1);
    await expect(
      subcategories.last().locator('.gusto-menu-card h4'),
    ).toHaveText(locale === 'ja' ? 'グラススパークリング' : 'Sparkling glass');
    await expect(drink.locator('.gusto-menu-card')).toHaveCount(9);
    await expect(drink.locator('.gusto-menu-card__image')).toHaveCount(0);
    await expect(
      page.locator('.gusto-menu__group').first().locator('.gusto-menu-card h3'),
    ).toHaveText(locale === 'ja' ? '季節のパスタ' : 'Seasonal pasta');

    for (const heading of await drink
      .locator('.gusto-menu__subcategory-title, .gusto-menu__type-title')
      .all()) {
      await heading.scrollIntoViewIfNeeded();
      const headingBox = await heading.boundingBox();
      const gridBox = await heading
        .locator('..')
        .locator('.gusto-menu__grid')
        .first()
        .boundingBox();
      expect(headingBox).not.toBeNull();
      expect(gridBox).not.toBeNull();
      expect(headingBox!.x).toBeCloseTo(gridBox!.x, 0);
      expect(headingBox!.y + headingBox!.height).toBeLessThan(gridBox!.y);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    await wine.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/menu/${locale}-${test.info().project.name}.png`,
    });
  });
}
