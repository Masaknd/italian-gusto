<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Gusto project conventions

- Use the App Router and TypeScript. Route parameters are asynchronous in this Next.js version.
- Keep Japanese as the CMS source language. Static copy belongs in `locales/`; do not put user-facing literals in feature components.
- Keep CMS and DeepL credentials server-only. New public environment variables require an `.env.local.example` update and README documentation.
- Preserve the explicit `/ja` and `/en` URL structure, locale metadata, and accessible keyboard interactions.
- Supplied Pixso screens are the visual source of truth. Until then, use the neutral placeholder foundation rather than creating a new visual direction.
- Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`, and applicable Playwright tests after material changes.
