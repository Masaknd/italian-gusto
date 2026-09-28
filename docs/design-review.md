# Gusto design review

Reviewed September 25, 2026.

## Overall assessment

Gusto has a distinctive, welcoming visual identity. The paper texture, hand lettering, food cutouts, deep green, coral, and irregular brush edges communicate a casual neighborhood restaurant convincingly. Preserve that identity while improving readability and the paths to the menu, reservations, and directions.

The largest weaknesses are functional: missing navigation on desktop inner pages, insufficient text contrast, a very long menu dominated by placeholder photography, and animation that delays useful information. These should take priority over decorative refinements.

This is a design and usability review of the current implementation, not a replacement design specification. Recommendations marked as design judgments should be validated with the restaurant's content and actual visitor behavior.

## Scope and evidence

- Opened all eight public pages: `/ja`, `/en`, and each locale's `/menu`, `/about`, and `/privacy`.
- Inspected representative rendered layouts at 1440 × 1000 and 390 × 844; additionally checked the Japanese homepage at 768 × 1024. Not every route was checked at every size.
- Reviewed shared header, hero, story, wine, recommendations, menu cards, category navigation, social gallery, reservation, access, footer, consent, privacy preferences, translation notices, and preview banner source.
- Checked the mobile navigation opening/closing, Escape focus restoration, menu structure, and privacy decline action. No reservation was submitted. Browser actions used a separate review session.
- Calculated contrast from the declared solid colors and animation delays from the source. Text on photography or texture requires additional background-specific checks.
- Reviewed against [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), with W3C references for accessibility findings.

The running local development site supplied the content reviewed. Placeholder observations describe that local content; production content was not independently checked. Screenshots include the Next.js development indicator, which is excluded from the findings. Error, missing-translation, and draft-preview states were inspected in source rather than forced in the browser. This is not a full accessibility certification or cross-browser test.

## Priority overview

| Priority | Improvement                                                  | Main benefit                                        |
| -------- | ------------------------------------------------------------ | --------------------------------------------------- |
| P1       | Restore desktop navigation and a visible reservation action  | Guests can move between pages and book easily       |
| P1       | Correct text contrast across the palette                     | Directions, menu names, and buttons become readable |
| P1       | Replace placeholder menu images and reduce menu length       | Guests can compare actual dishes efficiently        |
| P1       | Remove long delays before content and links appear           | Information is available when guests reach it       |
| P1       | Simplify the recommendations scrolling interaction           | Browsing becomes predictable and controllable       |
| P2       | Improve hero composition and immediate actions               | First-time visitors understand what to do next      |
| P2       | Simplify body typography and price hierarchy                 | Faster reading in both languages                    |
| P2       | Fix mobile navigation affordances and menu category controls | Clearer, more comfortable touch interaction         |
| P2       | Improve directions layout and floating controls              | Essential visit information is easier to see        |
| P2       | Add privacy preference feedback and motion controls          | Clearer state and greater user control              |
| P3       | Refine page rhythm, content promises, and fallback states    | A more coherent and complete experience             |

P1 means address in the next design iteration; P2 means follow immediately afterward; P3 means polish after the core journeys work well.

## Detailed findings

### 1. Desktop inner pages lose primary navigation — P1, confirmed

`components/site-header.tsx:150` — The desktop navigation receives `hidden` on every current main page. The hamburger is also hidden at desktop widths. The homepage supplies its own hero navigation, but Menu, About, and Privacy have only the logo and language switch at the top. Reaching another section requires returning home or finding the footer.

**Improve:** Add a consistent desktop header with Menu, About, Directions, and a clearly emphasized reservation link. Add a current-page indicator.

 <!-- Keep the language switch visible and make its entire visual target clickable; currently the large triangular area advertises interaction while only the text link performs navigation (`components/site-header.tsx:165`). -->

**Acceptance:** From the top of each inner page, a guest can reach the menu, directions, and reservations in one click.

[Screenshot: desktop menu](design-review/gusto-en-menu.png)

### 2. Several core color combinations have insufficient contrast — P1, confirmed

<!-- `components/access.tsx:54`, `components/wine.tsx:93`, `components/reservation.tsx:65`, `components/analytics.tsx:84`,  -->

`components/menu-card-grid.tsx:77`
<!-- — Cream text on coral, and coral menu names on cream cards, measure **2.46:1** using `#f6e6e0` and `#f26c4f`. These are below both the normal-text and large-text thresholds. Coral on the nominal paper color measures about **2.66:1**, although the actual textured and photographic backgrounds vary. -->

