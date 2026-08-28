import { expect, test } from "@playwright/test";

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

test("the appetizer cards follow the supplied responsive Pixso geometry", async ({ page }, testInfo) => {
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
  await expect(page.locator("body")).toHaveCSS("background-image", /cotton01\.jpg/);
  await expect(logo).toBeVisible();
  await expect(menu).toBeVisible();

  const logoBox = await logo.boundingBox();

  expect(logoBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(14, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
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
  const titleBox = await title.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(14, 1);
  expect(logoBox!.width).toBeCloseTo(207.637802, 1);
  expect(logoBox!.height).toBeCloseTo(90, 1);
  expect(menuBox!.x).toBeCloseTo(720, 1);
  expect(menuBox!.y).toBeCloseTo(44, 1);
  expect(menuBox!.width).toBeCloseTo(32, 1);
  expect(menuBox!.height).toBeCloseTo(32, 1);
  expect(titleBox!.x).toBeCloseTo(24, 1);
  expect(titleBox!.y).toBeCloseTo(120, 1);
  expect(titleBox!.width).toBeCloseTo(261, 1);
  expect(titleBox!.height).toBeCloseTo(60, 1);
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
  expect(logoBox!.y).toBeCloseTo(12, 1);
  expect(logoBox!.width).toBeCloseTo(138.425201, 1);
  expect(logoBox!.height).toBeCloseTo(60, 1);
  expect(menuBox!.x).toBeCloseTo(353, 1);
  expect(menuBox!.y).toBeCloseTo(26, 1);
  expect(menuBox!.width).toBeCloseTo(32, 1);
  expect(menuBox!.height).toBeCloseTo(32, 1);
  expect(lineBoxes).toHaveLength(3);
  expect(lineBoxes.map(({ x }) => x)).toEqual([358, 358, 358]);
  expect(lineBoxes.map(({ y }) => y)).toEqual([34, 42, 50]);
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
  await expect(page.locator(".gusto-menu__category-nav a").first()).toHaveCSS("font-size", "24px");
  await expect(page.locator(".gusto-menu__marquee")).toBeHidden();
  await expect(page.locator(".gusto-menu__line-art")).toBeHidden();

  const logoBox = await logo.boundingBox();
  const menuBox = await menu.boundingBox();
  const titleBox = await title.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(16, 1);
  expect(logoBox!.y).toBeCloseTo(12, 1);
  expect(logoBox!.width).toBeCloseTo(138.425201, 1);
  expect(logoBox!.height).toBeCloseTo(60, 1);
  expect(menuBox!.x).toBeCloseTo(353, 1);
  expect(menuBox!.y).toBeCloseTo(26, 1);
  expect(menuBox!.width).toBeCloseTo(32, 1);
  expect(menuBox!.height).toBeCloseTo(32, 1);
  expect(titleBox!.x).toBeCloseTo(16, 1);
  expect(titleBox!.y).toBeCloseTo(84, 1);
  expect(titleBox!.width).toBeCloseTo(203, 1);
  expect(titleBox!.height).toBeCloseTo(40, 1);
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

test("the 393px hamburger menu matches the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 820 });
  await page.goto("/ja");
  await page.getByRole("button", { name: "メニュー" }).click();

  const menu = page.getByRole("dialog", { name: "メニュー" });
  const menuHeader = menu.locator(".site-header-mobile-header");
  const logo = menu.getByRole("link", { name: "Gusto Italian Bar" });
  const close = menu.getByRole("button", { name: "メニューを閉じる" });
  const closeLines = close.locator("i");
  const links = menu.locator(".site-header-mobile-link-list a");
  const reserve = menu.getByText("Reserve", { exact: true });

  await expect(menu).toHaveCSS("background-color", "rgb(27, 40, 27)");
  await expect(menu).toHaveCSS("color", "rgb(246, 230, 224)");
  await expect(menu).toHaveCSS("transform", "none");
  await expect(closeLines).toHaveCount(3);
  await expect(links).toHaveText(["Home", "Menu", "Access", "Our Story"]);

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
  const closeLineBoxes = await closeLines.evaluateAll((lines) =>
    lines.map((line) => {
      const { x, y, width, height } = line.getBoundingClientRect();
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
  expect(closeBox!.x).toBeCloseTo(353, 1);
  expect(closeBox!.y).toBeCloseTo(26, 1);
  expect(closeBox!.width).toBeCloseTo(32, 1);
  expect(closeBox!.height).toBeCloseTo(32, 1);
  expect(closeLineBoxes.map(({ x }) => x)).toEqual([358, 358, 358]);
  expect(closeLineBoxes.map(({ y }) => y)).toEqual([34, 42, 50]);
  expect(closeLineBoxes.map(({ width }) => width)).toEqual([22, 22, 22]);
  expect(closeLineBoxes.map(({ height }) => height)).toEqual([3, 3, 3]);
  expect(linkBoxes.map(({ y }) => y)).toEqual([184, 257, 330, 403]);
  expect(linkBoxes.map(({ height }) => height)).toEqual([45, 45, 45, 45]);
  expect(reserveBox!.x).toBeCloseTo(16.5, 1);
  expect(reserveBox!.y).toBeCloseTo(512, 1);
  expect(reserveBox!.width).toBeCloseTo(360, 1);
  expect(reserveBox!.height).toBeCloseTo(54, 1);
  await expect(close).toBeFocused();
});

test("the mobile menu is available below the 992px breakpoint", async ({ page }, testInfo) => {
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
  await expect(menu.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Menu" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Our Story" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Access" })).toBeVisible();
  await expect(menu.getByText("Reserve", { exact: true })).toBeVisible();
  const mobileLogo = menu.getByRole("link", { name: "Gusto Italian Bar" });
  const close = menu.getByRole("button", { name: "メニューを閉じる" });
  const home = menu.getByRole("link", { name: "Home" });
  const reserve = menu.getByText("Reserve", { exact: true });
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
  expect(closeBox!.x).toBeCloseTo(719, 1);
  expect(closeBox!.y).toBeCloseTo(44, 1);
  expect(homeBox!.y).toBeCloseTo(220, 1);
  expect(reserveBox!.x).toBeCloseTo(203.5, 1);
  expect(reserveBox!.y).toBeCloseTo(628, 1);
  expect(reserveBox!.width).toBeCloseTo(360, 1);
  expect(reserveBox!.height).toBeCloseTo(54, 1);
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
  await page.setViewportSize({ width: 992, height: 900 });
  await expect(page.getByRole("dialog", { name: "メニュー" })).toBeHidden();
  await expect(trigger).toBeHidden();
});

test("the 768px hero follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 393px hero follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 768px About section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 768px Wine section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the first 393px recommendation follows the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-1");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3 });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "パスタメニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.width).toBeCloseTo(393, 1);
  expect(recommendationBox!.height).toBeCloseTo(843.472534, 1);
  expect(copyBox!.x).toBeCloseTo(16, 1);
  expect(copyBox!.y - recommendationBox!.y).toBeCloseTo(24, 1);
  expect(copyBox!.width).toBeCloseTo(361, 1);
  expect(copyBox!.height).toBeCloseTo(412.000031, 1);
  expect(headingBox!.x).toBeCloseTo(16, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(24, 1);
  expect(headingBox!.width).toBeCloseTo(200, 1);
  expect(headingBox!.height).toBeCloseTo(40.000027, 1);
  expect(headingTextBox!.height).toBeCloseTo(32, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("200px");
  expect(contentBox!.x).toBeCloseTo(16, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(88.000027, 1);
  expect(contentBox!.width).toBeCloseTo(361, 1);
  expect(contentBox!.height).toBeCloseTo(348, 1);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(descriptionBox!.y - recommendationBox!.y).toBeCloseTo(152.000027, 1);
  expect(descriptionBox!.width).toBeCloseTo(361, 1);
  expect(descriptionBox!.height).toBeCloseTo(192, 1);
  expect(moreBox!.x).toBeCloseTo(16, 1);
  expect(moreBox!.y - recommendationBox!.y).toBeCloseTo(376.000027, 1);
  expect(moreBox!.width).toBeCloseTo(361, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(imageBox!.x).toBeCloseTo(16, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(460.000031, 1);
  expect(imageBox!.width).toBeCloseTo(361, 1);
  expect(imageBox!.height).toBeCloseTo(359.472534, 1);
  await expect(headingText).toHaveCSS("font-size", "32px");
  await expect(title).toHaveCSS("font-size", "32px");
  await expect(description).toHaveCSS("font-size", "18px");
  await expect(description).toHaveCSS("line-height", "24px");
  await expect(more).toHaveCSS("font-size", "18px");
  await expect(more).toHaveCSS("text-decoration-line", "none");
});

test("the second 393px recommendation follows the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-2");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3 });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "ピザメニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-2-deco");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.width).toBeCloseTo(393, 1);
  expect(recommendationBox!.height).toBeCloseTo(880.692139, 1);
  expect(copyBox!.x).toBeCloseTo(16, 1);
  expect(copyBox!.width).toBeCloseTo(361, 1);
  expect(copyBox!.height).toBeLessThan(412);
  expect(copyBox!.height).toBeGreaterThan(0);
  expect(headingBox!.x).toBeCloseTo(16, 1);
  expect(headingBox!.y).toBeCloseTo(copyBox!.y, 1);
  expect(headingBox!.width).toBeCloseTo(200, 1);
  expect(headingBox!.height).toBeCloseTo(40, 1);
  expect(headingTextBox!.height).toBeCloseTo(32, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("200px");
  expect(contentBox!.x).toBeCloseTo(16, 1);
  expect(contentBox!.y - headingBox!.y - headingBox!.height).toBeCloseTo(24, 1);
  expect(contentBox!.width).toBeCloseTo(361, 1);
  expect(contentBox!.height).toBeLessThan(348);
  expect(contentBox!.height).toBeGreaterThan(0);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(descriptionBox!.y - contentBox!.y).toBeCloseTo(64, 1);
  expect(descriptionBox!.width).toBeCloseTo(361, 1);
  expect(descriptionBox!.height).toBeLessThan(192);
  expect(descriptionBox!.height).toBeGreaterThan(0);
  expect(moreBox!.x).toBeCloseTo(16, 1);
  expect(moreBox!.y - descriptionBox!.y - descriptionBox!.height).toBeCloseTo(32, 1);
  expect(moreBox!.width).toBeCloseTo(361, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(contentBox!.y + contentBox!.height).toBeCloseTo(moreBox!.y + moreBox!.height, 1);
  expect(imageBox!.x).toBeCloseTo(16, 1);
  expect(imageBox!.y - copyBox!.y - copyBox!.height).toBeCloseTo(24, 1);
  expect(imageBox!.width).toBeCloseTo(361, 1);
  expect(imageBox!.height).toBeCloseTo(396.692108, 1);
  await expect(decoration).toBeHidden();
  await expect(headingText).toHaveCSS("font-size", "32px");
  await expect(title).toHaveCSS("font-size", "32px");
  await expect(description).toHaveCSS("font-size", "18px");
  await expect(description).toHaveCSS("line-height", "24px");
  await expect(more).toHaveCSS("font-size", "18px");
  await expect(more).toHaveCSS("text-decoration-line", "none");
});

test("the third 393px recommendation follows the supplied Pixso frame with natural content heights", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only geometry check");
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-3");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3 });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "各メニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-3-deco");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.width).toBeCloseTo(393, 1);
  expect(recommendationBox!.height).toBeCloseTo(916.735596, 1);
  expect(copyBox!.x).toBeCloseTo(16, 1);
  expect(copyBox!.width).toBeCloseTo(361, 1);
  expect(copyBox!.height).toBeGreaterThan(0);
  expect(copyBox!.height).toBeLessThan(380);
  expect(headingBox!.x).toBeCloseTo(16, 1);
  expect(headingBox!.y).toBeCloseTo(copyBox!.y, 1);
  expect(headingBox!.width).toBeCloseTo(200, 1);
  expect(headingBox!.height).toBeCloseTo(32, 1);
  expect(headingTextBox!.height).toBeCloseTo(32, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("200px");
  expect(contentBox!.x).toBeCloseTo(16, 1);
  expect(contentBox!.y - headingBox!.y - headingBox!.height).toBeCloseTo(24, 1);
  expect(contentBox!.width).toBeCloseTo(361, 1);
  expect(contentBox!.height).toBeGreaterThan(0);
  expect(contentBox!.height).toBeLessThan(324);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(descriptionBox!.y - contentBox!.y).toBeCloseTo(64, 1);
  expect(descriptionBox!.width).toBeCloseTo(361, 1);
  expect(descriptionBox!.height).toBeGreaterThan(0);
  expect(descriptionBox!.height).toBeLessThan(168);
  expect(moreBox!.x).toBeCloseTo(16, 1);
  expect(moreBox!.y - descriptionBox!.y - descriptionBox!.height).toBeCloseTo(32, 1);
  expect(moreBox!.width).toBeCloseTo(361, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(contentBox!.y + contentBox!.height).toBeCloseTo(moreBox!.y + moreBox!.height, 1);
  expect(copyBox!.y + copyBox!.height).toBeCloseTo(contentBox!.y + contentBox!.height, 1);
  expect(imageBox!.x).toBeCloseTo(16, 1);
  expect(imageBox!.y - copyBox!.y - copyBox!.height).toBeCloseTo(24, 1);
  expect(imageBox!.width).toBeCloseTo(361, 1);
  expect(imageBox!.height).toBeCloseTo(464.735626, 1);
  await expect(decoration).toBeHidden();
  await expect(headingText).toHaveCSS("font-size", "32px");
  await expect(title).toHaveCSS("font-size", "32px");
  await expect(description).toHaveCSS("font-size", "18px");
  await expect(description).toHaveCSS("line-height", "24px");
  await expect(more).toHaveCSS("font-size", "18px");
  await expect(more).toHaveCSS("text-decoration-line", "none");
});

test("the first 768px recommendation follows the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-1");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3, name: "グストのパスタ" });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "パスタメニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.y).toBeCloseTo(3300.551392, 1);
  expect(recommendationBox!.width).toBeCloseTo(768, 1);
  expect(recommendationBox!.height).toBeCloseTo(994.930908, 1);
  expect(copyBox!.x).toBeCloseTo(86, 1);
  expect(copyBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(copyBox!.width).toBeCloseTo(596, 1);
  expect(copyBox!.height).toBeCloseTo(356.000031, 1);
  expect(headingBox!.x).toBeCloseTo(86, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(headingBox!.width).toBeCloseTo(300, 1);
  expect(headingBox!.height).toBeCloseTo(56.000034, 1);
  expect(headingTextBox!.height).toBeCloseTo(48, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("300px");
  expect(contentBox!.x).toBeCloseTo(86, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(168.000031, 1);
  expect(contentBox!.width).toBeCloseTo(596, 1);
  expect(contentBox!.height).toBeCloseTo(252, 1);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(descriptionBox!.y - recommendationBox!.y).toBeCloseTo(232.000031, 1);
  expect(descriptionBox!.height).toBeCloseTo(96, 1);
  expect(moreBox!.x).toBeCloseTo(86, 1);
  expect(moreBox!.y - recommendationBox!.y).toBeCloseTo(360.000031, 1);
  expect(moreBox!.width).toBeCloseTo(323.396759, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(imageBox!.x).toBeCloseTo(139.5, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(444.000031, 1);
  expect(imageBox!.width).toBeCloseTo(489, 1);
  expect(imageBox!.height).toBeCloseTo(486.930878, 1);
  await expect(headingText).toHaveCSS("font-size", "60px");
  await expect(title).toHaveCSS("font-size", "42px");
  await expect(description).toHaveCSS("font-size", "22px");
  await expect(more).toHaveCSS("font-size", "22px");
});

test("the second 768px recommendation follows the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-2");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3, name: "ピザ・マルゲリータ" });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "ピザメニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-2-deco");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.y).toBeCloseTo(4295.4823, 1);
  expect(recommendationBox!.width).toBeCloseTo(768, 1);
  expect(recommendationBox!.height).toBeCloseTo(1091.632813, 1);
  expect(copyBox!.x).toBeCloseTo(86, 1);
  expect(copyBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(copyBox!.width).toBeCloseTo(596, 1);
  expect(copyBox!.height).toBeCloseTo(380, 1);
  expect(headingBox!.x).toBeCloseTo(86, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(headingBox!.width).toBeCloseTo(300, 1);
  expect(headingBox!.height).toBeCloseTo(56, 1);
  expect(headingTextBox!.height).toBeCloseTo(48, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("300px");
  expect(contentBox!.x).toBeCloseTo(86, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(168, 1);
  expect(contentBox!.width).toBeCloseTo(596, 1);
  expect(contentBox!.height).toBeCloseTo(276, 1);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(await title.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(descriptionBox!.y - recommendationBox!.y).toBeCloseTo(232, 1);
  expect(descriptionBox!.width).toBeCloseTo(596, 1);
  expect(descriptionBox!.height).toBeCloseTo(120, 1);
  expect(moreBox!.x).toBeCloseTo(86, 1);
  expect(moreBox!.y - recommendationBox!.y).toBeCloseTo(384, 1);
  expect(moreBox!.width).toBeCloseTo(305.396759, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(imageBox!.x).toBeCloseTo(133, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(476, 1);
  expect(imageBox!.width).toBeCloseTo(502, 1);
  expect(imageBox!.height).toBeCloseTo(551.632751, 1);
  await expect(decoration).toBeHidden();
  await expect(headingText).toHaveCSS("font-size", "60px");
  await expect(title).toHaveCSS("font-size", "42px");
  await expect(description).toHaveCSS("font-size", "22px");
  await expect(more).toHaveCSS("font-size", "22px");
});

test("the third 768px recommendation follows the supplied Pixso frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-3");
  const copy = recommendation.locator(".gusto-feature-copy");
  const heading = recommendation.locator(".gusto-feature-heading");
  const headingText = heading.locator("p");
  const content = recommendation.locator(".gusto-feature-content");
  const title = content.getByRole("heading", { level: 3, name: "海老のソーセージ" });
  const description = content.locator(".gusto-feature-description");
  const more = recommendation.getByRole("link", { name: "各メニューを見る" });
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-3-deco");

  const recommendationBox = await recommendation.boundingBox();
  const copyBox = await copy.boundingBox();
  const headingBox = await heading.boundingBox();
  const headingTextBox = await headingText.boundingBox();
  const contentBox = await content.boundingBox();
  const titleBox = await title.boundingBox();
  const descriptionBox = await description.boundingBox();
  const moreBox = await more.boundingBox();
  const imageBox = await image.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingTextBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(descriptionBox).not.toBeNull();
  expect(moreBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(recommendationBox!.x).toBeCloseTo(0, 1);
  expect(recommendationBox!.y).toBeCloseTo(5387.115113, 1);
  expect(recommendationBox!.width).toBeCloseTo(768, 1);
  expect(recommendationBox!.height).toBeCloseTo(1068, 1);
  expect(copyBox!.x).toBeCloseTo(86, 1);
  expect(copyBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(copyBox!.width).toBeCloseTo(596, 1);
  expect(copyBox!.height).toBeCloseTo(356, 1);
  expect(headingBox!.x).toBeCloseTo(86, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(64, 1);
  expect(headingBox!.width).toBeCloseTo(300, 1);
  expect(headingBox!.height).toBeCloseTo(56, 1);
  expect(headingTextBox!.height).toBeCloseTo(48, 1);
  expect(await heading.evaluate((element) => getComputedStyle(element, "::after").width)).toBe("300px");
  expect(contentBox!.x).toBeCloseTo(86, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(168, 1);
  expect(contentBox!.width).toBeCloseTo(596.02063, 1);
  expect(contentBox!.height).toBeCloseTo(252, 1);
  expect(titleBox!.height).toBeCloseTo(32, 1);
  expect(descriptionBox!.y - recommendationBox!.y).toBeCloseTo(232, 1);
  expect(descriptionBox!.width).toBeCloseTo(596.02063, 1);
  expect(descriptionBox!.height).toBeCloseTo(96, 1);
  expect(moreBox!.x).toBeCloseTo(86, 1);
  expect(moreBox!.y - recommendationBox!.y).toBeCloseTo(360, 1);
  expect(moreBox!.width).toBeCloseTo(287.396759, 1);
  expect(moreBox!.height).toBeCloseTo(60, 1);
  expect(await more.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(imageBox!.x).toBeCloseTo(166.5, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(444, 1);
  expect(imageBox!.width).toBeCloseTo(435, 1);
  expect(imageBox!.height).toBeCloseTo(560, 1);
  await expect(decoration).toBeHidden();
  await expect(headingText).toHaveCSS("font-size", "60px");
  await expect(title).toHaveCSS("font-size", "42px");
  await expect(description).toHaveCSS("font-size", "22px");
  await expect(more).toHaveCSS("font-size", "22px");
});

test("the 1440px hero follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 1440px About section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the first 1440px recommendation keeps its flex content centered", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-1");
  const heading = recommendation.locator(".gusto-feature-heading");
  const content = recommendation.locator(".gusto-feature-content");
  const image = recommendation.locator(".gusto-feature-image");
  const link = recommendation.getByRole("link", { name: "パスタメニューを見る" });

  const recommendationBox = await recommendation.boundingBox();
  const headingBox = await heading.boundingBox();
  const contentBox = await content.boundingBox();
  const imageBox = await image.boundingBox();
  const linkBox = await link.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(recommendationBox!.height).toBeCloseTo(826, 1);
  expect(headingBox!.x).toBeCloseTo(48, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(109.5, 1);
  expect(headingBox!.width).toBeCloseTo(611, 1);
  expect(contentBox!.x).toBeCloseTo(48, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(245.5, 1);
  expect(imageBox!.x).toBeCloseTo(683, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(60, 1);
  expect(imageBox!.width).toBeCloseTo(709, 1);
  expect(imageBox!.height).toBeCloseTo(706, 1);
  expect(linkBox!.x).toBeCloseTo(48, 1);
  expect(linkBox!.y - recommendationBox!.y).toBeCloseTo(656.5, 1);
});

test("the second 1440px recommendation keeps its flex content centered", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-2");
  const heading = recommendation.locator(".gusto-feature-heading");
  const content = recommendation.locator(".gusto-feature-content");
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-2-deco");
  const link = recommendation.getByRole("link", { name: "ピザメニューを見る" });

  const recommendationBox = await recommendation.boundingBox();
  const headingBox = await heading.boundingBox();
  const contentBox = await content.boundingBox();
  const imageBox = await image.boundingBox();
  const decorationBox = await decoration.boundingBox();
  const linkBox = await link.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(decorationBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(recommendationBox!.height).toBeCloseTo(895.717163, 1);
  expect(imageBox!.x).toBeCloseTo(48, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(60, 1);
  expect(imageBox!.width).toBeCloseTo(705.922607, 1);
  expect(imageBox!.height).toBeCloseTo(775.717163, 1);
  expect(headingBox!.x).toBeCloseTo(777.922607, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(160.858582, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(296.858582, 1);
  expect(linkBox!.y - recommendationBox!.y).toBeCloseTo(674.858582, 1);
  expect(decorationBox!.x).toBeCloseTo(1172.750366, 1);
  expect(decorationBox!.y - recommendationBox!.y).toBeCloseTo(0, 1);
  expect(decorationBox!.width).toBeCloseTo(267.249664, 1);
});

test("the third 1440px recommendation keeps its flex content centered", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const recommendation = page.locator("#recommendation-3");
  const heading = recommendation.locator(".gusto-feature-heading");
  const content = recommendation.locator(".gusto-feature-content");
  const image = recommendation.locator(".gusto-feature-image");
  const decoration = recommendation.locator(".gusto-feature-3-deco");
  const link = recommendation.getByRole("link", { name: "各メニューを見る" });

  const recommendationBox = await recommendation.boundingBox();
  const headingBox = await heading.boundingBox();
  const contentBox = await content.boundingBox();
  const imageBox = await image.boundingBox();
  const decorationBox = await decoration.boundingBox();
  const linkBox = await link.boundingBox();

  expect(recommendationBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(decorationBox).not.toBeNull();
  expect(linkBox).not.toBeNull();
  expect(recommendationBox!.height).toBeCloseTo(905.751831, 1);
  expect(headingBox!.x).toBeCloseTo(150.819611, 1);
  expect(headingBox!.y - recommendationBox!.y).toBeCloseTo(165.875916, 1);
  expect(headingBox!.width).toBeCloseTo(500, 1);
  expect(contentBox!.x).toBeCloseTo(150.819611, 1);
  expect(contentBox!.y - recommendationBox!.y).toBeCloseTo(301.875916, 1);
  expect(imageBox!.x).toBeCloseTo(678.819611, 1);
  expect(imageBox!.y - recommendationBox!.y).toBeCloseTo(60, 1);
  expect(imageBox!.width).toBeCloseTo(610.360779, 1);
  expect(imageBox!.height).toBeCloseTo(785.751831, 1);
  expect(linkBox!.y - recommendationBox!.y).toBeCloseTo(679.875916, 1);
  expect(decorationBox!.x).toBeCloseTo(1101.374634, 1);
  expect(decorationBox!.y - recommendationBox!.y).toBeCloseTo(-126.476285, 1);
  expect(decorationBox!.width).toBeCloseTo(426.709015, 1);
  expect(decorationBox!.height).toBeCloseTo(442.898, 1);
});

test("the 393px social section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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
  const firstIcon = firstLink.locator(":scope > svg");

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

test("the 768px social section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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
  const firstIcon = firstLink.locator(":scope > svg");

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
  const firstIcon = firstLink.locator(":scope > svg");

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

test("the 393px reservation section keeps its Pixso frame with natural content heights", async ({ page }, testInfo) => {
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

test("the 768px reservation section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 1440px reservation section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 393px access section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 768px access section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 1440px access section follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 393px footer follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 768px footer follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the 1440px footer follows the supplied Pixso frame", async ({ page }, testInfo) => {
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

test("the about page follows the four supplied responsive hero frames", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop browser geometry check");

  const frames = [
    {
      width: 1920,
      headerHeight: 132,
      heroHeight: 1166,
      story: { x: 264, y: 156, width: 585, height: 609 },
      interior: { x: 849, y: 132, width: 973, height: 1066 },
      barrelWidth: 552.71,
      titleSize: "80px",
      socialY: 1298,
    },
    {
      width: 1440,
      headerHeight: 132,
      heroHeight: 926,
      story: { x: 120, y: 156, width: 612, height: 609 },
      interior: { x: 732, y: 156, width: 709, height: 776 },
      barrelWidth: 398.6,
      titleSize: "80px",
      socialY: 1058,
    },
    {
      width: 768,
      headerHeight: 120,
      heroHeight: 1254,
      story: { x: 24, y: 144, width: 720, height: 404 },
      interior: { x: 29.5, y: 572, width: 709, height: 776 },
      barrelWidth: 310.31,
      titleSize: "48px",
      socialY: 1374,
    },
    {
      width: 393,
      headerHeight: 84,
      heroHeight: 907,
      story: { x: 16, y: 108, width: 361, height: 436 },
      interior: { x: 16, y: 568, width: 361, height: 397 },
      barrelWidth: null,
      titleSize: "32px",
      socialY: 991,
    },
  ] as const;

  for (const frame of frames) {
    await page.setViewportSize({ width: frame.width, height: 1000 });
    await page.goto("/ja/about");

    const header = page.getByRole("banner");
    const hero = page.locator(".gusto-about-page-hero");
    const story = page.locator(".gusto-about-page-story");
    const title = page.getByRole("heading", { level: 1, name: "グストとは" });
    const interior = page.locator(".gusto-about-page-interior");
    const barrel = page.locator(".gusto-about-page-barrel");
    const social = page.locator(".gusto-social");
    const marquee = page.locator(".gusto-about-page-marquee");

    await expect(title).toHaveCSS("font-size", frame.titleSize);
    await expect(title).toHaveCSS("font-family", /kirigirisu/);
    await expect(page.locator(".gusto-about-page-copy")).toHaveCSS("font-family", /yamafont/);

    if (frame.width >= 1200) {
      await expect(marquee).toBeVisible();
      await expect(marquee).toHaveCSS("transform", "matrix(0, 1, -1, 0, 0, 0)");
      await expect(marquee).toHaveCSS("transform-origin", "0px 0px");
      await expect(marquee).toHaveCSS("white-space", "nowrap");
    } else {
      await expect(marquee).toBeHidden();
    }

    const [headerBox, heroBox, storyBox, interiorBox, socialBox] = await Promise.all([
      header.boundingBox(),
      hero.boundingBox(),
      story.boundingBox(),
      interior.boundingBox(),
      social.boundingBox(),
    ]);

    expect(headerBox?.height).toBeCloseTo(frame.headerHeight, 1);
    expect(heroBox?.height).toBeCloseTo(frame.heroHeight, 1);
    expect(storyBox).toMatchObject(frame.story);
    expect(interiorBox).toMatchObject(frame.interior);
    expect(socialBox?.y).toBeCloseTo(frame.socialY, 1);

    if (frame.barrelWidth === null) {
      await expect(barrel).toBeHidden();
    } else {
      await expect(barrel).toBeVisible();
      expect((await barrel.boundingBox())?.width).toBeCloseTo(frame.barrelWidth, 1);
    }
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
test("access section includes the map and complete localized travel details", async ({ page }) => { await page.goto("/ja"); const access = page.locator("#access"); await expect(access.getByRole("heading", { level: 2, name: "Access" })).toBeVisible(); await expect(access.getByTitle("グスト周辺の地図")).toBeVisible(); await expect(access.getByRole("link", { name: "Googleマップを新しいタブで開きます" })).toHaveAttribute("target", "_blank"); await expect(access.getByText("大阪メトロ谷町線 関目高殿駅 3番出口 徒歩1分")).toBeVisible(); await expect(access.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); });
test("footer exposes navigation, social links, contact hours, and copyright", async ({ page }) => { await page.goto("/ja"); const footer = page.getByRole("contentinfo"); await expect(footer.getByRole("link", { name: "Gusto Italian Bar" })).toHaveAttribute("href", "/ja"); await expect(footer.getByRole("navigation", { name: "フッターナビゲーション" }).getByRole("link")).toHaveCount(4); await expect(footer.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); await expect(footer.getByRole("link", { name: "Twitterを新しいタブで開きます" })).toHaveAttribute("target", "_blank"); await expect(footer.getByText("Lunch: 12:00～15:00")).toBeVisible(); await expect(footer.getByText("© 2023 Masa Kondo. All Rights Reserved.")).toBeVisible(); });
test("reservation page provides a graceful phone fallback without configuration", async ({ page }) => { await page.goto("/ja/reserve"); await expect(page.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); });
test("mobile navigation opens and links to the localized menu", async ({ page }, testInfo) => { test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction"); await page.goto("/ja"); await page.getByRole("button", { name: "メニュー" }).click(); await expect(page.locator("#mobile-nav").getByRole("link", { name: "Menu" })).toHaveAttribute("href", "/ja/menu"); });
