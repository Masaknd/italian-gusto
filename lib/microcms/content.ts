import 'server-only';
import { cacheLife, cacheTag } from 'next/cache';
import { cookies, draftMode } from 'next/headers';
import { getMicroCmsClient } from './client';
import type { CmsMenu, CmsFeaturedMenu } from './types';
import type { Locale } from '../i18n';
import { getDictionary } from '@/locales';
import { localizeMenuContent } from './localization';

export const CMS_TAG = 'gusto-menu-content';
export const CMS_ENDPOINTS = ['menus', 'featured-menus'] as const;
export type CmsEndpoint = (typeof CMS_ENDPOINTS)[number];

export function isCmsEndpoint(value: string | undefined): value is CmsEndpoint {
  return CMS_ENDPOINTS.some((endpoint) => endpoint === value);
}

const deterministicSort = <
  T extends { sortOrder: number; id: string; isAvailable: boolean },
>(
  items: T[],
) =>
  items
    .filter((item) => item.isAvailable)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));

async function getAllPublished<T>(endpoint: CmsEndpoint) {
  const client = getMicroCmsClient();
  if (!client) return [] as T[];
  const contents: T[] = [];
  const limit = 100;
  for (let offset = 0; ; offset += limit) {
    const page = await client.getList<T>({
      endpoint,
      queries: { limit, offset },
    });
    contents.push(...page.contents);
    if (contents.length >= page.totalCount || page.contents.length < limit)
      break;
  }
  return contents;
}

async function getPublishedMenus() {
  'use cache';
  cacheLife({ stale: 60, revalidate: 300, expire: 86400 });
  cacheTag(CMS_TAG);
  return deterministicSort(await getAllPublished<CmsMenu>('menus'));
}

async function getPublishedFeatured() {
  'use cache';
  cacheLife({ stale: 60, revalidate: 300, expire: 86400 });
  cacheTag(CMS_TAG);
  return deterministicSort(
    await getAllPublished<CmsFeaturedMenu>('featured-menus'),
  );
}

async function getMenuContent() {
  const [menus, featuredMenus] = await Promise.allSettled([
    getPublishedMenus(),
    getPublishedFeatured(),
  ]);
  for (const [endpoint, result] of [
    ['menus', menus],
    ['featured-menus', featuredMenus],
  ] as const) {
    if (result.status === 'rejected') {
      console.error(
        `microCMS ${endpoint} request failed`,
        result.reason instanceof Error ? result.reason.message : result.reason,
      );
    }
  }
  return {
    menus: menus.status === 'fulfilled' ? menus.value : ([] as CmsMenu[]),
    featuredMenus:
      featuredMenus.status === 'fulfilled'
        ? featuredMenus.value
        : ([] as CmsFeaturedMenu[]),
    error: menus.status === 'rejected' || featuredMenus.status === 'rejected',
  };
}

async function getRawMenuContentForSite() {
  const content = await getMenuContent();
  const draft = await draftMode();

  if (!draft.isEnabled)
    return { ...content, isPreview: false, previewTarget: undefined };

  const jar = await cookies();
  const draftKey = jar.get('microcms-draft-key')?.value;
  const contentId = jar.get('microcms-draft-id')?.value;
  const endpoint = jar.get('microcms-draft-endpoint')?.value;
  const client = getMicroCmsClient();

  if (!draftKey || !contentId || !isCmsEndpoint(endpoint) || !client) {
    return { ...content, isPreview: true, previewTarget: undefined };
  }

  try {
    if (endpoint === 'menus') {
      const draftMenu = await client.getListDetail<CmsMenu>({
        endpoint,
        contentId,
        queries: { draftKey },
      });
      const menus = content.menus.filter((menu) => menu.id !== draftMenu.id);
      return {
        ...content,
        menus: deterministicSort([...menus, draftMenu]),
        previewTarget: { endpoint: 'menus' as const, id: draftMenu.id },
        isPreview: true,
      };
    }

    const draftFeaturedMenu = await client.getListDetail<CmsFeaturedMenu>({
      endpoint,
      contentId,
      queries: { draftKey },
    });
    const featuredMenus = content.featuredMenus.filter(
      (menu) => menu.id !== draftFeaturedMenu.id,
    );
    return {
      ...content,
      featuredMenus: deterministicSort([...featuredMenus, draftFeaturedMenu]),
      previewTarget: {
        endpoint: 'featured-menus' as const,
        id: draftFeaturedMenu.id,
      },
      isPreview: true,
    };
  } catch (error) {
    console.error(
      'microCMS draft request failed',
      error instanceof Error ? error.message : error,
    );
    return {
      ...content,
      error: true,
      isPreview: true,
      previewTarget: undefined,
    };
  }
}

/** Select stored locale fields after draft replacement, never translating in the request path. */
export async function getMenuContentForSite(locale: Locale = 'ja') {
  const content = await getRawMenuContentForSite();
  return {
    ...localizeMenuContent(
      content,
      locale,
      getDictionary(locale).menu.categories,
      content.previewTarget,
    ),
    error: content.error,
    isPreview: content.isPreview,
  };
}
