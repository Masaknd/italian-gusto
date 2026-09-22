import { defineConfig, devices } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// This opt-in applies only to this config; default/live-CMS tests skip the fixture suite.
process.env.GUSTO_TRANSLATION_FIXTURES = '1';
const preload = pathToFileURL(resolve('tests/fixtures/cms-fetch.mjs')).href;

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'translations.spec.ts',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 15_000 },
  outputDir: 'test-results/translations',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm exec next dev --port 3100',
    url: 'http://127.0.0.1:3100/ja/menu',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      GUSTO_TRANSLATION_FIXTURES: '1',
      GUSTO_TEST_DIST_DIR: '.next-translations',
      NODE_OPTIONS:
        `${process.env.NODE_OPTIONS ?? ''} --import=${preload}`.trim(),
      MICROCMS_SERVICE_DOMAIN: 'gusto-fixture',
      MICROCMS_API_KEY: 'fixture-read-key',
      REVALIDATE_SECRET: 'fixture-preview-secret',
      MICROCMS_WEBHOOK_SECRET: 'fixture-webhook-secret',
      TRANSLATION_SITE_URL: 'https://gusto-fixture.invalid',
      QSTASH_CURRENT_SIGNING_KEY: 'fixture-current-signing-key',
      QSTASH_NEXT_SIGNING_KEY: 'fixture-next-signing-key',
      QSTASH_TOKEN: '',
      MICROCMS_TRANSLATION_API_KEY: '',
      CRON_SECRET: 'fixture-cron-secret',
      DEEPL_API_KEY: 'fixture-no-runtime-translations',
    },
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
      },
    },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