<!-- [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) requires at least 4.5:1 for ordinary text and 3:1 for qualifying large text. The issue affects useful information, including addresses, travel instructions, dish names, and booking button labels. -->

<!-- **Improve:** Use existing dark green text on coral; that combination measures about **5.15:1**. Give text on pale surfaces a darker coral variant, while retaining the existing coral for decoration. Review the footer's cream-on-orange strip (`components/footer.tsx:97`) and the brown focus outline on dark green (`app/globals.css:660`) as part of the same palette pass. Introduce text/action color roles so decorative colors are not automatically reused for readable text. -->

<!-- **Acceptance:** Verify final colors on all actual surfaces, including hover and focus states; normal text reaches 4.5:1 and large text reaches 3:1. -->

[Screenshot: directions](design-review/gusto-access-mobile.png) · [Screenshot: footer](design-review/gusto-footer-mobile.png)

### 3. The menu looks unfinished and takes too much scrolling — P1, confirmed with local content

`components/menu-card-grid.tsx:65` — The English page rendered **61 cards**, with **59 images pointing to the same `mock.png` empty-plate asset**. At 390 × 844, the whole page measured **38,123 CSS pixels**, approximately 45 viewport heights. Every placeholder consumes a large square image area.

**Improve:** Publish real dish photography where available. For dishes without photography, use a deliberate compact name/description/price layout rather than a repeated empty plate. Reserve large photographic cards for a small set of featured dishes. Keep remaining items in easily compared rows or compact cards grouped by category.

**Acceptance:** Every image represents its dish or is clearly decorative; a missing photograph does not create a large empty visual block. Guests can compare several items within one phone viewport.

[Screenshot: repeated placeholder plates](design-review/gusto-en-menu.png)

### 4. Useful content waits for lengthy text animations — P1, confirmed in source

<!-- `components/animations/config.ts:19`, `components/about.tsx:59`, `components/wine.tsx:59`, `components/about-page-hero.tsx:24` — Text reveals letter by letter at 35 ms per unit, with sequential paragraphs. The calculated delay passed to the English story link/business details is about **10.0 seconds**, and to the wine link about **10.5 seconds**, before their own fade animation. Japanese equivalents are about 6.2 and 6.8 seconds. These are configured delays after the relevant in-view trigger, not measured network load times. -->

<!-- **Improve:** Show paragraphs and practical details immediately, or use a brief group fade. Keep character animation for short decorative headings. Do not gate links, hours, or phone numbers behind the length of a paragraph. -->

<!-- **Acceptance:** All essential information and actions are legible within roughly half a second of entering view; reduced-motion behavior remains supported. -->

### 5. Recommendations change the meaning of page scrolling — P1, confirmed design risk

`components/recommendations.tsx:229` — Wheel events are intercepted, the window jumps by viewport increments, and subsequent wheel input is blocked while the horizontal transition settles and for a further 500 ms. The section has no visible previous/next controls or position indicator. Users looking for reservations must traverse the showcase before continuing down the page.

**Improve:** Prefer a normal vertical featured-dish sequence on phones. If retaining a desktop carousel, provide previous/next buttons, a current/total indicator, and a direct way to continue to the next section. Keep page scrolling predictable. Check keyboard focus in translated offscreen panels and short-height windows when implementing the change.

**Acceptance:** Every dish can be reached with explicit controls and keyboard input; moving toward reservations never requires guessing how the scroll effect works.

The reduced-motion mode already changes the track to a column, which is a useful foundation. Its children still use `h-screen` (`components/recommendations.tsx:279`); allow content-driven heights in that mode to accommodate long copy and larger text. Clipping at enlarged text was not separately reproduced.

### 6. The hero gives imagery more priority than orientation and action — P2, visual judgment

`components/hero.tsx:18`, `components/hero.tsx:43`, `components/hero.tsx:65` — The hero fills a viewport, with absolutely positioned imagery and title. On desktop, the title crosses the central plate; on phones, the English title overlays the upper dish. The phone hero offers no visible menu or booking action outside the hamburger. The introductory location copy exists in the dictionaries but is not rendered here.

<!-- **Improve:** Give the title a quieter area, reduce the image overlap, and add a brief Osaka/location descriptor. Place “View menu” and a primary reservation action under the heading. Size the phone hero around its content so the next section is discoverable. Retain the food collage and brand lettering. -->

