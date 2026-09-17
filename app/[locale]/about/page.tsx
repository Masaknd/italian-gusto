import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPageHero } from '@/components/about-page-hero';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { HomeReservationSection } from '@/components/reservation';
import { HomeSocialSection } from '@/components/social';
import { isLocale } from '@/lib/i18n';
import { getSocialCards } from '@/lib/social-cards';
import { getDictionary } from '@/locales';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getDictionary(locale);

  return {
    title: copy.seo.aboutTitle,
    description: copy.seo.homeDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ja: '/ja/about', en: '/en/about' },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale);
  const socialCards = getSocialCards(copy);

  return (
    <>
      <main className='gusto-home gusto-page'>
        <AboutPageHero copy={copy} />
        <HomeSocialSection copy={copy} socialCards={socialCards} />
        <HomeReservationSection copy={copy} locale={locale} />
        <HomeAccessSection copy={copy} />
      </main>
      <HomeFooter copy={copy} locale={locale} socialCards={socialCards} />
    </>
  );
}
