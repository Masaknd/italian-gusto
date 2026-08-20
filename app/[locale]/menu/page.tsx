import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeaturedMenuCarousel } from '@/components/featured-menu';
import { MenuList } from '@/components/menu-list';
import { translateManagedFields } from '@/lib/deepl';
import { isLocale } from '@/lib/i18n';
import { getMenuContentForSite } from '@/lib/microcms/content';
import { getDictionary } from '@/locales';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const content = await getMenuContentForSite();
  const menus =
    locale === 'en'
      ? await translateManagedFields(content.menus)
      : content.menus;
  const featured =
    locale === 'en'
      ? await translateManagedFields(content.featuredMenus)
      : content.featuredMenus;
  return (
    <main className='content-shell py-16 md:py-24'>
      <p className='page-eyebrow'>GUSTO ITALIAN BAR</p>
      <h1 className='page-heading mt-3'>{d.menu.title}</h1>
      {content.error ? (
        <p className='mt-8 text-muted' role='status'>
          {d.errors.dynamic}
        </p>
      ) : (
        <div className='mt-12'>
          <MenuList menus={menus} copy={d} />
        </div>
      )}
      {featured.length > 0 && (
        <FeaturedMenuCarousel items={featured} copy={d} />
      )}
    </main>
  );
}
