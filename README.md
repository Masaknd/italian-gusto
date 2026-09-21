# Gusto Italian Bar

An App Router, TypeScript, Tailwind and microCMS foundation for the official Osaka Italian bar website. The visual layer uses local imagery and the current project styles as its source of truth.

## Local setup

1. Use Node.js 20.9+ and pnpm 10.
2. Copy `.env.local.example` to `.env.local` and fill in the required service values.
3. Run `pnpm dev`, then visit `/ja` or `/en`. Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm test:e2e` before release. Playwright’s browser installation, if needed, is `pnpm exec playwright install`.

Never commit `.env.local`; `MICROCMS_API_KEY`, `REVALIDATE_SECRET`, and `DEEPL_API_KEY` remain server-only. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is intentionally public and may be left blank. Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin for non-Vercel production builds or to override the Vercel production domain. Vercel builds otherwise use `VERCEL_PROJECT_PRODUCTION_URL`, so preview deployments also publish canonicals for the production domain. Production builds without either value fail rather than publishing localhost or example.com canonicals. The tracked `.env.local.example` contains sanitized local defaults.

## microCMS owner workflow

Create list APIs manually in microCMS; this code intentionally does not call an undocumented API to create them.

### `menus`

Create fields: `name` (text, required), `category` (select, required; choose one option), `priceExcludingTax` (number, required), `description` (textarea), `image` (image), `sortOrder` (number, required), and `isAvailable` (boolean, required). Publish content after editing. The public site shows only published, available entries, sorts by `sortOrder` then ID, and hides empty categories. Categories containing `drink` or `ドリンク` render compactly without descriptions or images. Prices including tax are calculated in [`lib/site-config.ts`](./lib/site-config.ts), where the tax rate and rounding policy live in one place.

To import the mock menu data from `app/sample-menu-list.json`, first grant the configured `MICROCMS_API_KEY` GET and POST access to the `menus` API. Preview the idempotent import plan, then apply it:

```sh
pnpm import:menus
pnpm import:menus --write
```

The importer maps `menuName` to `name`, `price` to `priceExcludingTax`, and the sample category strings to the configured microCMS select-option labels. It matches existing content by its unique Japanese menu name, creates missing content through the POST API, verifies the stored values after writing, and leaves unrelated content untouched. If the dry run reports updates, grant PATCH access and explicitly apply them with `pnpm import:menus --write --allow-updates`. The placeholder image URLs in the sample file are omitted; replace them with media-library URLs beginning with `https://images.microcms-assets.io/assets/` to import images.

### `featured-menus`

Create fields: `name` (text, required), `description` (textarea), `image` (image, required), `sortOrder` (number, required), and `isAvailable` (boolean, required). Optionally add `menuCategory` (select) with values matching the `menus` category options to link a recommendation to that category; without it, the recommendation links to the complete menu. The website displays up to five published, available entries. It does not insert sample recommendations in production.

Configure a microCMS webhook after content publication to `POST https://YOUR-DOMAIN/api/revalidate?secret=YOUR_REVALIDATE_SECRET`, with the same secret in the `x-revalidate-secret` header if the webhook supports custom headers. This invalidates cached menu and translation content as well as all affected locale pages.

### Draft preview

In each microCMS list API, open **API settings > Preview** and configure the matching URL below. Replace `YOUR-DOMAIN` with the deployed site and `YOUR_REVALIDATE_SECRET` with the server-side `REVALIDATE_SECRET` value.

- `menus`: `https://YOUR-DOMAIN/api/draft?secret=YOUR_REVALIDATE_SECRET&endpoint=menus&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`
- `featured-menus`: `https://YOUR-DOMAIN/api/draft?secret=YOUR_REVALIDATE_SECRET&endpoint=featured-menus&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`

The handler validates the secret and draft against microCMS before setting HTTP-only preview cookies. It then opens the Japanese page that renders that API. The on-page preview bar can end the session and return to the current page. For local testing, use the same URLs with `http://localhost:3000` while `pnpm dev` is running.

Japanese is the sole owner-managed source. English natural-language menu fields and category labels are translated on the server through DeepL and cached with the CMS content tag; transient translation failures fall back to Japanese and are retried on the next request. Food names and culinary descriptions require owner/maintainer review after automated translation before publishing.

## Reservations, analytics, and search

Reservation buttons link directly to the SelectType booking form at `https://select-type.com/rsv/?id=dfcuCU3lEUg`, configured by `reservationUrl` in `lib/site-config.ts`. The form opens in the same tab, and reservation details are submitted directly to SelectType. There is no embedded booking form or separate reservation page.

GA4 is loaded only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists and the visitor opts in. The localized privacy page describes the site's analytics behavior and lets visitors change their choice. Page views and reservation CTA clicks are tracked after consent; reservation completion needs a separate SelectType/privacy review. In GA4, disable Enhanced Measurement page views based on browser history changes so route navigation is measured once by this application's manual page-view event. The operator should review the disclosure for the deployed analytics and booking settings before launch.

Set `GOOGLE_SITE_VERIFICATION` to output the Google Search Console HTML meta verification. Alternatively use Search Console DNS verification, which requires no repository change. Submit `/sitemap.xml` after launch; `/robots.txt` is generated automatically. Canonicals and reciprocal `hreflang` links are generated for localized public pages.

## Free-plan launch assumptions

Keep the initial project within the selected microCMS and SelectType free plans: two small list APIs, published content only, a webhook, and a hosted booking-form link. Before launch, confirm each provider’s current free-plan API, webhook, content, booking, branding, and monthly usage limits; these limits change independently of this codebase. Analytics and Search Console data should inform any later plan upgrade.

## Remaining design inputs

The current project styles and implementation are the visual source of truth. Venue address, telephone number, hours, tax policy, and reservation destination are centralized in [`lib/site-config.ts`](./lib/site-config.ts). Set each optional `SOCIAL_TWITTER_URL`, `SOCIAL_INSTAGRAM_URL`, and `SOCIAL_BLOG_URL` to the venue's real HTTPS destination; missing links are omitted.
