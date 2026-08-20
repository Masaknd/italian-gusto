import { cacheLife, cacheTag } from "next/cache";
import { getMicroCmsClient } from "./client";
import type { FeaturedMenu, Menu } from "./types";

export const CMS_TAG = "gusto-menu-content";
const deterministicSort = <T extends { sortOrder: number; id: string; isAvailable: boolean }>(items: T[]) =>
  items.filter((item) => item.isAvailable).sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));

async function getMenuContent() {
  "use cache";
  cacheLife("hours");
  cacheTag(CMS_TAG);
  const client = getMicroCmsClient();
  if (!client) return { menus: [] as Menu[], featuredMenus: [] as FeaturedMenu[], error: false };
  try {
    const [menus, featuredMenus] = await Promise.all([
      client.getList<Menu>({ endpoint: "menus", queries: { limit: 100 } }),
      client.getList<FeaturedMenu>({ endpoint: "featured-menus", queries: { limit: 100 } }),
    ]);
    return { menus: deterministicSort(menus.contents), featuredMenus: deterministicSort(featuredMenus.contents).slice(0, 5), error: false };
  } catch (error) {
    console.error("microCMS menu request failed", error instanceof Error ? error.message : error);
    return { menus: [] as Menu[], featuredMenus: [] as FeaturedMenu[], error: true };
  }
}

export async function getMenuContentForSite() { return getMenuContent(); }
