import type { Locale } from '../i18n';
import { sourceHash } from '../translation-source';
import type {
  CmsFeaturedMenu,
  CmsImage,
  CmsMenu,
  CmsTranslationFields,
  FeaturedMenu,
  Menu,
} from './types';

type CategoryLabels = Readonly<Record<string, string>> & {
  readonly other: string;
};
type ManagedText = {
  name: string;
  description?: string;
} & CmsTranslationFields;
type PreviewTarget = { endpoint: 'menus' | 'featured-menus'; id: string };

function localizedText(item: ManagedText, locale: Locale, isDraft: boolean) {
  if (locale === 'ja')
    return { name: item.name, description: item.description };
  const status = item.englishStatus;
  const ready =
    status?.length === 1 &&
    (status[0] === 'approved' || (isDraft && status[0] === 'needs-review'));
  if (
    !ready ||
    item.englishSourceHash !== sourceHash(item) ||
    !item.nameEn?.trim() ||
    (item.description?.trim() && !item.descriptionEn?.trim())
  )
    return null;
  return {
    name: item.nameEn,
    description: item.description?.trim() ? item.descriptionEn : undefined,
  };
}

function localizedImage(
  image: CmsImage,
  locale: Locale,
  name: string,
): CmsImage {
  return {
    url: image.url,
    width: image.width,
    height: image.height,
    alt: locale === 'en' ? name : image.alt,
  };
}

/** Explicit projections keep Japanese copy and translation bookkeeping out of English client props. */
export function localizeMenu(
  item: CmsMenu,
  locale: Locale,
  labels: CategoryLabels,
  isDraft = false,
): Menu | null {
  const text = localizedText(item, locale, isDraft);
  if (!text) return null;
  const category = item.category[0] ?? '';
  return {
    id: item.id,
    ...text,
    category,
    categoryLabel:
      labels[category.toLowerCase()] ??
      (locale === 'ja' ? category : labels.other),
    priceExcludingTax: item.priceExcludingTax,
    image: item.image
      ? localizedImage(item.image, locale, text.name)
      : undefined,
    sortOrder: item.sortOrder,
    isAvailable: item.isAvailable,
  };
}

export function localizeFeaturedMenu(
  item: CmsFeaturedMenu,
  locale: Locale,
  isDraft = false,
): FeaturedMenu | null {
  const text = localizedText(item, locale, isDraft);
  if (!text) return null;
  return {
    id: item.id,
    ...text,
    image: localizedImage(item.image, locale, text.name),
    menuCategory: Array.isArray(item.menuCategory)
      ? item.menuCategory[0]
      : item.menuCategory,
    sortOrder: item.sortOrder,
    isAvailable: item.isAvailable,
  };
}

export function localizeMenuContent(
  content: { menus: CmsMenu[]; featuredMenus: CmsFeaturedMenu[] },
  locale: Locale = 'ja',
  categoryLabels: CategoryLabels,
  previewTarget?: PreviewTarget,
) {
  const menus = content.menus
    .map((item) =>
      localizeMenu(
        item,
        locale,
        categoryLabels,
        previewTarget?.endpoint === 'menus' && previewTarget.id === item.id,
      ),
    )
    .filter((item): item is Menu => item !== null);
  const featuredMenus = content.featuredMenus
    .map((item) =>
      localizeFeaturedMenu(
        item,
        locale,
        previewTarget?.endpoint === 'featured-menus' &&
          previewTarget.id === item.id,
      ),
    )
    .filter((item): item is FeaturedMenu => item !== null);
  return {
    menus,
    featuredMenus: featuredMenus.slice(0, 5),
    omittedMenus: content.menus.length - menus.length,
    omittedFeaturedMenus: content.featuredMenus.length - featuredMenus.length,
  };
}
