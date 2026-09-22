import type { CmsTranslationFields } from '../microcms/types';

export const translationEndpoints = ['menus', 'featured-menus'] as const;
export type TranslationEndpoint = (typeof translationEndpoints)[number];
export type TranslationRecord = CmsTranslationFields & {
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
};
export type ContentMetadata = {
  id: string;
  status: string[];
  draftKey: string | null;
  updatedAt: string;
};
export type Snapshot = {
  metadata: ContentMetadata;
  content: TranslationRecord;
};
export type TranslationJob =
  | { kind: 'translate'; endpoint: TranslationEndpoint; contentId: string }
  | { kind: 'reconcile'; endpoint: TranslationEndpoint; offset: number };

export function isTranslationEndpoint(
  value: unknown,
): value is TranslationEndpoint {
  return value === 'menus' || value === 'featured-menus';
}

export function parseJob(value: unknown): TranslationJob {
  if (!value || typeof value !== 'object') throw new Error('Invalid job');
  const job = value as Record<string, unknown>;
  if (!isTranslationEndpoint(job.endpoint)) throw new Error('Invalid endpoint');
  if (
    job.kind === 'translate' &&
    typeof job.contentId === 'string' &&
    /^[a-zA-Z0-9_-]{1,100}$/.test(job.contentId)
  ) {
    return {
      kind: 'translate',
      endpoint: job.endpoint,
      contentId: job.contentId,
    };
  }
  if (
    job.kind === 'reconcile' &&
    Number.isSafeInteger(job.offset) &&
    Number(job.offset) >= 0
  ) {
    return {
      kind: 'reconcile',
      endpoint: job.endpoint,
      offset: Number(job.offset),
    };
  }
  throw new Error('Invalid job');
}

export function isActive(metadata: ContentMetadata) {
  return (
    metadata.status.some((status) =>
      ['PUBLISH', 'DRAFT', 'PUBLISH_AND_DRAFT'].includes(status),
    ) && !metadata.status.includes('CLOSED')
  );
}
