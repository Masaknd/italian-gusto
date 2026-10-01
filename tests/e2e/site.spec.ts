import { expect, test } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
const reservationUrl = "https://select-type.com/rsv/?id=dfcuCU3lEUg";

test("recommendations settle with a spring and respect the wheel cooldown", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Mouse-wheel interaction check");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ja");

  const section = page.locator("#recommendations");
  const track = page.getByTestId("recommendations-track");
  const getTrackX = () =>
    track.evaluate(
      (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
    );
  const getSectionScrollY = () =>
    section.evaluate((element) => -element.getBoundingClientRect().top);

  await section.evaluate((element) => element.scrollIntoView());
  await expect
    .poll(async () => (await page.locator("#recommendation-1").boundingBox())?.x)
    .toBeCloseTo(0, 0);
  await expect.poll(getSectionScrollY).toBeCloseTo(0, 0);

  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 100);

  await page.waitForTimeout(120);
  expect(await getSectionScrollY()).toBeCloseTo(900, 0);
  const inFlightTrackX = await getTrackX();
  expect(inFlightTrackX).toBeLessThanOrEqual(0);
  expect(inFlightTrackX).toBeGreaterThan(-1440);

  // A second step during the transition and reading pause must be ignored.
  await page.waitForTimeout(380);
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(850);
  expect(await getSectionScrollY()).toBeCloseTo(900, 0);

  await expect.poll(getTrackX).toBeCloseTo(-1440, 0);
  await expect
    .poll(async () => (await page.locator("#recommendation-2").boundingBox())?.x)
    .toBeCloseTo(0, 0);
  const vegetablesBox = await page
    .locator("#recommendation-2 .gusto-feature-2-deco")
    .boundingBox();
  expect(vegetablesBox).not.toBeNull();
  expect(vegetablesBox!.x).toBeGreaterThanOrEqual(0);
  expect(vegetablesBox!.x).toBeLessThan(1440);
  expect(vegetablesBox!.y + vegetablesBox!.height).toBeGreaterThan(0);
  expect(vegetablesBox!.y).toBeLessThan(900);

  await page.waitForTimeout(850);
  await page.mouse.wheel(0, 100);

  expect(await getSectionScrollY()).toBeCloseTo(1800, 0);
  await expect.poll(getTrackX).toBeCloseTo(-2880, 0);
  await expect
    .poll(async () => (await page.locator("#recommendation-3").boundingBox())?.x)
    .toBeCloseTo(0, 0);
  const olivesBox = await page
    .locator("#recommendation-3 .gusto-feature-3-deco")
    .boundingBox();
  expect(olivesBox).not.toBeNull();
  expect(olivesBox!.x + olivesBox!.width).toBeGreaterThan(0);
  expect(olivesBox!.x).toBeLessThan(1440);
  expect(olivesBox!.y + olivesBox!.height).toBeGreaterThan(0);
  expect(olivesBox!.y).toBeLessThan(900);
});

test("continuous wheel input pauses to read every recommendation without getting stuck", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Mouse-wheel interaction check");
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ja");

  const section = page.locator("#recommendations");
  const getSectionScrollY = () =>
    section.evaluate((element) => -element.getBoundingClientRect().top);
  const track = page.getByTestId("recommendations-track");
  const getTrackX = () => track.evaluate(
    (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
  );

  await section.evaluate((element) => element.scrollIntoView());
  await expect.poll(getSectionScrollY).toBeCloseTo(0, 0);
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 100);
  expect(await getSectionScrollY()).toBeCloseTo(900, 0);

  const count = await section.locator("article").count();
  expect(count).toBeGreaterThanOrEqual(3);
  const forward = Array.from({ length: count - 2 }, (_, index) => index + 2);
  const backward = Array.from({ length: count - 1 }, (_, index) => count - index - 2);
  let currentIndex = 1;
  for (const nextIndex of [...forward, ...backward]) {
    let panelVisibleAt: number | undefined;
    let advanced = false;
    const direction = Math.sign(nextIndex - currentIndex);
    for (let step = 0; step < 60; step += 1) {
      await page.waitForTimeout(100);
      if (panelVisibleAt === undefined && Math.abs(await getTrackX() + currentIndex * 1440) < 2) {
        panelVisibleAt = Date.now();
      }
      await page.mouse.wheel(0, direction * 40);
      if (Math.abs(await getSectionScrollY() - currentIndex * 900) > 100) {
        expect(panelVisibleAt, `Panel ${currentIndex + 1} must settle before advancing`).toBeDefined();
        advanced = true;
        break;
      }
    }
    expect(advanced, `Panel ${currentIndex + 1} must not remain locked`).toBe(true);
    expect(await getSectionScrollY()).toBeCloseTo(nextIndex * 900, 0);
    currentIndex = nextIndex;
  }

  await expect.poll(getTrackX).toBeCloseTo(0, 0);
  await page.waitForTimeout(850);
  await page.mouse.wheel(0, -100);
  await expect.poll(getSectionScrollY).toBeLessThan(-50);
});

test("the 1440px home header matches the desktop design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });

  await expect(header).toHaveCSS("height", "132px");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header).toHaveCSS("background-image", "none");
  await expect(header.locator(".site-header-inner")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(logo).toBeVisible();
  await expect(page.getByRole("button", { name: "メニュー" })).toBeHidden();

  const logoBox = await logo.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(48, 1);
  expect(logoBox!.y).toBeCloseTo(16, 1);
  expect(logoBox!.width).toBeCloseTo(230.708664, 1);
  expect(logoBox!.height).toBeCloseTo(100, 1);
});

test("the 1440px menu header matches the desktop design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja/menu");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });
  const title = page.getByRole("heading", { level: 1, name: "グストのメニュー" });

  await expect(header).toHaveCSS("position", "relative");
  await expect(header).toHaveCSS("height", "132px");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
  await expect(page.getByRole("button", { name: "メニュー" })).toBeHidden();

  const logoBox = await logo.boundingBox();
  const titleBox = await title.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(48, 1);
  expect(logoBox!.y).toBeCloseTo(16, 1);
  expect(logoBox!.width).toBeCloseTo(230.708664, 1);
  expect(logoBox!.height).toBeCloseTo(100, 1);
  expect(titleBox!.x).toBeCloseTo(96, 1);
  expect(titleBox!.y).toBeCloseTo(132, 1);
  expect(titleBox!.width).toBeCloseTo(385, 1);
  expect(titleBox!.height).toBeCloseTo(88, 1);
});

test("the 1920px menu hero uses the supplied title, nav, marquee, and botanical styles", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only design detail check");
  await page.setViewportSize({ width: 1920, height: 1100 });
  await page.goto("/ja/menu");

  const title = page.locator(".gusto-menu__title");
  const prefix = title.locator(".gusto-menu__title-prefix");
  const mainWord = title.locator(".gusto-menu__title-main");
  const nav = page.locator(".gusto-menu__category-nav");
  const firstCategory = nav.getByRole("link").first();
  const marquee = page.locator(".gusto-menu__marquee");
  const botanical = page.locator(".gusto-menu__line-art");

  await expect(title).toHaveCSS("border-bottom-width", "3px");
  await expect(title).toHaveCSS("border-bottom-style", "dashed");
  await expect(title).toHaveCSS("border-bottom-color", "rgb(242, 108, 79)");
  await expect(prefix).toHaveCSS("font-size", "48px");
  await expect(prefix).toHaveCSS("line-height", "60px");
  await expect(prefix).toHaveCSS("letter-spacing", "-14.4px");
  await expect(mainWord).toHaveCSS("font-size", "80px");
  await expect(mainWord).toHaveCSS("line-height", "96px");
  await expect(mainWord).toHaveCSS("letter-spacing", "-20px");
  await expect(firstCategory).toHaveCSS("font-size", "60px");
  await expect(firstCategory).toHaveCSS("line-height", "72px");
  await expect(firstCategory).toHaveCSS("color", "rgb(195, 168, 162)");
  await expect(marquee).toHaveCSS("font-size", "86px");
  await expect(marquee).toHaveCSS("line-height", "90px");
  await expect(marquee).toHaveCSS("letter-spacing", "-21.5px");
  await expect(marquee).toHaveCSS("transform", "matrix(0, 1, -1, 0, 0, 0)");
  await expect(marquee).toHaveCSS("transform-origin", "0px 0px");
  await expect(marquee).toHaveCSS("white-space", "nowrap");

  const [titleBox, navBox, marqueeBox, botanicalBox] = await Promise.all([
    title.boundingBox(),
    nav.boundingBox(),
    marquee.boundingBox(),
    botanical.boundingBox(),
  ]);
  expect(titleBox).toMatchObject({ x: 240, y: 132, width: 385, height: 88 });
  expect(navBox).toMatchObject({ x: 240, y: 266, width: 1440, height: 60 });
  expect(marqueeBox?.x).toBeCloseTo(0, 1);
  expect(marqueeBox?.y).toBeCloseTo(178, 1);
  expect(marqueeBox?.width).toBeCloseTo(90, 1);
  expect(botanicalBox?.x).toBeCloseTo(1630.92, 1);
  expect(botanicalBox?.y).toBeCloseTo(178, 1);
  expect(botanicalBox?.width).toBeCloseTo(287.08, 1);
  expect(botanicalBox?.height).toBeCloseTo(297, 1);
});

test("the appetizer cards follow the current responsive geometry", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only design detail check");

  const frames = [
    { width: 1920, cardWidth: 462, cardHeight: 642.25, headingHeight: 64, titleSize: "42px" },
    { width: 1440, cardWidth: 400, cardHeight: 604.51, headingHeight: 64, titleSize: "36px" },
    { width: 768, cardWidth: 348, cardHeight: 486.73, headingHeight: 52, titleSize: "28px" },
    { width: 393, cardWidth: 361, cardHeight: 504.91, headingHeight: 24.12, titleSize: "28px" },
  ] as const;

  for (const frame of frames) {
    await page.setViewportSize({ width: frame.width, height: 1000 });
    await page.goto("/ja/menu");

    const group = page.locator(".gusto-menu__group").first();
    const heading = group.locator(".gusto-menu__category-title");
    const grid = group.locator(".gusto-menu__grid");
    const card = grid.locator(".gusto-menu-card").first();
    const image = card.locator(".gusto-menu-card__image");
    const cardTitle = card.getByRole("heading", { level: 3 });

    await expect(group).toHaveCSS("row-gap", "32px");
    await expect(grid).toHaveCSS("gap", "24px");
    await expect(card).toHaveCSS("padding", "24px");
    await expect(card).toHaveCSS("border-radius", "16px");
    await expect(card).toHaveCSS("background-color", "rgb(251, 236, 230)");
    await expect(image).toHaveCSS("box-shadow", "rgba(0, 0, 0, 0.25) 0px 4px 8px 0px");
    await expect(cardTitle).toHaveCSS("font-family", /kirigirisu/);
    await expect(cardTitle).toHaveCSS("font-size", frame.titleSize);
    await expect(cardTitle).toHaveCSS("font-weight", "400");
    await expect(cardTitle).toHaveCSS("letter-spacing", `${-0.25 * Number.parseFloat(frame.titleSize)}px`);
    await expect(card.locator(".gusto-menu-card__price")).toContainText(/¥\d+（税込 ¥\d+）/);

    const [headingBox, cardBox, imageBox] = await Promise.all([
      heading.boundingBox(),
      card.boundingBox(),
      image.boundingBox(),
    ]);
    expect(headingBox?.height).toBeCloseTo(frame.headingHeight, 1);
    expect(cardBox?.width).toBeCloseTo(frame.cardWidth, 1);
    expect(cardBox?.height).toBeCloseTo(frame.cardHeight, 1);
    expect(imageBox?.width).toBeCloseTo(frame.cardWidth - 48, 1);
    expect(imageBox?.height).toBeCloseTo((frame.cardWidth - 48) * (412.25 / 414), 1);
  }
});

test("every menu card has the menu card shadow", async ({ page }) => {
  await page.goto("/ja/menu");

  const cards = page.locator(".gusto-menu-card");
  const cardCount = await cards.count();
  expect(cardCount).toBeGreaterThan(0);

  for (let index = 0; index < cardCount; index += 1) {
    await expect(cards.nth(index)).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    );
  }
});

test("menu card yen symbols have an independent sizing hook", async ({ page }) => {
  await page.goto("/ja/menu");

  const price = page.locator(".gusto-menu-card__price").first();
  const yenSymbols = price.locator(".gusto-menu-card__yen");

  await expect(yenSymbols).toHaveCount(2);
  await expect(yenSymbols.nth(0)).toHaveText("¥");
  await expect(yenSymbols.nth(1)).toHaveText("¥");
});

