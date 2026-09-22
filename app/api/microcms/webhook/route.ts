import { revalidateMenuContent } from '@/lib/microcms/revalidate';
import {
  verifyMicroCmsSignature,
  webhookJob,
} from '@/lib/translations/webhook';
import { translationQueue } from '@/lib/translations/runtime';

export async function POST(request: Request) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET;
  if (!secret)
    return Response.json(
      { error: 'Webhook is not configured' },
      { status: 503 },
    );
  const body = await request.text();
  if (
    !verifyMicroCmsSignature(
      body,
      request.headers.get('x-microcms-signature'),
      secret,
    )
  ) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let job;
  try {
    job = webhookJob(
      JSON.parse(body),
      process.env.MICROCMS_SERVICE_DOMAIN ?? '',
    );
  } catch {
    return Response.json({ error: 'Invalid webhook' }, { status: 400 });
  }
  revalidateMenuContent();
  if (!job) return Response.json({ queued: false });
  try {
    await translationQueue().enqueue(job);
    return Response.json({ queued: true }, { status: 202 });
  } catch {
    // microCMS does not retry webhooks. Scheduled reconciliation repairs a missed enqueue.
    console.error('Unable to enqueue CMS translation; reconciliation required');
    return Response.json({ error: 'Queue unavailable' }, { status: 503 });
  }
}
