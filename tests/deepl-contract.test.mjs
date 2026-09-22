import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildTranslationBatches,
  isTranslationBatchWithinLimit,
  requestDeepLTranslation,
} from '../lib/deepl-request.ts';

test('DeepL request declares and sends JSON with ordered text', async () => {
  let received;
  const translated = await requestDeepLTranslation(
    ['料理', 'ワイン'],
    'test-key:fx',
    async (url, options) => {
      received = { url, options };
      return new Response(
        JSON.stringify({ translations: [{ text: 'Food' }, { text: 'Wine' }] }),
        { status: 200 },
      );
    },
  );
  assert.equal(received.url, 'https://api-free.deepl.com/v2/translate');
  assert.equal(received.options.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(received.options.body), {
    text: ['料理', 'ワイン'],
    target_lang: 'EN',
    source_lang: 'JA',
  });
  assert.deepEqual(translated, ['Food', 'Wine']);
});

test('large requests are batched within the provider body limit', () => {
  const batches = buildTranslationBatches(
    Array.from({ length: 120 }, (_, index) => `料理${index}`),
  );
  assert.ok(batches.length > 1);
  assert.deepEqual(
    batches.flat(),
    Array.from({ length: 120 }, (_, index) => `料理${index}`),
  );
  assert.ok(batches.every(isTranslationBatchWithinLimit));
});

test('upstream errors reject instead of returning source text as a translation', async () => {
  await assert.rejects(
    requestDeepLTranslation(
      ['料理'],
      'test-key:fx',
      async () => new Response('Unavailable', { status: 503 }),
    ),
    /DeepL responded 503/,
  );
});
