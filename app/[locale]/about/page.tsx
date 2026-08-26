import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPageHero } from '@/components/about-page-hero';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { HomeReservationSection } from '@/components/reservation';
import { HomeSocialSection } from '@/components/social';
import type { SocialCard } from '@/components/types';
import { isLocale } from '@/lib/i18n';
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
  const socialCards: SocialCard[] = [
    { ...copy.home.social.twitter, icon: 'x' },
    { ...copy.home.social.instagram, icon: 'instagram' },
    { ...copy.home.social.blog, icon: 'drink' },
  ];

  return (
    <>
      <main className="gusto-home gusto-about-page overflow-hidden bg-paper bg-[url(/images/cotton01.jpg)] bg-cover bg-fixed bg-center font-sans text-ink [--coral:var(--color-brand-coral)] [--cream:var(--color-brand-paper)] [--ink:var(--color-brand-ink)]">
        <AboutPageHero copy={copy} />
        <HomeSocialSection copy={copy} socialCards={socialCards} />
        <HomeReservationSection copy={copy} />
        <HomeAccessSection copy={copy} />
      </main>
      <HomeFooter copy={copy} locale={locale} socialCards={socialCards} />
    </>
  );
}
