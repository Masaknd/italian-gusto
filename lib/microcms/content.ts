import { cacheLife, cacheTag } from 'next/cache';
import { cookies, draftMode } from 'next/headers';
import { getMicroCmsClient } from './client';
import type { CmsMenu, FeaturedMenu, Menu } from './types';

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

const normalizeCmsMenu = ({ category, ...menu }: CmsMenu): Menu => ({
  ...menu,
  category: category[0] ?? '',
});

async function getMenuContent() {
  'use cache';
  cacheLife('hours');
  cacheTag(CMS_TAG);
  const client = getMicroCmsClient();
  if (!client)
    return {
      menus: [] as Menu[],
      featuredMenus: [] as FeaturedMenu[],
      error: false,
    };
  try {
    const [menus, featuredMenus] = await Promise.all([
      client.getList<CmsMenu>({ endpoint: 'menus', queries: { limit: 100 } }),
      client.getList<FeaturedMenu>({
        endpoint: 'featured-menus',
        queries: { limit: 100 },
      }),
    ]);
    return {
      menus: deterministicSort(menus.contents.map(normalizeCmsMenu)),
      featuredMenus: deterministicSort(featuredMenus.contents).slice(0, 5),
      error: false,
    };
  } catch (error) {
    console.error(
      'microCMS menu request failed',
      error instanceof Error ? error.message : error,
    );
    return {
      menus: [] as Menu[],
      featuredMenus: [] as FeaturedMenu[],
      error: true,
    };
  }
}

export async function getMenuContentForSite() {
  const content = await getMenuContent();
  const draft = await draftMode();

  if (!draft.isEnabled) return { ...content, isPreview: false };

  const jar = await cookies();
  const draftKey = jar.get('microcms-draft-key')?.value;
  const contentId = jar.get('microcms-draft-id')?.value;
  const endpoint = jar.get('microcms-draft-endpoint')?.value;
  const client = getMicroCmsClient();

  if (!draftKey || !contentId || !isCmsEndpoint(endpoint) || !client) {
    return { ...content, isPreview: true };
  }

  try {
    if (endpoint === 'menus') {
      const draftMenu = normalizeCmsMenu(
        await client.getListDetail<CmsMenu>({
          endpoint,
          contentId,
          queries: { draftKey },
        }),
      );
      const menus = content.menus.filter((menu) => menu.id !== draftMenu.id);
      return {
        ...content,
        menus: deterministicSort([...menus, draftMenu]),
        isPreview: true,
      };
    }

    const draftFeaturedMenu = await client.getListDetail<FeaturedMenu>({
      endpoint,
      contentId,
      queries: { draftKey },
    });
    const featuredMenus = content.featuredMenus.filter(
      (menu) => menu.id !== draftFeaturedMenu.id,
    );
    return {
      ...content,
      featuredMenus: deterministicSort([
        ...featuredMenus,
        draftFeaturedMenu,
      ]).slice(0, 5),
      isPreview: true,
    };
  } catch (error) {
    console.error(
      'microCMS draft request failed',
      error instanceof Error ? error.message : error,
    );
    return { ...content, error: true, isPreview: true };
  }
}
