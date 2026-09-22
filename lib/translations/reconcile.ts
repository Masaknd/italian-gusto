import {
  isActive,
  type ContentMetadata,
  type TranslationEndpoint,
  type TranslationJob,
} from './contracts';

export async function reconcilePage(
  endpoint: TranslationEndpoint,
  offset: number,
  dependencies: {
    list: (
      endpoint: TranslationEndpoint,
      offset: number,
    ) => Promise<{ contents: ContentMetadata[]; totalCount: number }>;
    enqueue: (job: TranslationJob) => Promise<unknown>;
  },
) {
  const page = await dependencies.list(endpoint, offset);
  const active = page.contents.filter(isActive);
  // Bounded pages and bounded enqueue concurrency prevent a large reconciliation timing out.
  for (let start = 0; start < active.length; start += 5) {
    await Promise.all(
      active
        .slice(start, start + 5)
        .map((item) =>
          dependencies.enqueue({
            kind: 'translate',
            endpoint,
            contentId: item.id,
          }),
        ),
    );
  }
  const nextOffset = offset + page.contents.length;
  if (page.contents.length && nextOffset < page.totalCount) {
    await dependencies.enqueue({
      kind: 'reconcile',
      endpoint,
      offset: nextOffset,
    });
  }
  return { queued: active.length, nextOffset };
}
