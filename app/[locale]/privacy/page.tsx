import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrivacyPreferences } from '@/components/privacy-preferences';
import { isLocale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { getDictionary } from '@/locales';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: getDictionary(locale).seo.privacyTitle,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { ja: '/ja/privacy', en: '/en/privacy' },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale);
  return (
    <main className='mx-auto min-h-[65vh] w-full max-w-3xl px-6 py-20 text-ink'>
      <h1 className='font-display text-4xl'>{copy.privacy.title}</h1>
      <p className='mt-8 leading-8'>{copy.privacy.body}</p>
      <p className='mt-6'>
        <a href={siteConfig.phoneHref} className='underline'>
          {siteConfig.phone}
        </a>
      </p>
      <PrivacyPreferences copy={copy.privacy} />
    </main>
  );
}
