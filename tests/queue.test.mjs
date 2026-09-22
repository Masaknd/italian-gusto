import '../scripts/register-ts.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash, createHmac } from 'node:crypto';
const { createTranslationQueue, verifyQueueSignature } =
  await import('../lib/translations/queue.ts');
const { reconcilePage } = await import('../lib/translations/reconcile.ts');

function sign(body, url, key, overrides = {}) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      iss: 'Upstash',
      sub: url,
      exp: now + 60,
      nbf: now - 1,
      body: createHash('sha256').update(body).digest('base64url'),
      ...overrides,
    }),
  ).toString('base64url');
  const unsigned = `${header}.${payload}`;
  return `${unsigned}.${createHmac('sha256', key).update(unsigned).digest('base64url')}`;
}

test('QStash delivery verifies body, destination, expiry and rotated signing keys', async () => {
  const body = JSON.stringify({
    kind: 'translate',
    endpoint: 'menus',
    contentId: 'pasta',
  });
  const url = 'https://example.com/api/translations/process';
  const current = 'test-current-signing-key';
  const next = 'test-next-signing-key';
  for (const key of [current, next])
    assert.equal(
      await verifyQueueSignature(
        body,
        sign(body, url, key),
        url,
        current,
        next,
      ),
      true,
    );
  assert.equal(
    await verifyQueueSignature(
      body + ' ',
      sign(body, url, current),
      url,
      current,
      next,
    ),
    false,
  );
  assert.equal(
    await verifyQueueSignature(
      body,
      sign(body, url + '/wrong', current),
      url,
      current,
      next,
    ),
    false,
  );
  assert.equal(
    await verifyQueueSignature(
      body,
      sign(body, url, current, { exp: 1 }),
      url,
      current,
      next,
    ),
    false,
  );
  assert.equal(
    await verifyQueueSignature(body, null, url, current, next),
    false,
  );
  assert.equal(
    await verifyQueueSignature(body, sign(body, url, current), url, '', ''),
    false,
  );
});

test('queue enforces FIFO parallelism and retry delivery without including credentials in jobs', async () => {
  const original = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, options) => {
    const request = new Request(input, options);
    requests.push({
      url: request.url,
      headers: request.headers,
      body: await request.text(),
    });
    return Response.json(
      request.url.includes('/enqueue/') ? { messageId: 'test-message' } : {},
    );
  };
  try {
    const queue = createTranslationQueue({
      token: 'queue-secret',
      baseUrl: 'https://queue.example',
      destination: 'https://site.example/api/translations/process',
      queueName: 'test-translations',
    });
    const job = { kind: 'translate', endpoint: 'menus', contentId: 'dish-1' };
    await queue.enqueue(job);
    assert.equal(requests.length, 2);
    assert.equal(JSON.parse(requests[0].body).parallelism, 1);
    assert.match(requests[1].url, /enqueue\/test-translations/);
    assert.equal(requests[1].headers.get('upstash-retries'), '3');
    assert.deepEqual(JSON.parse(requests[1].body), job);
    assert.ok(!requests[1].body.includes('queue-secret'));
  } finally {
    globalThis.fetch = original;
  }
});

test('reconciliation queues active records and a bounded continuation, omits closed records', async () => {
  const jobs = [];
  const result = await reconcilePage('menus', 0, {
    list: async () => ({
      totalCount: 4,
      contents: [
        { id: 'published', status: ['PUBLISH'] },
        { id: 'draft', status: ['DRAFT'] },
        { id: 'closed', status: ['CLOSED'] },
      ],
    }),
    enqueue: async (job) => jobs.push(job),
  });
  assert.deepEqual(jobs, [
    { kind: 'translate', endpoint: 'menus', contentId: 'published' },
    { kind: 'translate', endpoint: 'menus', contentId: 'draft' },
    { kind: 'reconcile', endpoint: 'menus', offset: 3 },
  ]);
  assert.deepEqual(result, { queued: 2, nextOffset: 3 });
});

test('failed reconciliation enqueue rejects so durable delivery can retry the page', async () => {
  await assert.rejects(
    reconcilePage('featured-menus', 0, {
      list: async () => ({
        totalCount: 1,
        contents: [{ id: 'dish', status: ['DRAFT'] }],
      }),
      enqueue: async () => {
        throw new Error('Queue temporarily unavailable');
      },
    }),
    /Queue temporarily unavailable/,
  );
});