<!-- **Acceptance:** At phone and tablet widths, visitors can identify the restaurant's location and reach the menu or booking without opening navigation. -->

<!-- [Screenshot: phone hero](design-review/gusto-en-mobile.png) · [Screenshot: tablet hero](design-review/gusto-ja-tablet.png) -->

### 7. Handwritten typography is carrying too much body content — P2, visual judgment

<!-- `components/language-font.tsx:17` — English paragraphs use Kalam Bold and Japanese paragraphs use Yamafont across stories, menu descriptions, and other content. These fonts add personality, but dense paragraphs and small menu details become harder to scan. The English About page's business details also use the Japanese accent font directly (`components/about-page-hero.tsx:54`). -->

<!-- **Improve:** Use the existing sans-serif for descriptions, practical details, and long paragraphs. Keep handwritten fonts for headings, short labels, and occasional emphasis. Establish a consistent body size and line height, then review Japanese and English independently. Reduce texture behind long passages if needed. -->

<!-- The privacy page already demonstrates a clearer body-text treatment that can guide this change. -->

<!-- [Screenshot: About body text](design-review/gusto-en-about-mobile.png) · [Screenshot: privacy typography](design-review/gusto-privacy-desktop.png) -->

### 8. Category navigation and prices need clearer hierarchy — P2, confirmed and visual judgment

`components/menu-category-nav.tsx:24` — Wrapped category links retain leading separators, leaving a dangling divider at the start of a new line. The category bar scrolls away on a very long menu. Long labels are horizontally compressed (`components/menu-category-nav.tsx:66`).

**Improve:** Use comfortably padded category buttons or a compact sticky category control with a visible current category. Avoid compressing glyphs. Keep anchor destinations clear of the sticky control.

`components/menu-price.tsx:15` — Pre-tax and tax-inclusive amounts compete visually, while the tax explanation is much smaller and tightly packed. The English label uses the Japanese accent font. Values such as 1078 lack grouping.

**Improve:** Make the total payable price the primary number, with a readable “incl. tax” label. Present any additional price secondarily. Use locale-aware number formatting and a legible, consistent numeral style. This is a hierarchy recommendation, not a legal assessment of price display.

[Screenshot: phone menu and pricing](design-review/gusto-en-menu-mobile.png)

### 9. Mobile navigation has an ambiguous close affordance — P2, confirmed

`components/site-header.tsx:242` — The close icon becomes an X only from the `sm` breakpoint. At 390 px it remains three horizontal lines, so the open state still displays a hamburger. Open and close targets are 32 × 32 px (`components/site-header.tsx:198`, `components/site-header.tsx:237`).

**Improve:** Use an X at every open-menu size and increase controls to a comfortable 44 × 44 px target. Add current-page styling. Consider Japanese or bilingual navigation labels on `/ja`, particularly for reservations and directions; the current Japanese navigation uses English labels throughout. Add safe-area padding for the fullscreen panel.

Escape already closes the menu and returns focus to its trigger; preserve that behavior.

[Screenshot: open mobile navigation](design-review/gusto-mobile-nav-settled.png)

### 10. Directions are pushed below an oversized map, with an overlay covering content — P2, confirmed

`components/access.tsx:44` — `grid-rows-2` makes the phone map row as tall as the details row. On the English About page, the map occupied roughly 510 px and the Access section roughly 1,182 px. Address and transit details sit below that large map.

`components/scroll-to-top.tsx:34` — The fixed back-to-top button overlaps the address area in the phone capture.

**Improve:** Put the address, nearest station, and directions link near the top. Give the map an independent phone height around 240–300 px, then use auto-sized details. Place floating controls where they cannot cover reading content, accounting for consent banners and safe areas.

**Acceptance:** A guest can see the address and directions action without first scrolling past a large map; floating controls do not obscure text.

[Screenshot: map and obscured address](design-review/gusto-access-mobile.png)

### 11. Booking content needs a more direct hierarchy — P2, visual judgment

`components/reservation.tsx:57` — Four policy notes appear as a continuous block before the button. On desktop the section is 914 px tall, and 16 px notes use 42 px line height. This produces an unusually tall block with a comparatively modest action at the bottom.

**Improve:** Make the reservation action prominent near the heading. Summarize the key conditions in distinct, readable points, with longer same-day seating details below. Use consistent paragraph spacing and a more moderate line height. Retain the warm restaurant photograph and sufficient background contrast.

