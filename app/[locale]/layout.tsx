import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { notFound } from 'next/navigation';
import { Analytics } from '@/components/analytics';
import { PreviewBanner } from '@/components/preview-banner';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SiteHeader } from '@/components/site-header';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { getSiteUrl } from '@/lib/site-url';
import { getDictionary } from '@/locales';

const notoSansJp = localFont({
  src: '../fonts/NotoSansJP-Variable.ttf',
  variable: '--font-noto-sans-jp',
  display: 'swap',
  weight: '100 900',
});
const kirigirisu = localFont({
  src: '../fonts/AB-kirigirisu-Regular.otf',
  variable: '--font-kirigirisu',
  display: 'swap',
  weight: '400',
});
const kalam = localFont({
  src: '../fonts/Kalam-Bold.ttf',
  variable: '--font-kalam',
  display: 'swap',
  weight: '700',
});
const yamafont = localFont({
  src: '../fonts/yamafont.ttf',
  variable: '--font-yamafont',
  display: 'swap',
  weight: '400',
});

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
    metadataBase: getSiteUrl(),
    title: {
      default: d.seo.homeTitle,
      template: '%s | Gusto Italian Bar',
    },
    description: d.seo.homeDescription,
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
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
  const d = getDictionary(locale);
  return (
    <html
      lang={locale}
      className={`${notoSansJp.variable} ${kirigirisu.variable} ${kalam.variable} ${yamafont.variable} h-full antialiased`}
    >
      <body className='flex min-h-full flex-col'>
        <Analytics locale={locale} />
        <SiteHeader locale={locale} />
        {children}
        <ScrollToTop label={d.nav.backToTop} />
        <PreviewBanner locale={locale} />
      </body>
    </html>
  );
}
