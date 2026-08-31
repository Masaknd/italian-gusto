import { notFound } from 'next/navigation';
import { HomeAboutSection } from '@/components/about';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { HomeHeroSection } from '@/components/hero';
import { HomeRecommendationsSection } from '@/components/recommendations';
import { HomeReservationSection } from '@/components/reservation';
import { HomeSocialSection } from '@/components/social';
import type { SocialCard } from '@/components/types';
import { HomeWineSection } from '@/components/wine';
import { translateManagedFields } from '@/lib/deepl';
import { homePreviewFeatured } from '@/lib/home-preview-content';
import { isLocale } from '@/lib/i18n';
import { getMenuContentForSite } from '@/lib/microcms/content';
import { getDictionary } from '@/locales';

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
  const copy = getDictionary(locale);
  const socialCards: SocialCard[] = [
    { ...copy.home.social.twitter, icon: 'x' },
    { ...copy.home.social.instagram, icon: 'instagram' },
    { ...copy.home.social.blog, icon: 'drink' },
  ];

  return (
    <>
      <main className='gusto-home gusto-page !overflow-clip'>
        <HomeHeroSection copy={copy} />
        <HomeAboutSection copy={copy} />
        <HomeWineSection copy={copy} locale={locale} />
        <HomeRecommendationsSection
          copy={copy}
          featured={featured}
          locale={locale}
        />
        <HomeSocialSection copy={copy} socialCards={socialCards} />
        <HomeReservationSection copy={copy} />
        <HomeAccessSection copy={copy} />
      </main>
      <HomeFooter copy={copy} locale={locale} socialCards={socialCards} />
    </>
  );
}
