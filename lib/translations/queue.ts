import { Client, Receiver } from '@upstash/qstash';
import type { TranslationJob } from './contracts';

export type QueueConfig = {
  token: string;
  baseUrl?: string;
  destination: string;
  queueName: string;
};

/** A single FIFO queue is sufficient for this menu and serializes writes across all instances. */
export function createTranslationQueue(config: QueueConfig) {
  const client = new Client({ token: config.token, baseUrl: config.baseUrl });
  const queue = client.queue({ queueName: config.queueName });
  return {
    async enqueue(job: TranslationJob) {
      // Enforce ordering even if a queue was previously configured with higher parallelism.
      await queue.upsert({ parallelism: 1 });
      return queue.enqueueJSON({
        url: config.destination,
        body: job,
        retries: 3,
      });
    },
  };
}

export async function verifyQueueSignature(
  body: string,
  signature: string | null,
  url: string,
  currentSigningKey: string,
  nextSigningKey: string,
) {
  if (!signature || !currentSigningKey || !nextSigningKey) return false;
  try {
    return await new Receiver({
      currentSigningKey,
      nextSigningKey,
      devMode: false,
    }).verify({ body, signature, url });
  } catch {
    return false;
  }
}
