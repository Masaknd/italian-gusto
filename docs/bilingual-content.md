# Bilingual menu content

Japanese remains the editing source. `menus` and `featured-menus` each retain one record per dish or recommendation. Price, images, category, availability, ordering, and content IDs are shared. English text is prepared in a draft and reviewed before publication. No translation requests run during page rendering or language switching.

## 1. Add fields to both MicroCMS API schemas

Keep all current fields and IDs. Add these optional fields so existing Japanese entries remain valid:

| Field ID | Type | Configuration |
| --- | --- | --- |
| `nameEn` | Text | English dish/recommendation name |
| `descriptionEn` | Text area | English description |
| `englishStatus` | Select | Single selection: `pending`, `needs-review`, `approved`, `failed` |
| `englishSourceHash` | Text | Written by automation; do not edit manually |

`englishStatus` is an ordinary custom select field, not a MicroCMS publication status. MicroCMS returns select values as arrays; the worker writes e.g. `["needs-review"]`.

The SHA-256 fingerprint covers exactly `JSON.stringify([name, description ?? ""])`. Changing Japanese text invalidates approval even if someone leaves the status set to approved. Price/image/order changes do not invalidate the translation. Category values stay unchanged; add new category display labels to both `locales/en.ts` and `locales/ja.ts`.

## 2. Server configuration

Copy the placeholders in `.env.local.example` to the actual local or deployment environment. Never put these secrets in `NEXT_PUBLIC_*` variables.

| Variable | Purpose |
| --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | Existing service subdomain |
| `MICROCMS_API_KEY` | Existing website read key; GET published records, no unrestricted draft-list access |
| `MICROCMS_TRANSLATION_API_KEY` | Separate worker key: Content API GET/PATCH for both APIs, and Management API permission to retrieve content list/detail |
| `MICROCMS_WEBHOOK_SECRET` | Random HMAC secret also entered in the MicroCMS webhook settings |
| `DEEPL_API_KEY` | DeepL API key; `:fx` keys use the Free endpoint, others use Pro |
| `TRANSLATION_SITE_URL` | Stable public HTTPS origin receiving jobs, e.g. `https://www.example.com` |
| `QSTASH_TOKEN` | QStash API token |
| `QSTASH_URL` | QStash API URL from the console for the selected region; omit only when using the SDK default region |
| `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY` | Both delivery verification keys from the same QStash region |
| `QSTASH_TRANSLATION_QUEUE` | Dedicated queue name, default `gusto-menu-translations`; use a distinct name for a staging environment |
| `CRON_SECRET` | Random secret authenticating reconciliation |

The translator key needs read access to draft content through a `draftKey`. Management metadata supplies the current draft key and publication status. No publication/status-write permission is needed. The worker uses **only `PATCH ?status=draft`** for mutations. It never publishes, approves, changes Japanese fields, or changes prices/images.

Use production settings only on the production deployment. Keep staging CMS/queue/keys isolated. The callback origin must be reachable by QStash; deployment protection must permit signed deliveries. Do not point preview deployments at the production worker or share production write credentials with them.

## 3. Queue and webhook

Create a QStash project/account and configure the variables above. The application creates/updates its dedicated FIFO queue with parallelism 1 when enqueueing. Do not reuse this queue for unrelated work or raise its parallelism. Three delivery retries use QStash's backoff, and exhausted jobs remain inspectable in QStash. The worker has a 120-second execution limit; use a QStash delivery timeout at least this long (the application leaves the plan default), and a hosting runtime supporting this duration. Jobs contain endpoint and content ID, never credentials or draft keys.

For **both** MicroCMS APIs, create a Custom Notification webhook:

- URL: `https://YOUR-DOMAIN/api/microcms/webhook`
- Secret: the value of `MICROCMS_WEBHOOK_SECRET`
- Events: draft saves through the console and API; publication/updates through the console, API, review, and scheduling; publication end; content deletion; draft deletion/discard. Enable applicable status/ID/order changes too, to invalidate the page caches.

The receiver validates `x-microcms-signature` over the raw body and checks the service and API. Translation-only writes do not enqueue another translation. All authenticated content events invalidate the cached CMS content and affected locale pages. A queued job reloads the current draft from MicroCMS, rather than relying on event delivery order.

