import { sourceHash } from '../translation-source';
import type { CmsTranslationFields } from '../microcms/types';
import type { Snapshot, TranslationEndpoint } from './contracts';

export type TranslationDependencies = {
  read: (endpoint: TranslationEndpoint, id: string) => Promise<Snapshot | null>;
  patchDraft: (
    endpoint: TranslationEndpoint,
    id: string,
    patch: CmsTranslationFields,
  ) => Promise<void>;
  translate: (texts: string[]) => Promise<string[]>;
};

export function needsTranslation(content: Snapshot['content']) {
  return !(
    content.englishStatus?.length === 1 &&
    content.englishSourceHash === sourceHash(content) &&
    ['needs-review', 'approved'].includes(content.englishStatus?.[0] ?? '') &&
    content.nameEn?.trim() &&
    (!content.description || content.descriptionEn?.trim())
  );
}

function revision(snapshot: Snapshot) {
  // Includes English edits and draft identity: source-only checks would overwrite a review.
  return JSON.stringify([snapshot.metadata, snapshot.content]);
}

/** Queue deliveries are serialized. Every delivery reloads current content, never webhook text. */
export async function translateRecord(
  endpoint: TranslationEndpoint,
  id: string,
  dependencies: TranslationDependencies,
) {
  const original = await dependencies.read(endpoint, id);
  if (!original) return { outcome: 'inactive' } as const;
  if (!needsTranslation(original.content))
    return { outcome: 'current' } as const;

  // Do not touch an editor's existing English copy when the source has not changed.
  const latest = await dependencies.read(endpoint, id);
  if (!latest || revision(latest) !== revision(original))
    return { outcome: 'superseded' } as const;
  await dependencies.patchDraft(endpoint, id, { englishStatus: ['pending'] });
  const pending = await dependencies.read(endpoint, id);
  if (
    !pending ||
    sourceHash(pending.content) !== sourceHash(original.content) ||
    pending.content.englishStatus?.length !== 1 ||
    pending.content.englishStatus[0] !== 'pending' ||
    pending.content.nameEn !== original.content.nameEn ||
    pending.content.descriptionEn !== original.content.descriptionEn ||
    pending.content.englishSourceHash !== original.content.englishSourceHash
  )
    return { outcome: 'superseded' } as const;

  const hash = sourceHash(pending.content);
  try {
    const source = [
      pending.content.name,
      ...(pending.content.description ? [pending.content.description] : []),
    ];
    const translated = await dependencies.translate(source);
    if (
      translated.length !== source.length ||
      translated.some((text) => !text.trim())
    ) {
      throw new Error('Translation returned incomplete text');
    }
    const beforeWrite = await dependencies.read(endpoint, id);
    if (!beforeWrite || revision(beforeWrite) !== revision(pending))
      return { outcome: 'superseded' } as const;
    await dependencies.patchDraft(endpoint, id, {
      nameEn: translated[0],
      descriptionEn: translated[1] ?? '',
      englishSourceHash: hash,
      englishStatus: ['needs-review'],
    });
    return { outcome: 'needs-review' } as const;
  } catch (error) {
    const beforeFailure = await dependencies.read(endpoint, id);
    if (beforeFailure && revision(beforeFailure) === revision(pending)) {
      await dependencies.patchDraft(endpoint, id, {
        englishStatus: ['failed'],
      });
    }
    // A non-2xx worker response tells QStash to retry; never mark a failure as translated.
    throw error;
  }
}
