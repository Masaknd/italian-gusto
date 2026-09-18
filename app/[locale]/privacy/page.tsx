import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomeAccessSection } from '@/components/access';
import { HomeFooter } from '@/components/footer';
import { PrivacyPreferences } from '@/components/privacy-preferences';
import { isLocale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { getSocialCards } from '@/lib/social-cards';
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
    description: getDictionary(locale).privacy.body,
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
  const policy = copy.privacy;
  const contents = [
    ...policy.sections,
    { id: 'preferences', title: policy.change },
    { id: 'contact', title: policy.contactTitle },
  ];
  return (
    <>
      <main className='gusto-home gusto-page'>
        <div className='px-4 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-24 xl:px-24 3xl:px-60'>
          <div className='mb-10 sm:mb-16'>
            <h1
              className={`m-0 w-fit max-w-full border-b-[3px] border-dashed border-coral pb-3 text-4xl leading-tight tracking-[-0.2em] text-balance text-coral sm:text-5xl xl:text-7xl ${locale === 'ja' ? 'font-display font-normal' : 'font-display font-bold'}`}
            >
              {policy.title}
            </h1>
            <p className='mt-6 max-w-[70ch] text-base leading-8 sm:mt-8 sm:text-lg'>
              {policy.body}
            </p>
          </div>

          <div className='grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16 xl:gap-24'>
            <nav
              aria-label={policy.contents}
              className='border-t border-ink/20 pt-5'
            >
              <p className='mb-3 text-lg font-bold'>{policy.contents}</p>
              <ul className='m-0 flex list-none flex-col gap-1 p-0'>
                {contents.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className='inline-block py-2 text-sm leading-6 underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink'
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className='max-w-[70ch] min-w-0 space-y-10 sm:space-y-12'>
              {policy.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className='scroll-mt-8 border-t border-ink/20 pt-5'
                >
                  <h2
                    id={`${section.id}-title`}
                    className='m-0 text-xl leading-relaxed font-bold sm:text-2xl'
                  >
                    {section.title}
                  </h2>
                  <div className='mt-4 space-y-4 text-base leading-8'>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.id === 'analytics' && (
                    <ul className='mt-4 space-y-2 text-sm leading-7'>
                      <li>
                        <a
                          href={`https://policies.google.com/privacy?hl=${locale}`}
                          className='underline underline-offset-4'
                        >
                          {policy.googlePrivacy}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://policies.google.com/technologies/partner-sites?hl=${locale}`}
                          className='underline underline-offset-4'
                        >
                          {policy.googleDataUse}
                        </a>
                      </li>
                    </ul>
                  )}
                </section>
              ))}

              <section
                id='preferences'
                aria-labelledby='preferences-title'
                className='scroll-mt-8 rounded-2xl border border-ink/20 p-5 sm:p-8'
              >
                <h2
                  id='preferences-title'
                  className='text-xl leading-relaxed font-bold sm:text-2xl'
                >
                  {policy.change}
                </h2>
                <p className='mt-4 text-base leading-8'>
                  {policy.preferencesBody}
                </p>
                <PrivacyPreferences copy={policy} />
              </section>

              <section
                id='contact'
                aria-labelledby='contact-title'
                className='scroll-mt-8 border-t border-ink/20 pt-5'
              >
                <h2
                  id='contact-title'
                  className='text-xl font-bold sm:text-2xl'
                >
                  {policy.contactTitle}
                </h2>
                <p className='mt-4 text-base leading-8'>{policy.contactBody}</p>
                <address className='mt-5 space-y-2 leading-8 not-italic'>
                  <p className='font-bold'>{siteConfig.name}</p>
                  <p>
                    {locale === 'ja'
                      ? siteConfig.address
                      : siteConfig.addressEn}
                  </p>
                  <a
                    href={siteConfig.phoneHref}
                    className='inline-block py-2 font-label text-2xl font-bold underline underline-offset-4'
                  >
                    {siteConfig.phone}
                  </a>
                </address>
              </section>
            </div>
          </div>
        </div>
        <HomeAccessSection copy={copy} locale={locale} />
      </main>
      <HomeFooter
        copy={copy}
        locale={locale}
        socialCards={getSocialCards(copy)}
        reservationHref={`/${locale}#reservation`}
      />
    </>
  );
}
