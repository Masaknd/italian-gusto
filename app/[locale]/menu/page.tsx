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
export async function generateMetadata({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale))
        return {};
    const d = getDictionary(locale);
    return {
        title: d.seo.menuTitle,
        alternates: {
            canonical: `/${locale}/menu`,
            languages: { ja: '/ja/menu', en: '/en/menu' },
        },
    };
}
export default async function MenuPage({ params, }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale))
        notFound();
    const d = getDictionary(locale);
    const content = await getMenuContentForSite();
    const menus = locale === 'en'
        ? await translateManagedFields(content.menus)
        : content.menus;
    const socialCards: SocialCard[] = [
      { ...d.home.social.twitter, icon: 'x' },
      { ...d.home.social.instagram, icon: 'instagram' },
      { ...d.home.social.blog, icon: 'drink' },
    ];

    return (
      <>
        <main className="gusto-home overflow-hidden bg-paper bg-[url(/images/cotton01.jpg)] bg-cover bg-fixed bg-center font-sans text-ink [--coral:var(--color-brand-coral)] [--cream:var(--color-brand-paper)] [--ink:var(--color-brand-ink)]">
          <section className="relative w-full overflow-hidden text-ink" aria-labelledby="gusto-menu-title">
            <div className="flex w-full flex-col items-start gap-[46px] px-60 pb-[200px] max-[1599.98px]:px-24 max-[1023.98px]:px-6 max-[480px]:gap-6 max-[480px]:px-4 max-[480px]:pb-[50px]">
              <h1 id="gusto-menu-title" className="gusto-menu__title m-0 box-border inline-flex h-[88px] w-[385px] items-end whitespace-nowrap border-b-[3px] border-dashed border-coral font-display font-normal text-coral max-[1023.98px]:h-[60px] max-[1023.98px]:w-[261px] max-[480px]:h-10 max-[480px]:w-[203px]">
                <span className="gusto-menu__title-prefix text-5xl leading-[60px] tracking-[-0.3em] max-[1023.98px]:text-[32px] max-[1023.98px]:leading-10 max-[480px]:text-2xl max-[480px]:leading-[30px]" aria-hidden="true">
                  {d.menu.titlePrefix}
                </span>
                <span className="gusto-menu__title-main text-[80px] leading-[96px] tracking-[-0.25em] max-[1023.98px]:text-[52px] max-[1023.98px]:leading-[62px] max-[480px]:text-[40px] max-[480px]:leading-12" aria-hidden="true">
                  {d.menu.titleMain}
                </span>
                <span className="sr-only">{d.menu.title}</span>
              </h1>
              {content.error ? (
                <p className="m-0 text-muted" role="status">
                  {d.errors.dynamic}
                </p>
              ) : (
                <MenuList menus={menus} copy={d} />
              )}
            </div>
            <div className="gusto-menu__line-art pointer-events-none absolute top-[46px] right-[1.999px] h-[297px] w-[287.08px] max-[1023.98px]:hidden" aria-hidden="true">
              <Image
                src="/images/menu-botanicals.svg"
                alt=""
                fill
                sizes="287px"
              />
            </div>
          </section>
          <HomeSocialSection copy={d} socialCards={socialCards} />
          <HomeReservationSection copy={d} />
          <HomeAccessSection copy={d} />
        </main>
        <HomeFooter
          copy={d}
          locale={locale}
          socialCards={socialCards}
        />
      </>
    );
}
