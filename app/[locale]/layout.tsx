import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Analytics } from '@/components/analytics';
import { PreviewBanner } from '@/components/preview-banner';
import { SiteHeader } from '@/components/site-header';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const d = getDictionary(locale);
  const path = `/${locale}`;
  return {
    title: d.seo.homeTitle,
    description: d.seo.homeDescription,
    alternates: {
      canonical: path,
      languages: { ja: '/ja', en: '/en', 'x-default': '/ja' },
    },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div lang={locale}>
      <Analytics />
      <SiteHeader locale={locale} />
      {children}
      <PreviewBanner locale={locale} />
    </div>
  );
}
