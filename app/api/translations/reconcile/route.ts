import { timingSafeEqual } from 'node:crypto';
import { translationEndpoints } from '@/lib/translations/contracts';
import { translationQueue } from '@/lib/translations/runtime';

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : '';
  const actual = request.headers.get('authorization') ?? '';
  if (
    !expected ||
    Buffer.byteLength(expected) !== Buffer.byteLength(actual) ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))
  ) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const queue = translationQueue();
    for (const endpoint of translationEndpoints)
      await queue.enqueue({ kind: 'reconcile', endpoint, offset: 0 });
    return Response.json({ queued: true }, { status: 202 });
  } catch {
    console.error('Translation reconciliation enqueue failed');
    return Response.json({ error: 'Queue unavailable' }, { status: 503 });
  }
}
