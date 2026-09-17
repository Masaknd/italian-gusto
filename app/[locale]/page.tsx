import { notFound } from 'next/navigation';
import { HomeAboutSection } from '@/components/about';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { HomeHeroSection } from '@/components/hero';
import { HomeRecommendationsSection } from '@/components/recommendations';
import { HomeReservationSection } from '@/components/reservation';
import { HomeSocialSection } from '@/components/social';
import { HomeWineSection } from '@/components/wine';
import { translateManagedFields } from '@/lib/deepl';
import { isLocale } from '@/lib/i18n';
import { getSocialCards } from '@/lib/social-cards';
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
  const featured = cmsFeatured;
  const copy = getDictionary(locale);
  const socialCards = getSocialCards(copy);

  return (
    <>
      <main className='gusto-home gusto-page !overflow-clip'>
        <HomeHeroSection copy={copy} locale={locale} />
        <HomeAboutSection copy={copy} locale={locale} />
        <HomeWineSection copy={copy} locale={locale} />
        <HomeRecommendationsSection
          copy={copy}
          featured={featured}
          locale={locale}
        />
        <HomeSocialSection
          copy={copy}
          socialCards={socialCards}
          locale={locale}
        />
        <HomeReservationSection copy={copy} locale={locale} />
        <HomeAccessSection copy={copy} locale={locale} />
      </main>
      <HomeFooter copy={copy} locale={locale} socialCards={socialCards} />
    </>
  );
}
