import { notFound } from 'next/navigation';
import { HomeGusto } from '@/components/home-page';
import { translateManagedFields } from '@/lib/deepl';
import { homePreviewFeatured } from '@/lib/home-preview-content';
import { isLocale } from '@/lib/i18n';
import { getMenuContentForSite } from '@/lib/microcms/content';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getMenuContentForSite();
  const cmsFeatured =
    locale === 'en'
      ? await translateManagedFields(content.featuredMenus)
      : content.featuredMenus;
  const featured =
    content.isPreview || cmsFeatured.length >= 3
      ? cmsFeatured
      : homePreviewFeatured;
  return <HomeGusto locale={locale} featured={featured} />;
}
