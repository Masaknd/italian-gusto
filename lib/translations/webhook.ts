import { createHmac, timingSafeEqual } from 'node:crypto';
import { sourceHash } from '../translation-source';
import type { CmsTranslationFields } from '../microcms/types';
import {
  isTranslationEndpoint,
  parseJob,
  type TranslationJob,
} from './contracts';

type WebhookContent = {
  status?: string[];
  draftValue?:
    ({ name?: string; description?: string } & CmsTranslationFields) | null;
  publishValue?:
    ({ name?: string; description?: string } & CmsTranslationFields) | null;
};

export function verifyMicroCmsSignature(
  body: string,
  signature: string | null,
  secret: string,
) {
  if (!secret || !signature || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  return timingSafeEqual(
    Buffer.from(signature, 'hex'),
    createHmac('sha256', secret).update(body).digest(),
  );
}

export function webhookJob(
  payload: unknown,
  serviceDomain: string,
): TranslationJob | null {
  if (!payload || typeof payload !== 'object')
    throw new Error('Invalid webhook');
  const event = payload as {
    service?: string;
    api?: string;
    id?: string;
    contents?: { old?: WebhookContent | null; new?: WebhookContent | null };
  };
  if (event.service !== serviceDomain || !isTranslationEndpoint(event.api))
    throw new Error('Unexpected CMS service or endpoint');
  if (!event.contents) throw new Error('Missing webhook content');
  const current = event.contents.new;
  if (!current || current.status?.includes('CLOSED')) return null;
  const source = current.draftValue ?? current.publishValue;
  if (!source || typeof source.name !== 'string') return null;
  const previous =
    event.contents.old?.draftValue ?? event.contents.old?.publishValue;
  // A newly saved draft also needs translation when it inherits untranslated published text.
  // Ignore the pending draft created by the worker itself.
  const newUntranslatedDraft =
    current.draftValue &&
    !event.contents.old?.draftValue &&
    current.draftValue.englishStatus?.[0] !== 'pending' &&
    (!current.draftValue.nameEn?.trim() ||
      (current.draftValue.description &&
        !current.draftValue.descriptionEn?.trim()) ||
      current.draftValue.englishSourceHash !==
        sourceHash({ name: source.name, description: source.description }));
  // Translation/status/review-only writes do not enqueue another translation.
  if (
    !newUntranslatedDraft &&
    previous &&
    typeof previous.name === 'string' &&
    sourceHash({ name: previous.name, description: previous.description }) ===
      sourceHash({ name: source.name, description: source.description })
  )
    return null;
  return parseJob({
    kind: 'translate',
    endpoint: event.api,
    contentId: event.id,
  });
}
