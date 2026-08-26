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
        <main className="gusto-home gusto-menu-page overflow-hidden bg-paper bg-[url(/images/cotton01.jpg)] bg-cover bg-fixed bg-center font-sans text-ink [--coral:var(--color-brand-coral)] [--cream:var(--color-brand-paper)] [--ink:var(--color-brand-ink)]">
          <section className="gusto-menu" aria-labelledby="gusto-menu-title">
            <div className="gusto-menu__container">
              <h1 id="gusto-menu-title" className="gusto-menu__title">
                <span className="gusto-menu__title-prefix" aria-hidden="true">
                  {d.menu.titlePrefix}
                </span>
                <span className="gusto-menu__title-main" aria-hidden="true">
                  {d.menu.titleMain}
                </span>
                <span className="sr-only">{d.menu.title}</span>
              </h1>
              {content.error ? (
                <p className="gusto-menu__status" role="status">
                  {d.errors.dynamic}
                </p>
              ) : (
                <MenuList menus={menus} copy={d} />
              )}
            </div>
            <div className="gusto-menu__line-art" aria-hidden="true">
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