[Screenshot: reservation section](design-review/gusto-reservation-desktop.png)

### 12. Privacy choices give no confirmation or current state — P2, confirmed

`components/privacy-preferences.tsx:19` — Clicking decline writes consent, but the preferences component does not display a selected state, the current choice, or a saved confirmation. The browser review reproduced the absence of a confirmation after declining.

**Improve:** Show the current choice, make selection explicit, and announce a short confirmation through a polite live region. Keep allow and decline understandable as separate choices. On phones, consider collapsing the long privacy contents list so users can reach the policy introduction and first section sooner.

[Screenshot: preferences after decline](design-review/gusto-privacy-feedback.png)

### 13. Motion and keyboard access need a final accessibility pass — P2, source confirmed

`app/globals.css:681`, `components/social.tsx:44` — The gallery moves continuously on a 60-second loop, with no pause control. Reduced-motion support already stops it, but users with the normal motion setting still need control. [W3C pause/stop/hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) covers automatically moving content lasting over five seconds alongside other content.

`app/[locale]/layout.tsx:91` — There is no skip-to-content link. Add one before the header and a stable main-content target on each page.

**Improve:** Provide a persistent gallery pause/resume control or use a static gallery. Keep existing semantic links, labelled controls, screen-reader text for animated copy, and reduced-motion support. Review CSS hover transforms in social/footer components under reduced motion as well.

## Additional refinements — P3

- `components/hero.tsx:155` — The homepage “Menu” link goes to recommendations, whereas mobile navigation and footer “Menu” links go to the full menu. Use the same destination for the same label; name the showcase separately.
- `components/wine.tsx:32` — “View the wine menu” opens the general menu at the top. The reviewed English Drink category contains only Ginger Ale. Confirm the real wine offering, then link directly to it or change the promise in both dictionaries.
- `components/menu-list.tsx:29` and `app/[locale]/menu/page.tsx:78` — Empty/error menu states are brief paragraphs without a strong recovery action. Add useful next steps, such as retrying or opening restaurant contact details. Preserve the existing Japanese-menu link for missing English translations. These states were reviewed in source only.
- `components/social.tsx:87` — Hover scaling is applied to the wrapper and again to nested text, creating compounded enlargement. Use a smaller, single hover treatment and equivalent focus feedback.
- `components/footer.tsx:67` — Phone footer links have 16 px line height with no vertical padding. Increase their hit areas while keeping the footer compact.
- `app/[locale]/about/page.tsx:49` — About repeats the homepage story, then the same gallery/reservation/access sequence. Give this page additional useful content: owner expertise, atmosphere, seating, and visit expectations using verified restaurant information.
- `components/about.tsx:89` — A fixed English image alternative bypasses the Japanese dictionary. Localize it, or use an empty alternative if the illustration is purely decorative.
- `components/preview-banner.tsx:13` — The fixed draft banner has no corresponding reserved page space. Check its interaction with the consent banner and last footer controls during a future draft-preview pass.

## What to preserve

- The recognizable warm palette, food cutouts, illustration style, and brush transitions.
- Strong food and interior imagery where genuine photographs are present.
- Explicit Japanese and English routes and localized metadata.
- Clear external-map and telephone links.
- Existing focus outlines, mobile dialog focus handling, reduced-motion branches, and accessible text alternatives for animated lettering.
- The privacy page's restrained body typography and organized content sections.

## Suggested implementation order

1. **Restore essential journeys:** desktop navigation, direct reservation access, consistent menu destinations, and privacy-state feedback.
2. **Make information readable:** accessible text colors, body typography, prices, and immediate content visibility.
3. **Rebuild menu browsing around real content:** remove empty-plate repetition, use compact items, and retain category access while scrolling.
4. **Refine responsive composition:** hero overlap, recommendations controls, map height, booking hierarchy, and floating-button placement.
5. **Polish and verify:** gallery controls, target sizes, focus contrast, reduced motion, long translations, and empty/preview states.

For implementation, recheck both locales at phone, tablet, desktop, short landscape, and 200% zoom sizes. Verify keyboard navigation, visible focus, and the three core journeys: find a dish and total price; start a reservation; find the address and opening hours. Run the repository's required lint, TypeScript, build, and applicable Playwright checks after material code changes.

This review changes documentation only. Application source was not modified, and build/test suites were not run for the report.
