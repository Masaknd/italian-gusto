import { expect, test } from "@playwright/test";

test("the 1440px home header matches the desktop design frame", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop-only geometry check");
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/ja");

  const header = page.getByRole("banner");
  const logo = header.getByRole("link", { name: "Gusto Italian Bar" });

  await expect(header).toHaveCSS("height", "132px");
  await expect(logo).toBeVisible();
  await expect(page.getByRole("button", { name: "メニュー" })).toBeHidden();

  const logoBox = await logo.boundingBox();
  expect(logoBox).not.toBeNull();
  expect(logoBox!.x).toBeCloseTo(48, 1);
  expect(logoBox!.y).toBeCloseTo(16, 1);
  expect(logoBox!.width).toBeCloseTo(230.708664, 1);
  expect(logoBox!.height).toBeCloseTo(100, 1);
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
  const link = recommendation.getByRole("link", { name: "アラカルトメニューを見る" });

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

test("Japanese and English pages use their matching dictionaries", async ({ page }) => { await page.goto("/ja"); await expect(page.getByRole("heading", { level: 1, name: "だれでも気軽に ワインと料理を 楽しめるバル" })).toBeVisible(); await page.goto("/en"); await expect(page.getByRole("heading", { level: 1, name: "Make tonight more delicious." })).toBeVisible(); });
test("reservation section exposes localized guidance and its call to action", async ({ page }) => { await page.goto("/ja"); const reservation = page.locator("#reservation"); await expect(reservation.getByRole("heading", { level: 2, name: "Reservation" })).toBeVisible(); await expect(reservation.getByRole("listitem")).toHaveCount(4); await expect(reservation.getByText("ご予約・お問い合わせページに進む")).toBeVisible(); await page.goto("/en"); await expect(page.locator("#reservation").getByText("Reservations and inquiries", { exact: true })).toBeVisible(); });
test("access section includes the map and complete localized travel details", async ({ page }) => { await page.goto("/ja"); const access = page.locator("#access"); await expect(access.getByRole("heading", { level: 2, name: "Access" })).toBeVisible(); await expect(access.getByTitle("グスト周辺の地図")).toBeVisible(); await expect(access.getByRole("link", { name: "Googleマップを新しいタブで開きます" })).toHaveAttribute("target", "_blank"); await expect(access.getByText("大阪メトロ谷町線 関目高殿駅 3番出口 徒歩1分")).toBeVisible(); await expect(access.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); });
test("footer exposes navigation, social links, contact hours, and copyright", async ({ page }) => { await page.goto("/ja"); const footer = page.getByRole("contentinfo"); await expect(footer.getByRole("link", { name: "Gusto Italian Bar" })).toHaveAttribute("href", "/ja"); await expect(footer.getByRole("navigation", { name: "フッターナビゲーション" }).getByRole("link")).toHaveCount(4); await expect(footer.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); await expect(footer.getByRole("link", { name: "Twitterを新しいタブで開きます" })).toHaveAttribute("target", "_blank"); await expect(footer.getByText("Lunch: 12:00～15:00")).toBeVisible(); await expect(footer.getByText("© 2023 Masa Kondo. All Rights Reserved.")).toBeVisible(); });
test("reservation page provides a graceful phone fallback without configuration", async ({ page }) => { await page.goto("/ja/reserve"); await expect(page.getByRole("link", { name: "06-6180-6059" })).toHaveAttribute("href", "tel:+81661806059"); });
test("mobile navigation opens and links to the localized menu", async ({ page }, testInfo) => { test.skip(testInfo.project.name !== "mobile", "Mobile-only interaction"); await page.goto("/ja"); await page.getByRole("button", { name: "メニュー" }).click(); await expect(page.locator("#mobile-nav").getByRole("link", { name: "メニュー" })).toHaveAttribute("href", "/ja/menu"); });
