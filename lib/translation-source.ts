import { createHash } from 'node:crypto';

/** Fingerprint only the exact Japanese text; shared price/image changes need no translation. */
export function sourceHash(item: { name: string; description?: string }) {
  return createHash('sha256')
    .update(JSON.stringify([item.name, item.description ?? '']))
    .digest('hex');
}
