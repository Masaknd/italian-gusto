export type CmsImage = { url: string; width?: number; height?: number; alt?: string };
export type Menu = {
  id: string; name: string; category: string; priceExcludingTax: number;
  description?: string; image?: CmsImage; sortOrder: number; isAvailable: boolean;
};
export type FeaturedMenu = {
  id: string; name: string; description?: string; image: CmsImage;
  sortOrder: number; isAvailable: boolean;
};
export type Translated<T extends { name: string; description?: string }> = T & { name: string; description?: string };
