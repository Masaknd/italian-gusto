import { parseJob } from '@/lib/translations/contracts';
import { verifyQueueSignature } from '@/lib/translations/queue';
import { reconcilePage } from '@/lib/translations/reconcile';
import {
  requireSetting,
  translationDestination,
  translationCms,
  translationQueue,
  translateJapanese,
} from '@/lib/translations/runtime';
import { translateRecord } from '@/lib/translations/worker';

export const maxDuration = 120;

export async function POST(request: Request) {
  const body = await request.text();
  let verified = false;
  try {
    verified = await verifyQueueSignature(
      body,
      request.headers.get('upstash-signature'),
      translationDestination(),
      requireSetting('QSTASH_CURRENT_SIGNING_KEY'),
      requireSetting('QSTASH_NEXT_SIGNING_KEY'),
    );
  } catch {
    return Response.json(
      { error: 'Worker is not configured' },
      { status: 503 },
    );
  }
  if (!verified)
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  let job;
  try {
    job = parseJob(JSON.parse(body));
  } catch {
    return Response.json({ error: 'Invalid job' }, { status: 400 });
  }
  try {
    const cms = translationCms();
    if (job.kind === 'reconcile') {
      const queue = translationQueue();
      return Response.json(
        await reconcilePage(job.endpoint, job.offset, {
          list: cms.list,
          enqueue: queue.enqueue,
        }),
      );
    }
    requireSetting('DEEPL_API_KEY');
    const result = await translateRecord(job.endpoint, job.contentId, {
      ...cms,
      translate: translateJapanese,
    });
    // An editor changed the draft while translation ran; reread it in a later serialized job.
    if (result.outcome === 'superseded') await translationQueue().enqueue(job);
    return Response.json(result);
  } catch {
    console.error('Translation job failed', {
      endpoint: job.endpoint,
      kind: job.kind,
    });
    return Response.json(
      { error: 'Translation job failed; retry required' },
      { status: 503 },
    );
  }
}