test("the drink category is last and its cards omit empty optional content", async ({ page }) => {
  await page.goto("/ja/menu");

  const categoryLinks = page.locator(".gusto-menu__category-nav a");
  const groups = page.locator(".gusto-menu__group");
  const drinkGroup = groups.last();
  const drinkCard = drinkGroup.locator(".gusto-menu-card").first();

  await expect(categoryLinks.last()).toHaveText("ドリンク");
  await expect(drinkGroup.getByRole("heading", { level: 2 })).toHaveText("ドリンク");
  await expect(drinkCard).toHaveCSS("padding", "24px");
  await expect(drinkCard).toHaveCSS("border-radius", "16px");
  await expect(drinkCard).toHaveCSS("background-color", "rgb(251, 236, 230)");
  await expect(drinkCard.locator(".gusto-menu-card__image")).toHaveCount(0);
  await expect(drinkCard.locator("p:not(.gusto-menu-card__price)")).toHaveCount(0);
  await expect(drinkCard.locator(".gusto-menu-card__price")).toBeVisible();
});

test("menu card descriptions use the locale-specific typeface", async ({ page }) => {
  await page.goto("/en/menu");
  const englishDescription = page.locator(".gusto-menu-card__description").first();
  await expect(englishDescription).toBeVisible();
  await expect(englishDescription).toHaveClass(/\bfont-label\b/);
  await expect(englishDescription).not.toHaveClass(/\bfont-accent\b/);

  await page.goto("/ja/menu");
  const japaneseDescription = page.locator(".gusto-menu-card__description").first();
  await expect(japaneseDescription).toBeVisible();
  await expect(japaneseDescription).toHaveClass(/\bfont-accent\b/);
  await expect(japaneseDescription).not.toHaveClass(/\bfont-label\b/);
});

test("the 768px home header uses small-screen navigation at the breakpoint", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });
  const menu = page.getByRole("button", { name: "メニュー" });

  await expect(header).toHaveCSS("height", "120px");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header).toHaveCSS("background-image", "none");
  await expect(header.locator(".site-header-inner")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(header.locator(".site-header-inner")).toHaveCSS("background-image", "none");
  await expect(page.locator("body")).toHaveCSS(
    "background-image",
    /cotton01\.jpg/,
  );
  await expect(page.locator("body")).toHaveCSS("background-repeat", "repeat");
  await expect(page.locator("body")).toHaveCSS(
    "background-size",
    /853\.333\d*px 533\.333\d*px/,
  );
  await expect(page.locator("body")).toHaveCSS("background-attachment", "fixed");
  await expect(logo).toBeVisible();
  await expect(menu).toBeVisible();

  const logoBox = await logo.boundingBox();

  expect(logoBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(14, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
});

test("the smartphone home page uses one mobile-safe paper texture layer", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only background check");
  await page.goto("/ja");

  const body = page.locator("body");
  const main = page.locator("main.gusto-page");

  await expect(body).toHaveCSS("background-image", /cotton01\.jpg/);
  await expect(body).toHaveCSS("background-repeat", "repeat");
  await expect(body).toHaveCSS(
    "background-size",
    /853\.333\d*px 533\.333\d*px/,
  );
  await expect(body).toHaveCSS("background-attachment", "scroll");
  await expect(main).toHaveCSS("background-image", "none");
});

test("the 768px menu header matches the small-screen design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja/menu");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });
  const menu = page.getByRole("button", { name: "メニュー" });
  const title = page.getByRole("heading", { level: 1, name: "グストのメニュー" });
  const titlePrefix = title.locator(".gusto-menu__title-prefix");
  const titleMain = title.locator(".gusto-menu__title-main");

  await expect(header).toHaveCSS("position", "relative");
  await expect(header).toHaveCSS("height", "120px");
  await expect(header.locator(".site-header-inner")).toHaveCSS("height", "104px");
  await expect(header.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
  await expect(menu).toBeVisible();
  await expect(titlePrefix).toHaveCSS("font-size", "32px");
  await expect(titleMain).toHaveCSS("font-size", "52px");
  await expect(page.locator(".gusto-menu__category-nav a").first()).toHaveCSS("font-size", "32px");
  await expect(page.locator(".gusto-menu__marquee")).toBeHidden();
  await expect(page.locator(".gusto-menu__line-art")).toBeHidden();

  const logoBox = await logo.boundingBox();
  const menuBox = await menu.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(6, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
  expect(menuBox!.width).toBe(44);
  expect(menuBox!.height).toBe(44);
  expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(768);
  expect(menuBox!.y).toBeGreaterThanOrEqual(0);
});

test("the 393px home header matches the extra-small design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const header = page.getByRole("banner");
  const inner = header.locator(".site-header-inner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });
  const menu = page.getByRole("button", { name: "メニュー" });
  const menuLines = menu.locator("i");

  await expect(header).toHaveCSS("height", "84px");
  await expect(inner).toHaveCSS("height", "76px");
  await expect(logo).toBeVisible();
  await expect(menu).toBeVisible();
  await expect(menuLines).toHaveCount(3);

  const logoBox = await logo.boundingBox();
  const menuBox = await menu.boundingBox();
  const lineBoxes = await menuLines.evaluateAll((lines) =>
    lines.map((line) => {
      const { x, y, width, height } = line.getBoundingClientRect();
      return { x, y, width, height };
    }),
  );

  expect(logoBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(8, 1);
  expect(logoBox!.width).toBeCloseTo(138.425201, 1);
  expect(logoBox!.height).toBeCloseTo(60, 1);
  expect(menuBox!.x).toBeCloseTo(341, 1);
  expect(menuBox!.y).toBeCloseTo(16, 1);
  expect(menuBox!.width).toBe(44);
  expect(menuBox!.height).toBe(44);
  expect(lineBoxes).toHaveLength(3);
  expect(lineBoxes.map(({ x }) => x)).toEqual([352, 352, 352]);
  expect(lineBoxes.map(({ y }) => y)).toEqual([30, 38, 46]);
  expect(lineBoxes.map(({ width }) => width)).toEqual([22, 22, 22]);
  expect(lineBoxes.map(({ height }) => height)).toEqual([3, 3, 3]);
});

test("the 393px menu header matches the extra-small design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja/menu");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });
  const menu = page.getByRole("button", { name: "メニュー" });
  const title = page.getByRole("heading", { level: 1, name: "グストのメニュー" });
  const titlePrefix = title.locator(".gusto-menu__title-prefix");
  const titleMain = title.locator(".gusto-menu__title-main");

  await expect(header).toHaveCSS("position", "relative");
  await expect(header).toHaveCSS("height", "84px");
  await expect(header.locator(".site-header-inner")).toHaveCSS("height", "76px");
  await expect(menu).toBeVisible();
  await expect(titlePrefix).toHaveCSS("font-size", "24px");
  await expect(titleMain).toHaveCSS("font-size", "40px");
  await expect(page.locator(".gusto-menu__marquee")).toBeHidden();
  await expect(page.locator(".gusto-menu__line-art")).toBeHidden();

  const logoBox = await logo.boundingBox();
  const menuBox = await menu.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(8, 1);
  expect(logoBox!.width).toBeCloseTo(138.425201, 1);
  expect(logoBox!.height).toBeCloseTo(60, 1);
  expect(menuBox!.x).toBeCloseTo(341, 1);
  expect(menuBox!.y).toBeCloseTo(16, 1);
  expect(menuBox!.width).toBe(44);
  expect(menuBox!.height).toBe(44);
});

test("the menu page reuses the home social, reservation, access, and footer sections", async ({ page }, testInfo) => {
  const mobile = testInfo.project.name === "mobile";
  await page.setViewportSize(mobile ? { width: 393, height: 852 } : { width: 1440, height: 1100 });
  await page.goto("/ja/menu");

  const main = page.getByRole("main");
  const social = main.locator(":scope > .gusto-social");
  const reservation = main.locator(":scope > .gusto-reservation");
  const booking = reservation.locator(".gusto-booking");
  const access = main.locator(":scope > .gusto-access");
  const footer = page.getByRole("contentinfo");

  await expect(main).toHaveClass(/gusto-home/);
  await expect(social).toBeVisible();
  await expect(reservation).toBeVisible();
  await expect(access).toBeVisible();
  await expect(footer).toBeVisible();
  await expect(social).toHaveCSS("color", "rgb(246, 230, 224)");
  await expect(booking).toHaveCSS("background-color", "rgba(27, 40, 27, 0.7)");
  await expect(access).toHaveCSS("background-color", "rgb(242, 108, 79)");
  await expect(footer).toHaveCSS("background-color", "rgb(27, 40, 27)");
  expect(await social.evaluate((node) => getComputedStyle(node, "::after").backgroundColor)).toBe("rgb(27, 40, 27)");

  if (!mobile) {
    const [socialBox, reservationBox, bookingBox, accessBox] = await Promise.all([
      social.boundingBox(),
      reservation.boundingBox(),
      booking.boundingBox(),
      access.boundingBox(),
    ]);
    expect(socialBox?.height).toBeCloseTo(814.175, 1);
    expect(reservationBox?.height).toBeCloseTo(914, 1);
    expect(bookingBox?.width).toBeCloseTo(710, 1);
    expect(bookingBox?.height).toBeCloseTo(514, 1);
    expect(accessBox?.height).toBeCloseTo(671.248, 1);
  }

  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Our Story" })).toHaveAttribute("href", "/ja/about");
});

test("the 393px hamburger menu matches the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 820 });
  await page.goto("/ja");
  await page.getByRole("button", { name: "メニュー" }).click();

  const menu = page.getByRole("dialog", { name: "メニュー" });
  const menuHeader = menu.locator(".site-header-mobile-header");
  const logo = menu.getByRole("link", { name: "Gusto Italian Bar" });
  const close = menu.getByRole("button", { name: "メニューを閉じる" });
  const closeIcon = close.locator("svg");
  const links = menu.locator(".site-header-mobile-link-list a");
  const reserve = menu.getByText("予約する", { exact: true });

  await expect(menu).toHaveCSS("background-color", "rgb(27, 40, 27)");
  await expect(menu).toHaveCSS("color", "rgb(246, 230, 224)");
  await expect(menu).toHaveCSS("transform", "none");
  await expect(closeIcon.locator("path")).toHaveCount(2);
  await expect(links).toHaveText(["ホーム", "メニュー", "グストについて", "アクセス", "プライバシーポリシー"]);

  const menuBox = await menu.boundingBox();
  const menuHeaderBox = await menuHeader.boundingBox();
  const logoBox = await logo.boundingBox();
  const closeBox = await close.boundingBox();
  const linkBoxes = await links.evaluateAll((items) =>
    items.map((item) => {
      const { x, y, width, height } = item.getBoundingClientRect();
      return { x, y, width, height };
    }),
  );
  const reserveBox = await reserve.boundingBox();

  expect(menuBox).not.toBeNull();
  expect(menuHeaderBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(closeBox).not.toBeNull();
  expect(reserveBox).not.toBeNull();
  expect(menuBox!.x).toBeCloseTo(0, 1);
  expect(menuBox!.y).toBeCloseTo(0, 1);
  expect(menuBox!.width).toBeCloseTo(393, 1);
  expect(menuBox!.height).toBeCloseTo(820, 1);
  expect(menuHeaderBox!.height).toBeCloseTo(84, 1);
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(12, 1);
  expect(logoBox!.width).toBeCloseTo(138.425201, 1);
  expect(logoBox!.height).toBeCloseTo(60, 1);
  expect(closeBox!.x).toBeCloseTo(341, 1);
  expect(closeBox!.y).toBeCloseTo(20, 1);
  expect(closeBox!.width).toBe(44);
  expect(closeBox!.height).toBe(44);
  expect(linkBoxes).toHaveLength(5);
  expect(linkBoxes.every(({ height }) => height >= 44)).toBe(true);
  expect(reserveBox!.width).toBeGreaterThanOrEqual(44);
  expect(reserveBox!.height).toBeGreaterThanOrEqual(44);
  await expect(close).toBeFocused();
});

