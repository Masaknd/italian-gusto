export type CmsImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};
export type Menu = {
  id: string;
  name: string;
  category: string;
  categoryLabel?: string;
  priceExcludingTax: number;
  description?: string;
  image?: CmsImage;
  sortOrder: number;
  isAvailable: boolean;
};
export type EnglishStatus = 'pending' | 'needs-review' | 'approved' | 'failed';
export type CmsTranslationFields = {
  nameEn?: string;
  descriptionEn?: string;
  englishStatus?: EnglishStatus[];
  englishSourceHash?: string;
};
export type CmsMenu = Omit<Menu, 'category' | 'categoryLabel'> &
  CmsTranslationFields & { category: string[] };
export type FeaturedMenu = {
  id: string;
  name: string;
  description?: string;
  image: CmsImage;
  menuCategory?: string;
  sortOrder: number;
  isAvailable: boolean;
};
export type CmsFeaturedMenu = Omit<FeaturedMenu, 'menuCategory'> &
  CmsTranslationFields & { menuCategory?: string[] | string };
