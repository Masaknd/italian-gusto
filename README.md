# Gusto Italian Bar

An App Router, TypeScript, Tailwind and microCMS foundation for the official Osaka Italian bar website. The visual layer uses local placeholder imagery until the corresponding Pixso designs and final assets are supplied.

## Local setup

1. Use Node.js 20.9+ and pnpm 10.
2. Copy `.env.local.example` to `.env.local` and fill in the required service values.
3. Run `pnpm dev`, then visit `/ja` or `/en`. Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and `pnpm test:e2e` before release. Playwright’s browser installation, if needed, is `pnpm exec playwright install`.

Only the seven variables in `.env.local.example` are required by this project. Never commit `.env.local`; `MICROCMS_API_KEY`, `REVALIDATE_SECRET`, and `DEEPL_API_KEY` must remain server-only. `NEXT_PUBLIC_GA_MEASUREMENT_ID` is intentionally public. The optional `NEXT_PUBLIC_SITE_URL` may be set for production canonical URLs, but is not required for local operation.

## microCMS owner workflow

Create list APIs manually in microCMS; this code intentionally does not call an undocumented API to create them.

### `menus`

Create fields: `name` (text, required), `category` (select, required), `priceExcludingTax` (number, required), `description` (textarea), `image` (image), `sortOrder` (number, required), and `isAvailable` (boolean, required). Publish content after editing. The public site shows only published, available entries, sorts by `sortOrder` then ID, and hides empty categories. Categories containing `drink` or `ドリンク` render compactly without descriptions or images. Prices including tax are calculated in [`lib/site-config.ts`](./lib/site-config.ts), where the tax rate and rounding policy live in one place.

### `featured-menus`

Create fields: `name` (text, required), `description` (textarea), `image` (image, required), `sortOrder` (number, required), and `isAvailable` (boolean, required). Publish no more than the desired items; the website displays the first 3–5 available entries (up to 5).

Configure a microCMS webhook after content publication to `POST https://YOUR-DOMAIN/api/revalidate?secret=YOUR_REVALIDATE_SECRET`, with the same secret in the `x-revalidate-secret` header if the webhook supports custom headers. This invalidates cached menu and translation content as well as all affected locale pages.

### Draft preview

In each microCMS list API, open **API settings > Preview** and configure the matching URL below. Replace `YOUR-DOMAIN` with the deployed site and `YOUR_REVALIDATE_SECRET` with the server-side `REVALIDATE_SECRET` value.

- `menus`: `https://YOUR-DOMAIN/api/draft?secret=YOUR_REVALIDATE_SECRET&endpoint=menus&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`
- `featured-menus`: `https://YOUR-DOMAIN/api/draft?secret=YOUR_REVALIDATE_SECRET&endpoint=featured-menus&contentId={CONTENT_ID}&draftKey={DRAFT_KEY}`

The handler validates the secret and draft against microCMS before setting HTTP-only preview cookies. It then opens the Japanese page that renders that API. The on-page preview bar can end the session and return to the current page. For local testing, use the same URLs with `http://localhost:3000` while `pnpm dev` is running.

Japanese is the sole owner-managed source. English natural-language menu fields are translated on the server through DeepL and cached with the CMS content tag; they fall back to Japanese if DeepL is unavailable. Food names and culinary descriptions require owner/maintainer review after automated translation before publishing.

## Reservations, analytics, and search

Set `SELECTTYPE_RESERVATION_URL` to the public SelectType booking form. The MVP uses an accessible external link opened in a new tab; it neither embeds SelectType nor receives reservation data. If SelectType later provides a secure, accessible mobile embed, it may be confined to `/[locale]/reserve` only.

GA4 is not loaded unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists. Page views and reservation CTA clicks are tracked; reservation completion needs a separate SelectType/privacy review. Add the operator’s privacy/cookie disclosure before enabling production analytics.

Set `GOOGLE_SITE_VERIFICATION` to output the Google Search Console HTML meta verification. Alternatively use Search Console DNS verification, which requires no repository change. Submit `/sitemap.xml` after launch; `/robots.txt` is generated automatically. Canonicals and reciprocal `hreflang` links are generated for localized public pages.

## Free-plan launch assumptions

Keep the initial project within the selected microCMS and SelectType free plans: two small list APIs, published content only, a webhook, and a hosted booking-form link. Before launch, confirm each provider’s current free-plan API, webhook, content, booking, branding, and monthly usage limits; these limits change independently of this codebase. Analytics and Search Console data should inform any later plan upgrade.

## Remaining design inputs

The site has intentionally neutral typography, spacing, and supplied local image placeholders. Replace these only against the supplied Pixso component/screen source of truth. Venue address, telephone number, hours, social URL, tax policy, and reservation destination are centralized in [`lib/site-config.ts`](./lib/site-config.ts).