test("the mobile menu is available below the 1024px breakpoint", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only breakpoint check");
  await page.setViewportSize({ width: 767, height: 900 });
  await page.goto("/ja");

  const header = page.getByRole("banner");
  const trigger = page.getByRole("button", { name: "メニュー", exact: true });
  const menuLines = trigger.locator("i");

  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveCSS("color", "rgb(27, 40, 27)");
  await expect(menuLines).toHaveCount(3);
  for (const line of await menuLines.all()) {
    await expect(line).toHaveCSS("background-color", "rgb(27, 40, 27)");
    await expect(line).toHaveCSS("opacity", "1");
  }

  await trigger.click();
  const menu = page.getByRole("dialog", { name: "メニュー" });
  await expect(menu).toBeVisible();
  await expect(menu).toHaveCSS("position", "fixed");
  await expect(menu).toHaveCSS("opacity", "1");
  await expect(menu).toHaveCSS("background-color", "rgb(27, 40, 27)");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  const menuBox = await menu.boundingBox();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.x).toBeCloseTo(0, 1);
  expect(menuBox!.y).toBeCloseTo(0, 1);
  expect(menuBox!.width).toBeCloseTo(767, 1);
  expect(menuBox!.height).toBeCloseTo(900, 1);
  await expect(menu.getByRole("link", { name: "ホーム" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "メニュー" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "グストについて" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "アクセス" })).toBeVisible();
  await expect(menu.getByText("予約する", { exact: true })).toBeVisible();
  const mobileLogo = menu.getByRole("link", { name: "Gusto Italian Bar" });
  const close = menu.getByRole("button", { name: "メニューを閉じる" });
  const home = menu.getByRole("link", { name: "ホーム" });
  const reserve = menu.getByText("予約する", { exact: true });
  const mobileLogoBox = await mobileLogo.boundingBox();
  const closeBox = await close.boundingBox();
  const homeBox = await home.boundingBox();
  const reserveBox = await reserve.boundingBox();

  expect(mobileLogoBox).not.toBeNull();
  expect(closeBox).not.toBeNull();
  expect(homeBox).not.toBeNull();
  expect(reserveBox).not.toBeNull();
  expect(mobileLogoBox!.x).toBeCloseTo(278.5, 1);
  expect(mobileLogoBox!.y).toBeCloseTo(20.976112, 1);
  expect(mobileLogoBox!.width).toBeCloseTo(210, 1);
  expect(mobileLogoBox!.height).toBeCloseTo(91.023888, 1);
  expect(closeBox!.width).toBe(44);
  expect(closeBox!.height).toBe(44);
  expect(closeBox!.x + closeBox!.width).toBeLessThanOrEqual(767);
  expect(homeBox!.y).toBeGreaterThan(mobileLogoBox!.y + mobileLogoBox!.height);
  expect(reserveBox!.width).toBeGreaterThanOrEqual(44);
  expect(reserveBox!.height).toBeGreaterThanOrEqual(44);
  await expect(close).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeVisible();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeVisible();
  await expect(trigger).toBeVisible();
  await page.setViewportSize({ width: 991, height: 900 });
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeVisible();
  await expect(trigger).toBeVisible();
  await page.setViewportSize({ width: 1023, height: 900 });
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeVisible();
  await expect(trigger).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeHidden();
  await expect(trigger).toBeHidden();
  await expect(page.locator('button[aria-controls="mobile-nav"]')).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("the 768px hero follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const hero = page.locator(".gusto-hero");
  const heading = hero.getByRole("heading", { level: 1 });
  const dishes = hero.locator(".gusto-hero-dishes");
  const vegetables = hero.locator(".gusto-hero-veg");
  const marquee = hero.locator(".gusto-vertical");

  await expect(hero.locator(".gusto-hero-nav")).toBeHidden();
  await expect(hero.locator(".gusto-hero-caret")).toBeHidden();
  await expect(hero.locator(".gusto-hero-brush")).toBeHidden();
  await expect(heading.locator(".gusto-hero-title-emphasis")).toHaveCount(3);

  const heroBox = await hero.boundingBox();
  const headingBox = await heading.boundingBox();
  const dishesBox = await dishes.boundingBox();
  const vegetablesBox = await vegetables.boundingBox();
  const marqueeBox = await marquee.boundingBox();

  expect(heroBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(dishesBox).not.toBeNull();
  expect(vegetablesBox).not.toBeNull();
  expect(marqueeBox).not.toBeNull();
  expect(heroBox!.y).toBeCloseTo(120, 1);
  expect(heroBox!.height).toBeCloseTo(844, 1);
  expect(headingBox!.x - heroBox!.x).toBeCloseTo(86.237976, 1);
  expect(headingBox!.y - heroBox!.y).toBeCloseTo(0, 1);
  expect(headingBox!.width).toBeCloseTo(424, 1);
  expect(headingBox!.height).toBeCloseTo(240, 1);
  expect(dishesBox!.x - heroBox!.x).toBeCloseTo(141.321472, 1);
  expect(dishesBox!.y - heroBox!.y).toBeCloseTo(-1.597839, 1);
  expect(dishesBox!.width).toBeCloseTo(739.296631, 1);
  expect(dishesBox!.height).toBeCloseTo(797.771484, 1);
  expect(vegetablesBox!.x - heroBox!.x).toBeCloseTo(86.73233, 1);
  expect(vegetablesBox!.y - heroBox!.y).toBeCloseTo(597.101837, 1);
  expect(vegetablesBox!.width).toBeCloseTo(347.39679, 1);
  expect(vegetablesBox!.height).toBeCloseTo(237.561798, 1);
  expect(marqueeBox!.x - heroBox!.x).toBeCloseTo(0, 1);
  expect(marqueeBox!.y - heroBox!.y).toBeCloseTo(0, 1);
  expect(marqueeBox!.width).toBeCloseTo(60, 1);
  expect(marqueeBox!.height).toBeCloseTo(527, 1);
  await expect(marquee).toHaveCSS("font-size", "68px");
  await expect(marquee).toHaveCSS("left", "-233.5px");
  await expect(marquee).toHaveCSS("top", "233.5px");
  await expect(marquee).toHaveCSS("transform-origin", "263.5px 30px");
});

test("the 393px hero follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const hero = page.locator(".gusto-hero");
  const heading = hero.getByRole("heading", { level: 1 });
  const dishes = hero.locator(".gusto-hero-dishes");
  const vegetables = hero.locator(".gusto-hero-veg");

  await expect(hero.locator(".gusto-hero-nav")).toBeHidden();
  await expect(hero.locator(".gusto-hero-caret")).toBeHidden();
  await expect(hero.locator(".gusto-hero-brush")).toBeHidden();
  await expect(hero.locator(".gusto-vertical")).toBeHidden();
  await expect(heading.locator(".gusto-hero-title-emphasis")).toHaveCount(3);
  await expect(heading).toHaveCSS("font-size", "48px");
  await expect(heading).toHaveCSS("line-height", "60px");
  await expect(heading.locator(".gusto-hero-title-emphasis").first()).toHaveCSS("font-size", "68px");

  const heroBox = await hero.boundingBox();
  const headingBox = await heading.boundingBox();
  const dishesBox = await dishes.boundingBox();
  const vegetablesBox = await vegetables.boundingBox();

  expect(heroBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(dishesBox).not.toBeNull();
  expect(vegetablesBox).not.toBeNull();
  expect(heroBox!.y).toBeCloseTo(84, 1);
  expect(heroBox!.width).toBeCloseTo(393, 1);
  expect(heroBox!.height).toBeCloseTo(675, 1);
  expect(headingBox!.x - heroBox!.x).toBeCloseTo(16, 1);
  expect(headingBox!.y - heroBox!.y).toBeCloseTo(0, 1);
  expect(headingBox!.width).toBeCloseTo(361, 1);
  expect(headingBox!.height).toBeCloseTo(180, 1);
  expect(dishesBox!.x - heroBox!.x).toBeCloseTo(-17.040405, 1);
  expect(dishesBox!.y - heroBox!.y).toBeCloseTo(123.562851, 1);
  expect(dishesBox!.width).toBeCloseTo(464.832825, 1);
  expect(dishesBox!.height).toBeCloseTo(501.597656, 1);
  expect(vegetablesBox!.x - heroBox!.x).toBeCloseTo(16, 1);
  expect(vegetablesBox!.y - heroBox!.y).toBeCloseTo(516.244629, 1);
  expect(vegetablesBox!.width).toBeCloseTo(201.76062, 1);
  expect(vegetablesBox!.height).toBeCloseTo(137.972656, 1);
});

