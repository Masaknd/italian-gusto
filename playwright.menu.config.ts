import { defineConfig } from '@playwright/test';
import translationConfig from './playwright.translations.config';

const fixtureServer = translationConfig.webServer;
if (!fixtureServer || Array.isArray(fixtureServer)) {
  throw new Error('Drink menu tests require the single CMS fixture server');
}

export default defineConfig({
  ...translationConfig,
  testMatch: 'drink-groups.spec.ts',
  outputDir: 'test-results/menu',
  webServer: {
    ...fixtureServer,
    env: {
      ...fixtureServer.env,
      GUSTO_DRINK_FIXTURES: '1',
    },
  },
});