`vercel.json` schedules `/api/translations/reconcile` daily at 06:00 UTC. On Vercel, set `CRON_SECRET`; Vercel sends it as a bearer token. On another host, schedule an authenticated GET to the same endpoint. Daily reconciliation finds active records, queues bounded pages of work, and retries missing/stale/failed translations. It includes draft-only records and skips closed/deleted records. It also recovers from missed webhooks because MicroCMS does not retry unsuccessful webhook deliveries. Operators can trigger the same endpoint for immediate recovery. Each pass enqueues every active record, but workers skip already-current translations without calling DeepL.

## 4. Editing and review

1. Edit `name` and/or `description` in Japanese and **save as a draft**.
2. Wait for `englishStatus` to become `needs-review`, then reload the editor to see generated fields. Avoid keeping and resaving a stale editor form over automation changes.
3. Review/correct `nameEn` and `descriptionEn`. Use the existing draft preview URL and its language switch to preview English. Only the selected draft may display `needs-review` English in preview; public pages cannot.
4. Set `englishStatus` to `approved` and publish the record. Japanese and English become available from the same publication.
5. On subsequent changes, repeat the draft workflow. The previous published record stays live until you publish the replacement.

A fresh matching approved translation or an existing matching translation awaiting review is not regenerated. If Japanese text changes, automation generates a new English draft and requires review again. To deliberately regenerate the same source, set its translation status to `pending`, save the draft, then trigger reconciliation (or wait for its next daily pass).

If English is missing, incomplete, unapproved, or stale, the English page omits the item and shows a notice linking to `/ja/menu`; it never silently substitutes Japanese. Japanese content continues to display normally. This application checks readiness when rendering; it does not disable MicroCMS's native Publish button. Editors must follow the review workflow to keep both languages complete.

## 5. Backfill existing records and release

Run the audit with Node 24; it makes GET requests only by default:

```sh
pnpm translations:audit --output /tmp/gusto-translation-review.json
```

The JSON report includes published Japanese/English text, status, completeness, and source-match checks. Existing report files are not overwritten. Drafts are inspected by the queue worker using the Management API, so existing unpublished edits are preserved during backfill.

After adding the schema fields and configuring a reachable deployed worker:

```sh
pnpm translations:audit --enqueue
```

This audits first, checks required settings and Management API read access, then enqueues both APIs. Workers prepare **draft English**, including for previously published Japanese-only records. Review all generated translations in MicroCMS and publish them; rerun the audit until `needsAttention` is zero for the intended published records. The script does not automatically approve/publish food translations.

Coordinate the frontend rollout with this backfill: deploying stored-English rendering before approved English is published will show the explicit missing-translation notice on English pages. A staging deployment against a copied CMS environment is recommended for the first end-to-end provider check. An alternative is to activate the translation worker first and switch the public frontend after review.

## 6. Reliability and validation

QStash serializes jobs, including retries, through one queue. Each worker checks the whole current record and metadata before writing; a change during translation discards the result and queues a fresh read. The source fingerprint also prevents stale translations from appearing publicly. The MicroCMS PATCH API does not provide a documented compare-and-swap operation: an editor write in the final read-to-PATCH interval cannot be made atomic by this application. Do not approve/publish while its status is pending. Source changes remain detectable, and reconciliation repairs outdated translations. Operator edits in that tiny interval should be checked in CMS revision history.

Publishing/closing/deleting a record while a job is running is checked through fresh metadata reads. English writes are draft-only; public content is never mutated by the translator. API failures leave the last published version intact. Timeouts may result in another DeepL request on retry, so provider billing is not exactly-once.

```sh
pnpm test:unit
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm exec playwright test tests/e2e/hydration.spec.ts
pnpm exec playwright test --config playwright.translations.config.ts
```

Use the fixture browser suite documented in its Playwright config to verify approved English, missing translations, draft isolation, and language switching without modifying live CMS content. Real provider activation still requires one draft-save → translation → review → publication check using the configured MicroCMS and QStash services.

References: [MicroCMS draft PATCH](https://document.microcms.io/content-api/patch-content), [webhook delivery](https://document.microcms.io/en/manual/webhook-setting), [Management API content metadata](https://document.microcms.io/management-api/get-content), [QStash FIFO queues](https://upstash.com/docs/qstash/features/queues).
