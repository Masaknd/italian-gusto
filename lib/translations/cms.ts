import type { CmsTranslationFields } from '../microcms/types';
import {
  isActive,
  type ContentMetadata,
  type Snapshot,
  type TranslationEndpoint,
  type TranslationRecord,
} from './contracts';

export type CmsTranslationConfig = { serviceDomain: string; apiKey: string };

export function createTranslationCms(
  config: CmsTranslationConfig,
  fetcher: typeof fetch = fetch,
) {
  if (!/^[a-z0-9-]+$/.test(config.serviceDomain) || !config.apiKey)
    throw new Error('Invalid translation CMS configuration');
  async function request<T>(
    path: string,
    management: boolean,
    options?: RequestInit,
  ): Promise<T | null> {
    const host = management ? 'microcms-management.io' : 'microcms.io';
    const response = await fetcher(
      `https://${config.serviceDomain}.${host}/api/v1/${path}`,
      {
        ...options,
        headers: {
          'X-MICROCMS-API-KEY': config.apiKey,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      },
    );
    if (response.status === 404) return null;
    if (!response.ok)
      throw new Error(`microCMS translation API responded ${response.status}`);
    return response.json() as Promise<T>;
  }
  return {
    async read(
      endpoint: TranslationEndpoint,
      id: string,
    ): Promise<Snapshot | null> {
      const path = `${endpoint}/${encodeURIComponent(id)}`;
      const metadata = await request<ContentMetadata>(`contents/${path}`, true);
      if (!metadata || !isActive(metadata)) return null;
      if (
        metadata.status.some(
          (s) => s === 'DRAFT' || s === 'PUBLISH_AND_DRAFT',
        ) &&
        !metadata.draftKey
      ) {
        throw new Error('microCMS draft metadata is missing a draft key');
      }
      const query = metadata.draftKey
        ? `?draftKey=${encodeURIComponent(metadata.draftKey)}`
        : '';
      const content = await request<TranslationRecord>(
        `${path}${query}`,
        false,
      );
      if (!content) return null;
      if (
        typeof content.name !== 'string' ||
        typeof content.updatedAt !== 'string' ||
        (content.description != null && typeof content.description !== 'string')
      ) {
        throw new Error('Invalid Japanese CMS source');
      }
      return { metadata, content };
    },
    async patchDraft(
      endpoint: TranslationEndpoint,
      id: string,
      patch: CmsTranslationFields,
    ) {
      const result = await request(
        `${endpoint}/${encodeURIComponent(id)}?status=draft`,
        false,
        {
          method: 'PATCH',
          body: JSON.stringify(patch),
        },
      );
      if (!result)
        throw new Error('Content disappeared before saving translation');
    },
    async list(endpoint: TranslationEndpoint, offset = 0) {
      const result = await request<{
        contents: ContentMetadata[];
        totalCount: number;
      }>(`contents/${endpoint}?limit=100&offset=${offset}`, true);
      if (!result) throw new Error('CMS endpoint does not exist');
      return result;
    },
  };
}