test("the 393px About flex row wraps its content top-to-bottom", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const about = page.locator("#about");
  const brush = about.locator(".gusto-about-brush");
  const copy = about.locator(".gusto-about-left");
  const visual = about.locator(".gusto-about-right");
  const title = about.locator(".gusto-about-title");
  const body = about.locator(".gusto-about-body");
  const more = about.locator(".gusto-about-more");
  const image = about.locator(".gusto-about-image");
  const artwork = image.locator("img");

  const aboutBox = await about.boundingBox();
  const brushBox = await brush.boundingBox();
  const copyBox = await copy.boundingBox();
  const titleBox = await title.boundingBox();
  const bodyBox = await body.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(aboutBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(bodyBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(aboutBox!.y).toBeCloseTo(759, 1);
  expect(aboutBox!.width).toBeCloseTo(393, 1);
  expect(aboutBox!.height).toBeCloseTo(961.976929, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - aboutBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(393, 1);
  expect(brushBox!.height).toBeCloseTo(28.976917, 1);
  expect(copyBox!.x).toBeCloseTo(16, 1);
  expect(copyBox!.y - aboutBox!.y).toBeCloseTo(76.976917, 1);
  expect(copyBox!.width).toBeCloseTo(361, 1);
  expect(copyBox!.height).toBeCloseTo(408.000031, 1);
  expect(titleBox!.y - aboutBox!.y).toBeCloseTo(76.976917, 1);
  expect(titleBox!.width).toBeLessThan(copyBox!.width);
  expect(titleBox!.x - copyBox!.x).toBeCloseTo((copyBox!.width - titleBox!.width) / 2, 1);
  expect(titleBox!.height).toBeCloseTo(35, 1);
  expect(
    Number.parseFloat(await title.evaluate((element) => getComputedStyle(element, "::after").width)),
  ).toBeCloseTo(titleBox!.width, 1);
  expect(bodyBox!.x).toBeCloseTo(16, 1);
  expect(bodyBox!.y - aboutBox!.y).toBeCloseTo(159.976936, 1);
  expect(bodyBox!.width).toBeCloseTo(361, 1);
  expect(bodyBox!.height).toBeCloseTo(216, 1);
  expect(moreBox!.x).toBeCloseTo(16, 1);
  expect(moreBox!.y - aboutBox!.y).toBeCloseTo(423.976936, 1);
  expect(moreBox!.width).toBeCloseTo(361, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(imageBox!.x).toBeCloseTo(16, 1);
  expect(imageBox!.y - aboutBox!.y).toBeCloseTo(516.976948, 1);
  expect(imageBox!.width).toBeCloseTo(361, 1);
  expect(imageBox!.height).toBeCloseTo(397, 1);
  expect(await about.evaluate((element) => getComputedStyle(element, "::after").backgroundColor)).toBe(
    "rgb(27, 40, 27)",
  );
  await expect(about).toHaveCSS("display", "flex");
  await expect(about).toHaveCSS("flex-direction", "row");
  await expect(about).toHaveCSS("flex-wrap", "wrap");
  expect(await copy.evaluate((element) => getComputedStyle(element).flexBasis)).toBe("100%");
  expect(await visual.evaluate((element) => getComputedStyle(element).flexBasis)).toBe("100%");
  await expect(title.getByRole("heading", { name: "グストとは" })).toHaveCSS("font-size", "48px");
  await expect(title.getByRole("heading", { name: "グストとは" })).toHaveCSS("color", "rgb(242, 108, 79)");
  await expect(body).toHaveCSS("font-size", "18px");
  await expect(body).toHaveCSS("line-height", "24px");
  await expect(body).toHaveCSS("color", "rgb(246, 230, 224)");
  await expect(more).toHaveCSS("font-size", "18px");
  await expect(more).toHaveCSS("color", "rgb(246, 230, 224)");
  await expect(more).toHaveCSS("text-decoration-line", "none");
  await expect(artwork).toHaveCSS("object-fit", "fill");
});

test("the 768px About section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const about = page.locator("#about");
  const brush = about.locator(".gusto-about-brush");
  const title = about.locator(".gusto-about-title");
  const body = about.locator(".gusto-about-body");
  const more = about.locator(".gusto-about-more");
  const image = about.locator(".gusto-about-image");

  const aboutBox = await about.boundingBox();
  const brushBox = await brush.boundingBox();
  const titleBox = await title.boundingBox();
  const bodyBox = await body.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(aboutBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(bodyBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(aboutBox!.y).toBeCloseTo(964, 1);
  expect(aboutBox!.width).toBeCloseTo(768, 1);
  expect(aboutBox!.height).toBeCloseTo(1239.476807, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - aboutBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(768, 1);
  expect(brushBox!.height).toBeCloseTo(56.62664, 1);
  expect(titleBox!.x).toBeCloseTo(288, 1);
  expect(titleBox!.y - aboutBox!.y).toBeCloseTo(120.62664, 1);
  expect(titleBox!.width).toBeCloseTo(192, 1);
  expect(titleBox!.height).toBeCloseTo(52.000023, 1);
  expect(await title.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("192px");
  expect(bodyBox!.x).toBeCloseTo(85.493042, 1);
  expect(bodyBox!.y - aboutBox!.y).toBeCloseTo(220.626663, 1);
  expect(bodyBox!.width).toBeCloseTo(597.013916, 1);
  expect(bodyBox!.height).toBeCloseTo(144, 1);
  expect(moreBox!.x).toBeCloseTo(24, 1);
  expect(moreBox!.y - aboutBox!.y).toBeCloseTo(412.626671, 1);
  expect(moreBox!.width).toBeCloseTo(720, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(imageBox!.x).toBeCloseTo(78.001129, 1);
  expect(imageBox!.y - aboutBox!.y).toBeCloseTo(504.626709, 1);
  expect(imageBox!.width).toBeCloseTo(611.997742, 1);
  expect(imageBox!.height).toBeCloseTo(670.850098, 1);
  await expect(title.getByRole("heading", { name: "グストとは" })).toHaveCSS("font-size", "60px");
  await expect(body).toHaveCSS("font-size", "22px");
});

test("the 393px Wine flex row wraps its content top-to-bottom", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const wine = page.locator("#wine");
  const inner = wine.locator(".gusto-wine-inner");
  const copy = wine.locator(".gusto-wine-copy");
  const title = wine.locator(".gusto-wine-title");
  const text = wine.locator(".gusto-wine-text");
  const more = wine.locator(".gusto-wine-more");
  const visual = wine.locator(".gusto-wine-visual");
  const artwork = visual.locator("img");

  const wineBox = await wine.boundingBox();
  const innerBox = await inner.boundingBox();
  const copyBox = await copy.boundingBox();
  const titleBox = await title.boundingBox();
  const textBox = await text.boundingBox();
  const moreBox = await more.boundingBox();
  const visualBox = await visual.boundingBox();
  const artworkBox = await artwork.boundingBox();

  expect(wineBox).not.toBeNull();
  expect(innerBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(textBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(visualBox).not.toBeNull();
  expect(artworkBox).not.toBeNull();
  expect(wineBox!.x).toBeCloseTo(0, 1);
  expect(wineBox!.width).toBeCloseTo(393, 1);
  expect(innerBox!.x).toBeCloseTo(0, 1);
  expect(innerBox!.width).toBeCloseTo(393, 1);
  expect(copyBox!.x).toBeCloseTo(16, 1);
  expect(visualBox!.x).toBeCloseTo(16, 1);
  expect(copyBox!.width).toBeCloseTo(361, 1);
  expect(visualBox!.width).toBeCloseTo(361, 1);
  expect(titleBox!.width).toBeLessThan(copyBox!.width);
  expect(titleBox!.x - copyBox!.x).toBeCloseTo((copyBox!.width - titleBox!.width) / 2, 1);
  expect(
    Number.parseFloat(await title.evaluate((element) => getComputedStyle(element, "::after").width)),
  ).toBeCloseTo(titleBox!.width, 1);
  expect(visualBox!.y - copyBox!.y - copyBox!.height).toBeCloseTo(32, 1);
  expect(textBox!.width).toBeCloseTo(copyBox!.width, 1);
  expect(moreBox!.width).toBeCloseTo(copyBox!.width, 1);
  expect(artworkBox!.x).toBeCloseTo(16, 1);
  expect(artworkBox!.width).toBeCloseTo(visualBox!.width, 1);
  expect(artworkBox!.height).toBeCloseTo(visualBox!.height, 1);
  await expect(inner).toHaveCSS("display", "flex");
  await expect(inner).toHaveCSS("flex-direction", "row");
  await expect(inner).toHaveCSS("flex-wrap", "wrap");
  await expect(copy).toHaveCSS("overflow", "visible");
  await expect(text).toHaveCSS("overflow", "visible");
  await expect(text).toHaveCSS("font-size", "18px");
  await expect(text).toHaveCSS("line-height", "24px");
});

test("the 768px Wine section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const wine = page.locator("#wine");
  const topBrush = wine.locator(".gusto-wine-brush-top");
  const bottomBrush = wine.locator(".gusto-wine-brush-bottom");
  const copy = wine.locator(".gusto-wine-copy");
  const title = wine.locator(".gusto-wine-title");
  const text = wine.locator(".gusto-wine-text");
  const more = wine.locator(".gusto-wine-more");
  const visual = wine.locator(".gusto-wine-visual");
  const artwork = visual.locator("img");

  const wineBox = await wine.boundingBox();
  const topBrushBox = await topBrush.boundingBox();
  const bottomBrushBox = await bottomBrush.boundingBox();
  const copyBox = await copy.boundingBox();
  const titleBox = await title.boundingBox();
  const textBox = await text.boundingBox();
  const moreBox = await more.boundingBox();
  const visualBox = await visual.boundingBox();
  const artworkBox = await artwork.boundingBox();

  expect(wineBox).not.toBeNull();
  expect(topBrushBox).not.toBeNull();
  expect(bottomBrushBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(textBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(visualBox).not.toBeNull();
  expect(artworkBox).not.toBeNull();
  expect(wineBox!.x).toBeCloseTo(0, 1);
  expect(wineBox!.y).toBeCloseTo(2203.476807, 1);
  expect(wineBox!.width).toBeCloseTo(768, 1);
  expect(wineBox!.height).toBeCloseTo(1097.074585, 1);
  expect(topBrushBox!.y - wineBox!.y).toBeCloseTo(0, 1);
  expect(topBrushBox!.height).toBeCloseTo(72.251732, 1);
  expect(bottomBrushBox!.y - wineBox!.y).toBeCloseTo(1021.251709, 1);
  expect(bottomBrushBox!.height).toBeCloseTo(75.822929, 1);
  expect(copyBox!.x).toBeCloseTo(24, 1);
  expect(copyBox!.y - wineBox!.y).toBeCloseTo(144.251732, 1);
  expect(copyBox!.width).toBeCloseTo(720, 1);
  expect(copyBox!.height).toBeCloseTo(399.000031, 1);
  expect(titleBox!.x).toBeCloseTo(270, 1);
  expect(titleBox!.y - wineBox!.y).toBeCloseTo(144.251732, 1);
  expect(titleBox!.width).toBeCloseTo(228, 1);
  expect(await title.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("228px");
  expect(textBox!.x).toBeCloseTo(85, 1);
  expect(textBox!.y - wineBox!.y).toBeCloseTo(243.251763, 1);
  expect(textBox!.width).toBeCloseTo(598, 1);
  expect(textBox!.height).toBeCloseTo(192, 1);
  expect(moreBox!.y - wineBox!.y).toBeCloseTo(483.251763, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(visualBox!.x).toBeCloseTo(24, 1);
  expect(visualBox!.y - wineBox!.y).toBeCloseTo(575.251763, 1);
  expect(visualBox!.width).toBeCloseTo(720, 1);
  expect(visualBox!.height).toBeCloseTo(382, 1);
  expect(artworkBox!.x).toBeCloseTo(186.75, 1);
  expect(artworkBox!.y - wineBox!.y).toBeCloseTo(575.251763, 1);
  expect(artworkBox!.width).toBeCloseTo(394.5, 1);
  expect(artworkBox!.height).toBeCloseTo(358.636383, 1);
  await expect(title.getByRole("heading", { name: "ワインのこと" })).toHaveCSS("font-size", "60px");
  await expect(text).toHaveCSS("font-size", "22px");
});

for (const { width, height, project } of [
  { width: 393, height: 852, project: "mobile" },
  { width: 768, height: 1024, project: "desktop" },
]) {
  test(`the ${width}px recommendations keep each dish in a vertical card`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== project, "Viewport-specific layout check");
    await page.setViewportSize({ width, height });
    await page.goto("/ja");

    const section = page.locator("#recommendations");
    const articles = section.locator("article");
    const count = await articles.count();
    expect(count).toBeGreaterThan(1);

    for (let index = 0; index < count; index += 1) {
      const article = articles.nth(index);
      const copy = article.locator(".gusto-feature-copy");
      const image = article.locator(".gusto-feature-image");
      const link = article.getByRole("link");
      const [articleBox, copyBox, imageBox] = await Promise.all([
        article.boundingBox(),
        copy.boundingBox(),
        image.boundingBox(),
      ]);

      expect(articleBox).not.toBeNull();
      expect(copyBox).not.toBeNull();
      expect(imageBox).not.toBeNull();
      expect(articleBox!.width).toBeCloseTo(width, 0);
      expect(copyBox!.x).toBeGreaterThanOrEqual(articleBox!.x);
      expect(copyBox!.x + copyBox!.width).toBeLessThanOrEqual(articleBox!.x + articleBox!.width + 1);
      expect(imageBox!.y).toBeGreaterThanOrEqual(copyBox!.y + copyBox!.height);
      expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(articleBox!.y + articleBox!.height + 1);
      await expect(link).toBeVisible();

      if (index > 0) {
        const previous = await articles.nth(index - 1).boundingBox();
        expect(articleBox!.y).toBeGreaterThanOrEqual(previous!.y + previous!.height);
      }
    }
  });
}

test("the 1440px hero follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const hero = page.locator(".gusto-hero");
  const heading = hero.getByRole("heading", { level: 1 });
  const nav = hero.getByRole("navigation", { name: "ホームページ内ナビゲーション" });
  const vegetables = hero.locator(".gusto-hero-veg");

  const heroBox = await hero.boundingBox();
  const headingBox = await heading.boundingBox();
  const navBox = await nav.boundingBox();
  const vegetablesBox = await vegetables.boundingBox();

  expect(heroBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(navBox).not.toBeNull();
  expect(vegetablesBox).not.toBeNull();
  expect(heroBox!.height).toBeCloseTo(952, 1);
  expect(headingBox!.x).toBeCloseTo(202.271194, 1);
  expect(headingBox!.y).toBeCloseTo(204.869141, 1);
  expect(navBox!.x).toBeCloseTo(204.827301, 1);
  expect(navBox!.y).toBeCloseTo(532.714966, 1);
  expect(vegetablesBox!.x).toBeCloseTo(394.24704, 1);
  expect(vegetablesBox!.y).toBeCloseTo(549.103516, 1);
  expect(vegetablesBox!.width).toBeCloseTo(415.595337, 1);
});

test("the 1440px About section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const about = page.locator("#about");
  const title = about.getByRole("heading", { level: 2, name: "グストとは" });
  const body = about.locator(".gusto-about-body");
  const image = about.locator(".gusto-about-image");
  const link = about.getByRole("link", { name: "ワインのうんちくを読む" });

  const aboutBox = await about.boundingBox();
  const titleBox = await title.boundingBox();
  const bodyBox = await body.boundingBox();
  const imageBox = await image.boundingBox();
  const linkBox = await link.boundingBox();

  expect(aboutBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(bodyBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(aboutBox!.height).toBeCloseTo(832, 1);
  expect(titleBox!.x).toBeCloseTo(96, 1);
  expect(titleBox!.y - aboutBox!.y).toBeCloseTo(60, 1);
  expect(titleBox!.width).toBeCloseTo(320, 1);
  expect(bodyBox!.x).toBeCloseTo(96, 1);
  expect(bodyBox!.y - aboutBox!.y).toBeCloseTo(192, 1);
  expect(imageBox!.x).toBeCloseTo(732, 1);
  expect(imageBox!.y - aboutBox!.y).toBeCloseTo(60, 1);
  expect(imageBox!.width).toBeCloseTo(612, 1);
  expect(imageBox!.height).toBeCloseTo(672, 1);
  expect(linkBox!.x).toBeCloseTo(96, 1);
  expect(linkBox!.y - aboutBox!.y).toBeCloseTo(471, 1);
});

test("the 1440px Wine section keeps its flex content centered", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const wine = page.locator("#wine");
  const visual = wine.locator(".gusto-wine-visual");
  const title = wine.getByRole("heading", { level: 2, name: "ワインのこと" });
  const text = wine.locator(".gusto-wine-text");
  const link = wine.getByRole("link", { name: "ワインメニューを見る" });

  const wineBox = await wine.boundingBox();
  const visualBox = await visual.boundingBox();
  const titleBox = await title.boundingBox();
  const textBox = await text.boundingBox();
  const linkBox = await link.boundingBox();

  expect(wineBox).not.toBeNull();
  expect(visualBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(textBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(wineBox!.height).toBeCloseTo(1068.639893, 1);
  expect(visualBox!.x).toBeCloseTo(85, 1);
  expect(visualBox!.y - wineBox!.y).toBeCloseTo(195.472, 1);
  expect(visualBox!.width).toBeCloseTo(738, 1);
  expect(visualBox!.height).toBeCloseTo(671, 1);
  expect(titleBox!.x).toBeCloseTo(855, 1);
  expect(titleBox!.y - wineBox!.y).toBeCloseTo(195.472, 1);
  expect(textBox!.x).toBeCloseTo(855, 1);
  expect(textBox!.y - wineBox!.y).toBeCloseTo(326.472, 1);
  expect(linkBox!.x).toBeCloseTo(855, 1);
  expect(linkBox!.y - wineBox!.y).toBeCloseTo(770.472, 1);
});

test("the 1440px recommendations keep the desktop side-by-side layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only layout check");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ja");

  const section = page.locator("#recommendations");
  const track = page.getByTestId("recommendations-track");
  await expect(track).toHaveCSS("flex-direction", "row");
  await expect(section.locator(":scope > div")).toHaveCSS("position", "sticky");

  for (const article of await section.locator("article").all()) {
    const [articleBox, copyBox, imageBox] = await Promise.all([
      article.boundingBox(),
      article.locator(".gusto-feature-copy").boundingBox(),
      article.locator(".gusto-feature-image").boundingBox(),
    ]);
    expect(articleBox).not.toBeNull();
    expect(copyBox).not.toBeNull();
    expect(imageBox).not.toBeNull();
    expect(articleBox!.width).toBeCloseTo(1440, 0);
    expect(articleBox!.height).toBeCloseTo(900, 0);
    expect(imageBox!.x).toBeGreaterThanOrEqual(copyBox!.x + copyBox!.width);
    expect(imageBox!.height).toBeGreaterThan(0);
    await expect(article.getByRole("link")).toBeVisible();
  }
});

test("the 393px social section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const social = page.locator("#social");
  const brush = social.locator(".gusto-social-brush");
  const gallery = social.locator(".gusto-gallery");
  const galleryItem = social.locator(".gusto-gallery-item").first();
  const links = social.locator(".gusto-social-links");
  const firstLink = links.locator("a").first();
  const firstCopy = firstLink.locator(".gusto-social-copy");
  const firstHeading = firstLink.locator(".gusto-social-heading");
  const firstDecoration = firstHeading.locator("img");
  const firstTitle = firstHeading.locator("span");
  const firstDescription = firstCopy.locator("p");
  const firstIcon = firstLink.locator(":scope > span > svg");

  const socialBox = await social.boundingBox();
  const brushBox = await brush.boundingBox();
  const galleryBox = await gallery.boundingBox();
  const galleryItemBox = await galleryItem.boundingBox();
  const linksBox = await links.boundingBox();
  const firstLinkBox = await firstLink.boundingBox();
  const firstCopyBox = await firstCopy.boundingBox();
  const firstHeadingBox = await firstHeading.boundingBox();
  const firstDecorationBox = await firstDecoration.boundingBox();
  const firstIconBox = await firstIcon.boundingBox();

  expect(socialBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(galleryBox).not.toBeNull();
  expect(galleryItemBox).not.toBeNull();
  expect(linksBox).not.toBeNull();
  expect(firstLinkBox).not.toBeNull();
  expect(firstCopyBox).not.toBeNull();
  expect(firstHeadingBox).not.toBeNull();
  expect(firstDecorationBox).not.toBeNull();
  expect(firstIconBox).not.toBeNull();
  expect(socialBox!.height).toBeCloseTo(573, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - socialBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(393, 1);
  expect(galleryBox!.x).toBeCloseTo(-340.5, 1);
  expect(galleryBox!.y - socialBox!.y).toBeCloseTo(70.800018, 1);
  expect(galleryBox!.width).toBeCloseTo(1074, 1);
  expect(galleryBox!.height).toBeCloseTo(100, 1);
  expect(galleryItemBox!.width).toBeCloseTo(150, 1);
  expect(galleryItemBox!.height).toBeCloseTo(100, 1);
  expect(linksBox!.x).toBeCloseTo(16, 1);
  expect(linksBox!.y - socialBox!.y).toBeCloseTo(234, 1);
  expect(linksBox!.width).toBeCloseTo(361, 1);
  expect(linksBox!.height).toBeCloseTo(286, 1);
  expect(firstLinkBox!.width).toBeCloseTo(120.333333, 1);
  expect(firstLinkBox!.height).toBeCloseTo(286, 1);
  expect(firstCopyBox!.width).toBeCloseTo(103.333333, 1);
  expect(firstCopyBox!.height).toBeCloseTo(110, 1);
  expect(firstHeadingBox!.height).toBeCloseTo(72, 1);
  expect(firstDecorationBox!.width).toBeCloseTo(43.2, 1);
  expect(firstDecorationBox!.height).toBeCloseTo(24, 1);
  expect(firstIconBox!.width).toBeCloseTo(32, 1);
  expect(firstIconBox!.height).toBeCloseTo(32, 1);
  await expect(firstTitle).toHaveCSS("font-size", "20px");
  await expect(firstDescription).toHaveCSS("font-size", "14px");
  expect(await firstTitle.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test("the 768px social section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const social = page.locator("#social");
  const brush = social.locator(".gusto-social-brush");
  const gallery = social.locator(".gusto-gallery");
  const galleryItem = social.locator(".gusto-gallery-item").first();
  const links = social.locator(".gusto-social-links");
  const firstLink = links.locator("a").first();
  const firstCopy = firstLink.locator(".gusto-social-copy");
  const firstHeading = firstLink.locator(".gusto-social-heading");
  const firstDecoration = firstHeading.locator("img");
  const firstTitle = firstHeading.locator("span");
  const firstDescription = firstCopy.locator("p");
  const firstIcon = firstLink.locator(":scope > span > svg");

  const socialBox = await social.boundingBox();
  const brushBox = await brush.boundingBox();
  const galleryBox = await gallery.boundingBox();
  const galleryItemBox = await galleryItem.boundingBox();
  const linksBox = await links.boundingBox();
  const firstLinkBox = await firstLink.boundingBox();
  const firstCopyBox = await firstCopy.boundingBox();
  const firstHeadingBox = await firstHeading.boundingBox();
  const firstDecorationBox = await firstDecoration.boundingBox();
  const firstIconBox = await firstIcon.boundingBox();

  expect(socialBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(galleryBox).not.toBeNull();
  expect(galleryItemBox).not.toBeNull();
  expect(linksBox).not.toBeNull();
  expect(firstLinkBox).not.toBeNull();
  expect(firstCopyBox).not.toBeNull();
  expect(firstHeadingBox).not.toBeNull();
  expect(firstDecorationBox).not.toBeNull();
  expect(firstIconBox).not.toBeNull();
  expect(socialBox!.height).toBeCloseTo(714.626709, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - socialBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(768, 1);
  expect(galleryBox!.x).toBeCloseTo(-690, 1);
  expect(galleryBox!.y - socialBox!.y).toBeCloseTo(106.626709, 1);
  expect(galleryBox!.width).toBeCloseTo(2148, 1);
  expect(galleryBox!.height).toBeCloseTo(200, 1);
  expect(galleryItemBox!.width).toBeCloseTo(300, 1);
  expect(galleryItemBox!.height).toBeCloseTo(200, 1);
  expect(linksBox!.x).toBeCloseTo(23, 1);
  expect(linksBox!.y - socialBox!.y).toBeCloseTo(378.626709, 1);
  expect(linksBox!.width).toBeCloseTo(722, 1);
  expect(linksBox!.height).toBeCloseTo(286, 1);
  expect(firstLinkBox!.width).toBeCloseTo(240.666667, 1);
  expect(firstLinkBox!.height).toBeCloseTo(286, 1);
  expect(firstCopyBox!.width).toBeCloseTo(176.666667, 1);
  expect(firstCopyBox!.height).toBeCloseTo(110, 1);
  expect(firstHeadingBox!.height).toBeCloseTo(72, 1);
  expect(firstDecorationBox!.width).toBeCloseTo(57.6, 1);
  expect(firstDecorationBox!.height).toBeCloseTo(32, 1);
  expect(firstIconBox!.width).toBeCloseTo(64, 1);
  expect(firstIconBox!.height).toBeCloseTo(64, 1);
  await expect(firstTitle).toHaveCSS("font-size", "24px");
  await expect(firstDescription).toHaveCSS("font-size", "14px");
});

test("the 1440px social links remain centered", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/ja");

  const social = page.locator("#social");
  const brush = social.locator(".gusto-social-brush");
  const gallery = social.locator(".gusto-gallery");
  const galleryItem = social.locator(".gusto-gallery-item").nth(1);
  const links = social.locator(".gusto-social-links");
  const firstLink = links.locator("a").first();
  const firstCopy = firstLink.locator(".gusto-social-copy");
  const firstIcon = firstLink.locator(":scope > span > svg");

  const socialBox = await social.boundingBox();
  const brushBox = await brush.boundingBox();
  const galleryBox = await gallery.boundingBox();
  const galleryItemBox = await galleryItem.boundingBox();
  const linksBox = await links.boundingBox();
  const firstLinkBox = await firstLink.boundingBox();
  const firstCopyBox = await firstCopy.boundingBox();
  const firstIconBox = await firstIcon.boundingBox();

  expect(socialBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(galleryBox).not.toBeNull();
  expect(galleryItemBox).not.toBeNull();
  expect(linksBox).not.toBeNull();
  expect(firstLinkBox).not.toBeNull();
  expect(firstCopyBox).not.toBeNull();
  expect(firstIconBox).not.toBeNull();
  expect(socialBox!.height).toBeCloseTo(814.17511, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - socialBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(1440, 1);
  expect(galleryBox!.x).toBeCloseTo(-354, 1);
  expect(galleryBox!.y - socialBox!.y).toBeCloseTo(156.175087, 1);
  expect(galleryBox!.width).toBeCloseTo(2148, 1);
  expect(galleryItemBox!.width).toBeCloseTo(300, 1);
  expect(galleryItemBox!.height).toBeCloseTo(200, 1);
  expect(linksBox!.x).toBeCloseTo(129, 1);
  expect(linksBox!.y - socialBox!.y).toBeCloseTo(407.087555, 1);
  expect(linksBox!.width).toBeCloseTo(1182, 1);
  expect(linksBox!.height).toBeCloseTo(286, 1);
  expect(firstLinkBox!.width).toBeCloseTo(394, 1);
  expect(firstCopyBox!.width).toBeCloseTo(330, 1);
  expect(firstCopyBox!.height).toBeCloseTo(126, 1);
  expect(firstIconBox!.width).toBeCloseTo(48, 1);
  expect(firstIconBox!.height).toBeCloseTo(48, 1);
});

test("the 393px reservation section keeps its current layout with natural content heights", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const reservation = page.locator("#reservation");
  const image = reservation.locator(".gusto-reservation-image");
  const topBrush = reservation.locator(".gusto-reservation-brush-top");
  const bottomBrush = reservation.locator(".gusto-reservation-brush-bottom");
  const booking = reservation.locator(".gusto-booking");
  const title = booking.locator(".gusto-booking-title");
  const heading = title.locator("h2");
  const label = title.locator("p");
  const notes = booking.locator(".gusto-booking-notes");
  const button = booking.locator(".gusto-booking-button");

  const reservationBox = await reservation.boundingBox();
  const imageBox = await image.boundingBox();
  const topBrushBox = await topBrush.boundingBox();
  const bottomBrushBox = await bottomBrush.boundingBox();
  const bookingBox = await booking.boundingBox();
  const titleBox = await title.boundingBox();
  const headingBox = await heading.boundingBox();
  const labelBox = await label.boundingBox();
  const notesBox = await notes.boundingBox();
  const buttonBox = await button.boundingBox();

  expect(reservationBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(topBrushBox).not.toBeNull();
  expect(bottomBrushBox).not.toBeNull();
  expect(bookingBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(notesBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();
  expect(reservationBox!.height).toBeCloseTo(bookingBox!.height + 200, 1);
  expect(imageBox!.x).toBeCloseTo(0, 1);
  expect(imageBox!.y - reservationBox!.y).toBeCloseTo(0, 1);
  expect(imageBox!.width).toBeCloseTo(393, 1);
  expect(imageBox!.height).toBeCloseTo(reservationBox!.height, 1);
  expect(topBrushBox!.x).toBeCloseTo(0, 1);
  expect(topBrushBox!.y - reservationBox!.y).toBeCloseTo(0, 1);
  expect(topBrushBox!.width).toBeCloseTo(393, 1);
  expect(topBrushBox!.height).toBeCloseTo(7.284471, 1);
  expect(bottomBrushBox!.x).toBeCloseTo(0, 1);
  expect(bottomBrushBox!.y - reservationBox!.y).toBeCloseTo(
    reservationBox!.height - bottomBrushBox!.height,
    1,
  );
  expect(bottomBrushBox!.width).toBeCloseTo(393, 1);
  expect(bottomBrushBox!.height).toBeCloseTo(7.284471, 1);
  expect(bookingBox!.x).toBeCloseTo(16, 1);
  expect(bookingBox!.y - reservationBox!.y).toBeCloseTo(100, 1);
  expect(bookingBox!.width).toBeCloseTo(361, 1);
  expect(bookingBox!.height).toBeGreaterThan(0);
  expect(bookingBox!.height).toBeLessThan(642.000061);
  expect(titleBox!.x - bookingBox!.x).toBeCloseTo(81.5, 1);
  expect(titleBox!.y - bookingBox!.y).toBeCloseTo(16, 1);
  expect(titleBox!.width).toBeCloseTo(198, 1);
  expect(titleBox!.height).toBeCloseTo(54.000042, 1);
  expect(headingBox!.width).toBeCloseTo(198, 1);
  expect(headingBox!.height).toBeCloseTo(32, 1);
  expect(labelBox!.width).toBeCloseTo(182, 1);
  expect(labelBox!.height).toBeCloseTo(18, 1);
  expect(notesBox!.x - bookingBox!.x).toBeCloseTo(16, 1);
  expect(notesBox!.y - bookingBox!.y).toBeCloseTo(94.000042, 1);
  expect(notesBox!.width).toBeCloseTo(329, 1);
  expect(notesBox!.height).toBeGreaterThan(0);
  expect(notesBox!.height).toBeLessThan(462);
  expect(buttonBox!.x - bookingBox!.x).toBeCloseTo(16, 1);
  expect(buttonBox!.y - notesBox!.y - notesBox!.height).toBeCloseTo(24, 1);
  expect(buttonBox!.width).toBeCloseTo(329, 1);
  expect(buttonBox!.height).toBeCloseTo(46, 1);
  expect(bookingBox!.y + bookingBox!.height - buttonBox!.y - buttonBox!.height).toBeCloseTo(16, 1);
  await expect(heading).toHaveCSS("font-size", "32px");
  await expect(label).toHaveCSS("font-size", "14px");
  await expect(notes).toHaveCSS("font-size", "14px");
  await expect(notes).toHaveCSS("line-height", "27px");
  await expect(button).toHaveCSS("font-size", "14px");
  expect(await notes.evaluate((element) => element.scrollHeight <= element.clientHeight)).toBe(true);
});

test("the 768px reservation section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const reservation = page.locator("#reservation");
  const image = reservation.locator(".gusto-reservation-image");
  const topBrush = reservation.locator(".gusto-reservation-brush-top");
  const bottomBrush = reservation.locator(".gusto-reservation-brush-bottom");
  const booking = reservation.locator(".gusto-booking");
  const title = booking.locator(".gusto-booking-title");
  const heading = title.locator("h2");
  const label = title.locator("p");
  const notes = booking.locator(".gusto-booking-notes");
  const button = booking.locator(".gusto-booking-button");

  const reservationBox = await reservation.boundingBox();
  const imageBox = await image.boundingBox();
  const bottomBrushBox = await bottomBrush.boundingBox();
  const bookingBox = await booking.boundingBox();
  const titleBox = await title.boundingBox();
  const headingBox = await heading.boundingBox();
  const labelBox = await label.boundingBox();
  const notesBox = await notes.boundingBox();
  const buttonBox = await button.boundingBox();

  expect(reservationBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(bottomBrushBox).not.toBeNull();
  expect(bookingBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(notesBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();
  expect(reservationBox!.height).toBeCloseTo(832, 1);
  expect(imageBox!.x).toBeCloseTo(0, 1);
  expect(imageBox!.y - reservationBox!.y).toBeCloseTo(0, 1);
  expect(imageBox!.width).toBeCloseTo(768, 1);
  expect(imageBox!.height).toBeCloseTo(832, 1);
  await expect(topBrush).toBeHidden();
  expect(bottomBrushBox!.x).toBeCloseTo(0, 1);
  expect(bottomBrushBox!.y - reservationBox!.y).toBeCloseTo(817.773438, 1);
  expect(bottomBrushBox!.width).toBeCloseTo(768, 1);
  expect(bottomBrushBox!.height).toBeCloseTo(14.235302, 1);
  expect(bookingBox!.x).toBeCloseTo(192, 1);
  expect(bookingBox!.y - reservationBox!.y).toBeCloseTo(76.999969, 1);
  expect(bookingBox!.width).toBeCloseTo(384, 1);
  expect(bookingBox!.height).toBeCloseTo(678.000061, 1);
  expect(titleBox!.x - bookingBox!.x).toBeCloseTo(43.5, 1);
  expect(titleBox!.y - bookingBox!.y).toBeCloseTo(16, 1);
  expect(titleBox!.width).toBeCloseTo(297, 1);
  expect(titleBox!.height).toBeCloseTo(80.000038, 1);
  expect(headingBox!.width).toBeCloseTo(297, 1);
  expect(headingBox!.height).toBeCloseTo(48, 1);
  expect(labelBox!.width).toBeCloseTo(234, 1);
  expect(labelBox!.height).toBeCloseTo(28, 1);
  expect(notesBox!.x - bookingBox!.x).toBeCloseTo(16, 1);
  expect(notesBox!.y - bookingBox!.y).toBeCloseTo(120.000038, 1);
  expect(notesBox!.width).toBeCloseTo(352, 1);
  expect(notesBox!.height).toBeCloseTo(462, 1);
  expect(buttonBox!.x - bookingBox!.x).toBeCloseTo(16, 1);
  expect(buttonBox!.y - bookingBox!.y).toBeCloseTo(606.000038, 1);
  expect(buttonBox!.width).toBeCloseTo(352, 1);
  expect(buttonBox!.height).toBeCloseTo(56, 1);
  await expect(heading).toHaveCSS("font-size", "48px");
  await expect(label).toHaveCSS("font-size", "18px");
  await expect(notes).toHaveCSS("font-size", "14px");
  await expect(notes).toHaveCSS("line-height", "27px");
  await expect(button).toHaveCSS("font-size", "18px");
});

test("the 1440px reservation section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/ja");

  const reservation = page.locator("#reservation");
  const image = reservation.locator(".gusto-reservation-image");
  const topBrush = reservation.locator(".gusto-reservation-brush-top");
  const bottomBrush = reservation.locator(".gusto-reservation-brush-bottom");
  const booking = reservation.locator(".gusto-booking");
  const title = booking.locator(".gusto-booking-title");
  const notes = booking.locator(".gusto-booking-notes");
  const button = booking.locator(".gusto-booking-button");

  const reservationBox = await reservation.boundingBox();
  const imageBox = await image.boundingBox();
  const topBrushBox = await topBrush.boundingBox();
  const bottomBrushBox = await bottomBrush.boundingBox();
  const bookingBox = await booking.boundingBox();
  const titleBox = await title.boundingBox();
  const notesBox = await notes.boundingBox();
  const buttonBox = await button.boundingBox();

  expect(reservationBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(topBrushBox).not.toBeNull();
  expect(bottomBrushBox).not.toBeNull();
  expect(bookingBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(notesBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();
  expect(reservationBox!.height).toBeCloseTo(914, 1);
  expect(imageBox!.x).toBeCloseTo(0, 1);
  expect(imageBox!.y - reservationBox!.y).toBeCloseTo(0, 1);
  expect(imageBox!.width).toBeCloseTo(1440, 1);
  expect(imageBox!.height).toBeCloseTo(914, 1);
  expect(topBrushBox!.height).toBeCloseTo(26.691189, 1);
  expect(bottomBrushBox!.y - reservationBox!.y).toBeCloseTo(887.308811, 1);
  expect(bottomBrushBox!.height).toBeCloseTo(26.691189, 1);
  expect(bookingBox!.x).toBeCloseTo(414, 1);
  expect(bookingBox!.y - reservationBox!.y).toBeCloseTo(200, 1);
  expect(bookingBox!.width).toBeCloseTo(710, 1);
  expect(bookingBox!.height).toBeCloseTo(514, 1);
  expect(titleBox!.width).toBeCloseTo(322, 1);
  expect(titleBox!.height).toBeCloseTo(84, 1);
  expect(notesBox!.width).toBeCloseTo(517, 1);
  expect(notesBox!.height).toBeCloseTo(294, 1);
  expect(buttonBox!.width).toBeCloseTo(360, 1);
  expect(buttonBox!.height).toBeCloseTo(56, 1);
});

test("the 393px access section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const access = page.locator("#access");
  const title = access.locator(".gusto-access-title");
  const heading = title.locator("h2");
  const label = title.locator("p");
  const grid = access.locator(".gusto-access-grid");
  const map = access.locator(".gusto-map");
  const details = access.locator(".gusto-access-details");
  const rows = details.locator(".gusto-access-row");

  const accessBox = await access.boundingBox();
  const titleBox = await title.boundingBox();
  const headingBox = await heading.boundingBox();
  const labelBox = await label.boundingBox();
  const gridBox = await grid.boundingBox();
  const mapBox = await map.boundingBox();
  const detailsBox = await details.boundingBox();

  expect(accessBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(gridBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(detailsBox).not.toBeNull();
  expect(accessBox!.height).toBeCloseTo(954.010742, 1);
  expect(titleBox!.x).toBeCloseTo(101, 1);
  expect(titleBox!.y - accessBox!.y).toBeCloseTo(32, 1);
  expect(titleBox!.width).toBeCloseTo(191, 1);
  expect(titleBox!.height).toBeCloseTo(64.010719, 1);
  expect(headingBox!.width).toBeCloseTo(191, 1);
  expect(headingBox!.height).toBeCloseTo(32, 1);
  expect(labelBox!.width).toBeCloseTo(191, 1);
  expect(labelBox!.height).toBeCloseTo(24.010719, 1);
  expect(gridBox!.x).toBeCloseTo(16, 1);
  expect(gridBox!.y - accessBox!.y).toBeCloseTo(112.010719, 1);
  expect(gridBox!.width).toBeCloseTo(361, 1);
  expect(gridBox!.height).toBeCloseTo(810, 1);
  expect(mapBox!.width).toBeCloseTo(361, 1);
  expect(mapBox!.height).toBeCloseTo(414, 1);
  expect(detailsBox!.y - accessBox!.y).toBeCloseTo(550.010719, 1);
  expect(detailsBox!.width).toBeCloseTo(361, 1);
  expect(detailsBox!.height).toBeCloseTo(372, 1);

  const expectedRowHeights = [81, 125, 25, 50, 27];
  for (const [index, expectedHeight] of expectedRowHeights.entries()) {
    const rowBox = await rows.nth(index).boundingBox();
    expect(rowBox).not.toBeNull();
    expect(rowBox!.x).toBeCloseTo(detailsBox!.x, 1);
    expect(rowBox!.width).toBeCloseTo(361, 1);
    expect(rowBox!.height).toBeCloseTo(expectedHeight, 1);
  }

  const firstLabelBox = await rows.first().locator("dt").boundingBox();
  const firstValueBox = await rows.first().locator("dd").boundingBox();
  expect(firstLabelBox).not.toBeNull();
  expect(firstValueBox).not.toBeNull();
  expect(firstLabelBox!.width).toBeCloseTo(79, 1);
  expect(firstValueBox!.width).toBeCloseTo(282, 1);
  await expect(heading).toHaveCSS("font-size", "32px");
  await expect(label).toHaveCSS("font-size", "14px");
  await expect(details).toHaveCSS("font-size", "16px");
  await expect(details).toHaveCSS("line-height", "27px");
});

test("the 768px access section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const access = page.locator("#access");
  const title = access.locator(".gusto-access-title");
  const heading = title.locator("h2");
  const label = title.locator("p");
  const grid = access.locator(".gusto-access-grid");
  const map = access.locator(".gusto-map");
  const details = access.locator(".gusto-access-details");

  const accessBox = await access.boundingBox();
  const titleBox = await title.boundingBox();
  const headingBox = await heading.boundingBox();
  const labelBox = await label.boundingBox();
  const gridBox = await grid.boundingBox();
  const mapBox = await map.boundingBox();
  const detailsBox = await details.boundingBox();

  expect(accessBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(gridBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(detailsBox).not.toBeNull();
  expect(accessBox!.height).toBeCloseTo(1137.248535, 1);
  expect(titleBox!.x).toBeCloseTo(288.5, 1);
  expect(titleBox!.y - accessBox!.y).toBeCloseTo(64, 1);
  expect(titleBox!.width).toBeCloseTo(191, 1);
  expect(titleBox!.height).toBeCloseTo(94.248497, 1);
  expect(headingBox!.width).toBeCloseTo(191, 1);
  expect(headingBox!.height).toBeCloseTo(52, 1);
  expect(labelBox!.x).toBeCloseTo(312, 1);
  expect(labelBox!.y - accessBox!.y).toBeCloseTo(124, 1);
  expect(labelBox!.width).toBeCloseTo(144, 1);
  expect(labelBox!.height).toBeCloseTo(34.248497, 1);
  expect(gridBox!.x).toBeCloseTo(86, 1);
  expect(gridBox!.y - accessBox!.y).toBeCloseTo(215.248497, 1);
  expect(gridBox!.width).toBeCloseTo(596, 1);
  expect(gridBox!.height).toBeCloseTo(858, 1);
  expect(mapBox!.x).toBeCloseTo(86, 1);
  expect(mapBox!.y - accessBox!.y).toBeCloseTo(215.248497, 1);
  expect(mapBox!.width).toBeCloseTo(596, 1);
  expect(mapBox!.height).toBeCloseTo(414, 1);
  expect(detailsBox!.x).toBeCloseTo(86, 1);
  expect(detailsBox!.y - accessBox!.y).toBeCloseTo(653.248497, 1);
  expect(detailsBox!.width).toBeCloseTo(596, 1);
  expect(detailsBox!.height).toBeCloseTo(420, 1);
  await expect(heading).toHaveCSS("font-size", "52px");
  await expect(label).toHaveCSS("font-size", "18px");
  await expect(details).toHaveCSS("font-size", "16px");
  await expect(details).toHaveCSS("line-height", "42px");
});

test("the 1440px access section follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ja");

  const access = page.locator("#access");
  const title = access.locator(".gusto-access-title");
  const label = title.locator("p");
  const grid = access.locator(".gusto-access-grid");
  const map = access.locator(".gusto-map");
  const details = access.locator(".gusto-access-details");

  const accessBox = await access.boundingBox();
  const titleBox = await title.boundingBox();
  const labelBox = await label.boundingBox();
  const gridBox = await grid.boundingBox();
  const mapBox = await map.boundingBox();
  const detailsBox = await details.boundingBox();

  expect(accessBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(labelBox).not.toBeNull();
  expect(gridBox).not.toBeNull();
  expect(mapBox).not.toBeNull();
  expect(detailsBox).not.toBeNull();
  expect(accessBox!.height).toBeCloseTo(671.248474, 1);
  expect(titleBox!.x).toBeCloseTo(96, 1);
  expect(titleBox!.y - accessBox!.y).toBeCloseTo(50, 1);
  expect(titleBox!.width).toBeCloseTo(1248, 1);
  expect(titleBox!.height).toBeCloseTo(94.248497, 1);
  expect(labelBox!.width).toBeCloseTo(172, 1);
  expect(labelBox!.height).toBeCloseTo(34.248497, 1);
  expect(gridBox!.x).toBeCloseTo(96, 1);
  expect(gridBox!.y - accessBox!.y).toBeCloseTo(201.248497, 1);
  expect(gridBox!.width).toBeCloseTo(1248, 1);
  expect(gridBox!.height).toBeCloseTo(420, 1);
  expect(mapBox!.x).toBeCloseTo(227.73877, 1);
  expect(mapBox!.width).toBeCloseTo(481.522461, 1);
  expect(mapBox!.height).toBeCloseTo(414, 1);
  expect(detailsBox!.x).toBeCloseTo(733.26123, 1);
  expect(detailsBox!.width).toBeCloseTo(479, 1);
  expect(detailsBox!.height).toBeCloseTo(420, 1);
});

test("the 393px footer follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const footer = page.getByRole("contentinfo");
  const brush = footer.locator(".gusto-footer-brush");
  const content = footer.locator(".gusto-footer-content");
  const upper = footer.locator(".gusto-footer-upper");
  const upperInner = footer.locator(".gusto-footer-upper-inner");
  const logo = footer.locator(".gusto-footer-logo");
  const nav = footer.locator(".gusto-footer-nav");
  const social = footer.locator(".gusto-footer-social");
  const socialIcons = social.locator("a");
  const lower = footer.locator(".gusto-footer-lower");
  const lowerInner = footer.locator(".gusto-footer-lower-inner");
  const phone = footer.locator(".gusto-footer-phone");
  const hours = footer.locator(".gusto-footer-hours");
  const copyright = footer.locator(".gusto-footer-copyright");

  const footerBox = await footer.boundingBox();
  const brushBox = await brush.boundingBox();
  const contentBox = await content.boundingBox();
  const upperBox = await upper.boundingBox();
  const upperInnerBox = await upperInner.boundingBox();
  const logoBox = await logo.boundingBox();
  const navBox = await nav.boundingBox();
  const socialBox = await social.boundingBox();
  const lowerBox = await lower.boundingBox();
  const lowerInnerBox = await lowerInner.boundingBox();
  const phoneBox = await phone.boundingBox();
  const hoursBox = await hours.boundingBox();
  const copyrightBox = await copyright.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(upperBox).not.toBeNull();
  expect(upperInnerBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(navBox).not.toBeNull();
  expect(socialBox).not.toBeNull();
  expect(lowerBox).not.toBeNull();
  expect(lowerInnerBox).not.toBeNull();
  expect(phoneBox).not.toBeNull();
  expect(hoursBox).not.toBeNull();
  expect(copyrightBox).not.toBeNull();
  expect(footerBox!.height).toBeCloseTo(462.284515, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(Math.abs(brushBox!.y - footerBox!.y)).toBeLessThan(0.1);
  expect(brushBox!.width).toBeCloseTo(393, 1);
  expect(brushBox!.height).toBeCloseTo(7.284471, 1);
  expect(contentBox!.y - footerBox!.y).toBeCloseTo(7.284471, 1);
  expect(contentBox!.height).toBeCloseTo(455, 1);
  expect(upperBox!.height).toBeCloseTo(346, 1);
  expect(upperInnerBox!.x).toBeCloseTo(0, 1);
  expect(upperInnerBox!.y - footerBox!.y).toBeCloseTo(39.284471, 1);
  expect(upperInnerBox!.width).toBeCloseTo(393, 1);
  expect(upperInnerBox!.height).toBeCloseTo(282, 1);
  expect(logoBox!.x).toBeCloseTo(92.681099, 1);
  expect(logoBox!.y - footerBox!.y).toBeCloseTo(39.284471, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
  expect(navBox!.x).toBeCloseTo(134.5, 1);
  expect(navBox!.y - footerBox!.y).toBeCloseTo(153.284471, 1);
  expect(navBox!.width).toBeCloseTo(124, 1);
  expect(navBox!.height).toBeCloseTo(112, 1);
  expect(socialBox!.x).toBeCloseTo(96.5, 1);
  expect(socialBox!.y - footerBox!.y).toBeCloseTo(289.284471, 1);
  expect(socialBox!.width).toBeCloseTo(200, 1);
  expect(socialBox!.height).toBeCloseTo(32, 1);
  for (let index = 0; index < 3; index += 1) {
    const iconBox = await socialIcons.nth(index).boundingBox();
    expect(iconBox).not.toBeNull();
    expect(iconBox!.width).toBeCloseTo(32, 1);
    expect(iconBox!.height).toBeCloseTo(32, 1);
  }
  expect(lowerBox!.y - footerBox!.y).toBeCloseTo(353.284471, 1);
  expect(lowerBox!.height).toBeCloseTo(109, 1);
  expect(lowerInnerBox!.x).toBeCloseTo(0, 1);
  expect(lowerInnerBox!.y - footerBox!.y).toBeCloseTo(369.284471, 1);
  expect(lowerInnerBox!.width).toBeCloseTo(393, 1);
  expect(lowerInnerBox!.height).toBeCloseTo(77, 1);
  expect(phoneBox!.x).toBeCloseTo(137, 1);
  expect(phoneBox!.y - footerBox!.y).toBeCloseTo(369.284471, 1);
  expect(phoneBox!.width).toBeCloseTo(119, 1);
  expect(phoneBox!.height).toBeCloseTo(16, 1);
  expect(hoursBox!.x).toBeCloseTo(60.5, 1);
  expect(hoursBox!.y - footerBox!.y).toBeCloseTo(393.284471, 1);
  expect(hoursBox!.width).toBeCloseTo(272, 1);
  expect(hoursBox!.height).toBeCloseTo(31, 1);
  expect(copyrightBox!.x).toBeCloseTo(87.5, 1);
  expect(copyrightBox!.y - footerBox!.y).toBeCloseTo(432.284471, 1);
  expect(copyrightBox!.width).toBeCloseTo(218, 1);
  expect(copyrightBox!.height).toBeCloseTo(14, 1);
  await expect(nav.locator("a").first()).toHaveCSS("font-size", "20px");
  await expect(phone).toHaveCSS("font-size", "16px");
  await expect(hours).toHaveCSS("font-size", "16px");
  await expect(copyright).toHaveCSS("font-size", "12px");
});

test("the 768px footer follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const footer = page.getByRole("contentinfo");
  const brush = footer.locator(".gusto-footer-brush");
  const upper = footer.locator(".gusto-footer-upper");
  const upperInner = footer.locator(".gusto-footer-upper-inner");
  const logo = footer.locator(".gusto-footer-logo");
  const nav = footer.locator(".gusto-footer-nav");
  const social = footer.locator(".gusto-footer-social");
  const lower = footer.locator(".gusto-footer-lower");
  const lowerInner = footer.locator(".gusto-footer-lower-inner");
  const phone = footer.locator(".gusto-footer-phone");
  const hours = footer.locator(".gusto-footer-hours");
  const copyright = footer.locator(".gusto-footer-copyright");

  const footerBox = await footer.boundingBox();
  const brushBox = await brush.boundingBox();
  const upperBox = await upper.boundingBox();
  const upperInnerBox = await upperInner.boundingBox();
  const logoBox = await logo.boundingBox();
  const navBox = await nav.boundingBox();
  const socialBox = await social.boundingBox();
  const lowerBox = await lower.boundingBox();
  const lowerInnerBox = await lowerInner.boundingBox();
  const phoneBox = await phone.boundingBox();
  const hoursBox = await hours.boundingBox();
  const copyrightBox = await copyright.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(upperBox).not.toBeNull();
  expect(upperInnerBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(navBox).not.toBeNull();
  expect(socialBox).not.toBeNull();
  expect(lowerBox).not.toBeNull();
  expect(lowerInnerBox).not.toBeNull();
  expect(phoneBox).not.toBeNull();
  expect(hoursBox).not.toBeNull();
  expect(copyrightBox).not.toBeNull();
  expect(footerBox!.height).toBeCloseTo(420.235382, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - footerBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(768, 1);
  expect(brushBox!.height).toBeCloseTo(14.235302, 1);
  expect(upperBox!.height).toBeCloseTo(300.235302, 1);
  expect(upperInnerBox!.x).toBeCloseTo(0, 1);
  expect(upperInnerBox!.y - footerBox!.y).toBeCloseTo(46.235302, 1);
  expect(upperInnerBox!.width).toBeCloseTo(768, 1);
  expect(upperInnerBox!.height).toBeCloseTo(222, 1);
  expect(logoBox!.x).toBeCloseTo(280.181099, 1);
  expect(logoBox!.y - footerBox!.y).toBeCloseTo(46.235302, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
  expect(navBox!.x).toBeCloseTo(158.5, 1);
  expect(navBox!.y - footerBox!.y).toBeCloseTo(168.235302, 1);
  expect(navBox!.width).toBeCloseTo(451, 1);
  expect(navBox!.height).toBeCloseTo(20, 1);
  expect(socialBox!.x).toBeCloseTo(260, 1);
  expect(socialBox!.y - footerBox!.y).toBeCloseTo(220.235302, 1);
  expect(socialBox!.width).toBeCloseTo(248, 1);
  expect(socialBox!.height).toBeCloseTo(48, 1);
  expect(lowerBox!.y - footerBox!.y).toBeCloseTo(300.235302, 1);
  expect(lowerBox!.height).toBeCloseTo(120, 1);
  expect(lowerInnerBox!.x).toBeCloseTo(0, 1);
  expect(lowerInnerBox!.y - footerBox!.y).toBeCloseTo(316.235302, 1);
  expect(lowerInnerBox!.width).toBeCloseTo(768, 1);
  expect(lowerInnerBox!.height).toBeCloseTo(88, 1);
  expect(phoneBox!.x).toBeCloseTo(314.5, 1);
  expect(phoneBox!.y - footerBox!.y).toBeCloseTo(316.235302, 1);
  expect(phoneBox!.width).toBeCloseTo(139, 1);
  expect(phoneBox!.height).toBeCloseTo(24, 1);
  expect(hoursBox!.x).toBeCloseTo(142, 1);
  expect(hoursBox!.y - footerBox!.y).toBeCloseTo(348.235302, 1);
  expect(hoursBox!.width).toBeCloseTo(484, 1);
  expect(hoursBox!.height).toBeCloseTo(24, 1);
  expect(copyrightBox!.x).toBeCloseTo(275, 1);
  expect(copyrightBox!.y - footerBox!.y).toBeCloseTo(380.235302, 1);
  expect(copyrightBox!.width).toBeCloseTo(218, 1);
  expect(copyrightBox!.height).toBeCloseTo(14, 1);
});

test("the 1440px footer follows the current project layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 700 });
  await page.goto("/ja");

  const footer = page.getByRole("contentinfo");
  const brush = footer.locator(".gusto-footer-brush");
  const upper = footer.locator(".gusto-footer-upper");
  const upperInner = footer.locator(".gusto-footer-upper-inner");
  const logo = footer.locator(".gusto-footer-logo");
  const nav = footer.locator(".gusto-footer-nav");
  const social = footer.locator(".gusto-footer-social");
  const lower = footer.locator(".gusto-footer-lower");
  const lowerInner = footer.locator(".gusto-footer-lower-inner");
  const phone = footer.locator(".gusto-footer-phone");
  const hours = footer.locator(".gusto-footer-hours");

  const footerBox = await footer.boundingBox();
  const brushBox = await brush.boundingBox();
  const upperBox = await upper.boundingBox();
  const upperInnerBox = await upperInner.boundingBox();
  const logoBox = await logo.boundingBox();
  const navBox = await nav.boundingBox();
  const socialBox = await social.boundingBox();
  const lowerBox = await lower.boundingBox();
  const lowerInnerBox = await lowerInner.boundingBox();
  const phoneBox = await phone.boundingBox();
  const hoursBox = await hours.boundingBox();

  expect(footerBox).not.toBeNull();
  expect(brushBox).not.toBeNull();
  expect(upperBox).not.toBeNull();
  expect(upperInnerBox).not.toBeNull();
  expect(logoBox).not.toBeNull();
  expect(navBox).not.toBeNull();
  expect(socialBox).not.toBeNull();
  expect(lowerBox).not.toBeNull();
  expect(lowerInnerBox).not.toBeNull();
  expect(phoneBox).not.toBeNull();
  expect(hoursBox).not.toBeNull();
  expect(footerBox!.height).toBeCloseTo(287.691315, 1);
  expect(brushBox!.x).toBeCloseTo(0, 1);
  expect(brushBox!.y - footerBox!.y).toBeCloseTo(0, 1);
  expect(brushBox!.width).toBeCloseTo(1440, 1);
  expect(brushBox!.height).toBeCloseTo(26.691189, 1);
  expect(upperBox!.height).toBeCloseTo(223.691189, 1);
  expect(upperInnerBox!.x).toBeCloseTo(96, 1);
  expect(upperInnerBox!.y - footerBox!.y).toBeCloseTo(58.691189, 1);
  expect(upperInnerBox!.width).toBeCloseTo(1248, 1);
  expect(logoBox!.x).toBeCloseTo(96, 1);
  expect(logoBox!.width).toBeCloseTo(230.708664, 1);
  expect(navBox!.x).toBeCloseTo(471.854309, 1);
  expect(navBox!.width).toBeCloseTo(479, 1);
  expect(socialBox!.x).toBeCloseTo(1096, 1);
  expect(socialBox!.width).toBeCloseTo(248, 1);
  expect(lowerBox!.y - footerBox!.y).toBeCloseTo(223.691189, 1);
  expect(lowerBox!.height).toBeCloseTo(64, 1);
  expect(lowerInnerBox!.x).toBeCloseTo(96, 1);
  expect(lowerInnerBox!.width).toBeCloseTo(1248, 1);
  expect(phoneBox!.width).toBeCloseTo(196, 1);
  expect(hoursBox!.x).toBeCloseTo(375.5, 1);
  expect(hoursBox!.width).toBeCloseTo(667, 1);
});

test("the About page hero inherits the home About layout", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop browser geometry check");

  const frames = [393, 768, 1440, 1920] as const;

  for (const width of frames) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/ja");

    const homeLayout = await page.locator("#about").evaluate((section) => {
      const title = section.querySelector<HTMLElement>(".gusto-about-title h2")!;
      const body = section.querySelector<HTMLElement>(".gusto-about-body")!;
      const decoration = section.querySelector<HTMLElement>(".gusto-about-left img")!;
      const interiorImage = section.querySelector<HTMLElement>(".gusto-about-right img")!;
      const sectionStyles = getComputedStyle(section);
      const titleStyles = getComputedStyle(title);
      const bodyStyles = getComputedStyle(body);
      const bodyBox = body.getBoundingClientRect();
      const decorationBox = decoration.getBoundingClientRect();
      const interiorImageBox = interiorImage.getBoundingClientRect();

      return {
        section: [sectionStyles.display, sectionStyles.flexDirection, sectionStyles.gap, sectionStyles.padding],
        title: [titleStyles.fontFamily, titleStyles.fontSize, titleStyles.lineHeight, titleStyles.letterSpacing],
        body: [bodyStyles.fontFamily, bodyStyles.fontSize, bodyStyles.lineHeight, bodyStyles.gap, bodyStyles.overflow, bodyBox.width, bodyBox.height],
        decorationWidth: decorationBox.width,
        interiorImage: [interiorImageBox.width, interiorImageBox.height],
      };
    });

    await page.goto("/ja/about");

    const hero = page.locator(".gusto-about-page-hero");
    const story = page.locator(".gusto-about-page-story");
    const interior = page.locator(".gusto-about-page-interior");
    const barrel = page.locator(".gusto-about-page-barrel");
    const pageLayout = await hero.evaluate((section) => {
      const title = section.querySelector<HTMLElement>(".gusto-about-title h1")!;
      const body = section.querySelector<HTMLElement>(".gusto-about-body")!;
      const decoration = section.querySelector<HTMLElement>(".gusto-about-page-barrel")!;
      const interiorImage = section.querySelector<HTMLElement>(".gusto-about-right img")!;
      const sectionStyles = getComputedStyle(section);
      const titleStyles = getComputedStyle(title);
      const bodyStyles = getComputedStyle(body);
      const bodyBox = body.getBoundingClientRect();
      const decorationBox = decoration.getBoundingClientRect();
      const interiorImageBox = interiorImage.getBoundingClientRect();

      return {
        section: [sectionStyles.display, sectionStyles.flexDirection, sectionStyles.gap, sectionStyles.padding],
        title: [titleStyles.fontFamily, titleStyles.fontSize, titleStyles.lineHeight, titleStyles.letterSpacing],
        body: [bodyStyles.fontFamily, bodyStyles.fontSize, bodyStyles.lineHeight, bodyStyles.gap, bodyStyles.overflow, bodyBox.width, bodyBox.height],
        decorationWidth: decorationBox.width,
        interiorImage: [interiorImageBox.width, interiorImageBox.height],
      };
    });

    expect(pageLayout).toEqual(homeLayout);

    const [storyBox, interiorBox] = await Promise.all([
      story.boundingBox(),
      interior.boundingBox(),
    ]);

    if (width >= 1200) {
      expect(interiorBox!.x - (storyBox!.x + storyBox!.width)).toBeCloseTo(32, 1);
    } else {
      expect(interiorBox!.x).toBeCloseTo(storyBox!.x, 1);
      expect(interiorBox!.y - (storyBox!.y + storyBox!.height)).toBeCloseTo(32, 1);
    }

    await expect(barrel).toBeVisible();
    await expect(story.getByText("営業時間")).toBeVisible();
    await expect(story.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059");
    await expect(hero.locator(".gusto-about-more")).toHaveCount(0);
    await expect(hero).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
});

test("the About page is localized and linked from shared navigation", async ({ page }) => {
  await page.goto("/ja/about");
  await expect(page).toHaveTitle(/グストとは/);
  await expect(page.getByRole("heading", { level: 1, name: "グストとは" })).toBeVisible();
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Our Story" })).toHaveAttribute("href", "/ja/about");

  await page.goto("/en/about");
  await expect(page.getByRole("heading", { level: 1, name: "About Gusto" })).toBeVisible();
});

test("Japanese and English pages use their matching dictionaries", async ({ page }) => { await page.goto("/ja"); await expect(page.getByRole("heading", { level: 1, name: "だれでも気軽に ワインと料理を 楽しめるバル" })).toBeVisible(); await page.goto("/en"); await expect(page.getByRole("heading", { level: 1, name: "Make tonight more delicious." })).toBeVisible(); });
test("reservation section exposes localized guidance and its call to action", async ({ page }) => { await page.goto("/ja"); const reservation = page.locator("#reservation"); await expect(reservation.getByRole("heading", { level: 2, name: "Reservation" })).toBeVisible(); await expect(reservation.getByRole("listitem")).toHaveCount(4); await expect(reservation.getByText("ご予約・お問い合わせページに進む")).toBeVisible(); await page.goto("/en"); await expect(page.locator("#reservation").getByText("Reservations and inquiries", { exact: true })).toBeVisible(); });
test("access section includes the map and complete localized travel details", async ({ page }) => {
  await page.goto("/ja");
  const access = page.locator("#access");
  await expect(access.getByRole("heading", { level: 2, name: "Access" })).toBeVisible();
  await expect(access.getByTitle("グスト周辺の地図")).toBeVisible();
  await expect(access.getByRole("link", { name: "Googleマップを新しいタブで開きます" })).toHaveAttribute("target", "_blank");
  await expect(access.getByText("〒536-0007 大阪府大阪市城東区成育5丁目23-17 関目レジャービル1階")).toBeVisible();
  await expect(access.getByText("大阪メトロ谷町線 関目高殿駅 3番出口 徒歩1分")).toBeVisible();
  await expect(access.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059");

  await page.goto("/en");
  await expect(
    page.locator("#access").getByText("1F Sekime Leisure Building, 5-23-17 Seiiku, Joto-ku, Osaka 536-0007, Japan"),
  ).toBeVisible();
});
test("footer exposes navigation, social links, contact hours, and copyright", async ({ page }) => { await page.goto("/ja"); const footer = page.getByRole("contentinfo"); await expect(footer.getByRole("link", { name: "Gusto Italian Bar" })).toHaveAttribute("href", "/ja"); await expect(footer.getByRole("navigation", { name: "フッターナビゲーション" }).getByRole("link")).toHaveCount(4); await expect(footer.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); await expect(footer.getByRole("link", { name: "Twitterを新しいタブで開きます" })).toHaveAttribute("target", "_blank"); await expect(footer.getByText("Lunch: 12:00～15:00")).toBeVisible(); await expect(footer.getByText("© 2023 Masa Kondo. All Rights Reserved.")).toBeVisible(); });
test("configured reservation links stay clickable after hydration", async ({ page }, testInfo) => {

  for (const path of ["/ja", "/ja/menu", "/ja/about", "/en"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("#reservation .gusto-booking-button")).toHaveAttribute("href", reservationUrl);
  }

  await page.goto("/ja");
  await page.waitForLoadState("networkidle");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "メニュー" }).click();
    await expect(page.locator("#mobile-nav").getByRole("link", { name: "予約する" })).toHaveAttribute("href", reservationUrl);
    await page.getByRole("button", { name: "メニューを閉じる" }).click();
  }
  await page.route(reservationUrl, (route) => route.fulfill({ body: 'Booking service' }));
  await page.locator('#reservation .gusto-booking-button').click();
  await expect(page).toHaveURL(reservationUrl);
});

test("mobile navigation opens and links to the localized menu", async ({ page }, testInfo) => { test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction"); await page.goto("/ja"); await page.getByRole("button", { name: "メニュー" }).click(); await expect(page.locator("#mobile-nav").getByRole("link", { name: "メニュー" })).toHaveAttribute("href", "/ja/menu"); });

test("the localized scroll-to-top button is shared by every page", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop interaction check");

  for (const path of ["/ja", "/ja/menu", "/ja/about"]) {
    await page.goto(path);

    const scrollToTop = page.locator(".gusto-scroll-to-top");
    await expect(scrollToTop).toHaveCount(1);
    await expect(scrollToTop).toHaveAttribute("type", "button");
    await expect(scrollToTop).toHaveAttribute(
      "aria-label",
      "ページ上部へ戻る",
    );
    await expect(scrollToTop).toBeHidden();
  }

  await page.goto("/ja/menu");
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300);
  const scrollToTop = page.getByRole("button", { name: "ページ上部へ戻る" });
  await expect(scrollToTop).toBeVisible();
  await scrollToTop.focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(scrollToTop).toBeHidden();

  await page.goto("/en/menu");
  await expect(page.locator(".gusto-scroll-to-top")).toHaveAttribute(
    "aria-label",
    "Back to the top",
  );
});

test("the scroll-to-top control is outside the mobile navigation dialog", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only structure check");
  await page.goto("/ja");
  await page.getByRole("button", { name: "メニュー" }).click();

  const mobileNav = page.locator("#mobile-nav");
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.locator(".gusto-scroll-to-top")).toHaveCount(0);
});
