import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { MenuList } from '@/components/menu-list';
import { HomeReservationSection } from '@/components/reservation';
import { HomeSocialSection } from '@/components/social';
import type { SocialCard } from '@/components/types';
import { translateManagedFields } from '@/lib/deepl';
import { isLocale } from '@/lib/i18n';
import { getMenuContentForSite } from '@/lib/microcms/content';
import { getDictionary } from '@/locales';
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: d.seo.menuTitle,
    alternates: {
      canonical: `/${locale}/menu`,
      languages: { ja: '/ja/menu', en: '/en/menu' },
    },
  };
}
export default async function MenuPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const content = await getMenuContentForSite();
  const menus =
    locale === 'en'
      ? await translateManagedFields(content.menus)
      : content.menus;
  const socialCards: SocialCard[] = [
    { ...d.home.social.twitter, icon: 'x' },
    { ...d.home.social.instagram, icon: 'instagram' },
    { ...d.home.social.blog, icon: 'drink' },
  ];

  return (
    <>
      <main className='gusto-home gusto-page'>
        <section
          className='relative w-full overflow-hidden text-ink'
          aria-labelledby='gusto-menu-title'
        >
          <div className='flex w-full flex-col items-start gap-6 px-4 pb-[50px] sm:gap-[46px] sm:px-6 sm:pb-50 xl:px-24 3xl:px-60'>
            <h1
              id='gusto-menu-title'
              className='gusto-menu__title m-0 box-border inline-flex h-10 w-[203px] items-end border-b-[3px] border-dashed border-coral font-display font-normal whitespace-nowrap text-coral sm:h-[60px] sm:w-[261px] xl:h-[88px] xl:w-[385px]'
            >
              <span
                className='gusto-menu__title-prefix text-2xl leading-[30px] tracking-[-0.3em] sm:text-[32px] sm:leading-10 xl:text-5xl xl:leading-15'
                aria-hidden='true'
              >
                {d.menu.titlePrefix}
              </span>
              <span
                className='gusto-menu__title-main text-[40px] leading-12 tracking-[-0.25em] sm:text-[52px] sm:leading-[62px] xl:text-[80px] xl:leading-24'
                aria-hidden='true'
              >
                {d.menu.titleMain}
              </span>
              <span className='sr-only'>{d.menu.title}</span>
            </h1>
            {content.error ? (
              <p className='m-0 text-muted' role='status'>
                {d.errors.dynamic}
              </p>
            ) : (
              <MenuList menus={menus} copy={d} />
            )}
          </div>
          <div
            className='gusto-menu__line-art pointer-events-none absolute top-[46px] right-[1.999px] hidden h-[297px] w-[287.08px] xl:block'
            aria-hidden='true'
          >
            <Image
              src='/images/menu-botanicals.svg'
              alt=''
              fill
              sizes='287px'
            />
          </div>
        </section>
        <HomeSocialSection copy={d} socialCards={socialCards} />
        <HomeReservationSection copy={d} />
        <HomeAccessSection copy={d} />
      </main>
      <HomeFooter copy={d} locale={locale} socialCards={socialCards} />
    </>
  );
}
