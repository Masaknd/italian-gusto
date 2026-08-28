import { ClockIcon, PhoneIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { HomeSocialIcon } from './social-icon';
import type { HomePageCopy, SocialCard } from './types';

export function HomeFooter({
  copy,
  locale,
  socialCards,
  storyHref,
}: {
  copy: HomePageCopy;
  locale: Locale;
  socialCards: SocialCard[];
  storyHref?: string;
}) {
  const footerNav = [
    [copy.footer.nav.menu, `/${locale}/menu`],
    [copy.footer.nav.story, storyHref ?? `/${locale}/about`],
    [copy.footer.nav.access, '#access'],
    [copy.footer.nav.reservation, '#reservation'],
  ];

  return (
    <footer className='relative overflow-hidden bg-ink text-content xs:pt-2]'>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-footer-brush block w-full max-w-none rotate-180 -translate-y-px'
      />
      <div className='gusto-footer-content relative bg-ink'>
        <div className='gusto-footer-upper flex items-center justify-center p-[calc(32px_+_min(1.8535vw,35.588px))_16px_32px] min-[768px]:px-6 min-[992px]:px-24 xl:max-2xl:p-[58.691189px_96px_32px] 3xl:px-60 max-lg:p-[calc(32px_+_min(1.8535vw,35.588px))_24px_32px] sm:max-md:p-[46.235302px_0_32px] xs:p-[32px_0]'>
          <div className='gusto-footer-upper-inner flex w-full items-center justify-between max-lg:flex-col max-lg:justify-start max-lg:gap-8 sm:max-md:px-6 xs:gap-6 xs:px-4'>
            <Link
              href={`/${locale}`}
              className='gusto-footer-logo block w-auto h-25 xl:max-2xl:h-25 max-lg:h-22.5'
            >
              <Image
                src='/images/logo-w@2x.png'
                alt={siteConfig.name}
                width={692}
                height={300}
                sizes='(max-width: 900px) 208px, 231px'
                className='block h-full w-full'
              />
            </Link>
            <nav
              aria-label={copy.footer.navigation}
              className='gusto-footer-nav flex xs:flex-col items-center xs:gap-4'
            >
              {footerNav.map(([label, href]) => (
                <Link
                  href={href}
                  className='h-auto border-l border-content px-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline last:border-r xl:max-2xl:h-[22px] xl:max-2xl:text-2xl xl:max-2xl:leading-[22px] max-lg:text-[22px] max-lg:leading-5 sm:max-md:h-5 sm:max-md:text-2xl sm:max-md:leading-5 xs:border-0 xs:px-4 xs:text-xl xs:leading-4 xs:last:border-0'
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className='gusto-footer-social flex items-center gap-[52px] xl:max-2xl:h-12'>
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={copy.footer.socialExternal.replace(
                    '{name}',
                    card.name,
                  )}
                  className='block h-12 w-12 text-inherit xl:max-2xl:h-12 xl:max-2xl:w-12 sm:max-md:h-12 sm:max-md:w-12 xs:h-8 xs:w-8'
                  key={card.name}
                >
                  <HomeSocialIcon
                    type={card.icon}
                    className='block h-full w-full'
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='gusto-footer-lower bg-orange'>
          <div className='gusto-footer-lower-inner flex w-full items-center justify-between max-lg:flex-col max-lg:justify-start max-lg:gap-2 p-4 min-[768px]:px-6 min-[992px]:px-24 xl:max-2xl:p-[16px_96px] 3xl:px-60 max-lg:p-[16px_24px] sm:max-md:p-[16px_0] xs:p-[16px_0]'>
            <a
              className='gusto-footer-phone flex items-center gap-4 font-label text-2xl leading-5.5 font-bold text-inherit no-underline xl:max-2xl:text-2xl xl:max-2xl:leading-5.5 max-lg:gap-1 max-lg:text-lg max-lg:leading-6 sm:max-md:text-2xl sm:max-md:leading-4 xs:text-base xs:leading-4'
              href={siteConfig.phoneHref}
            >
              <PhoneIcon
                aria-hidden='true'
                weight='regular'
                className='xl:size-8 max-lg:size-6 sm:max-md:size-6 xs:size-4'
              />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours flex items-center font-label text-2xl leading-5.5 font-bold text-inherit xl:max-2xl:h-8 xl:max-2xl:text-2xl xl:max-2xl:leading-5.5 max-lg:text-lg max-lg:leading-6 sm:max-md:text-2xl sm:max-md:leading-4 xs:grid xs:grid-cols-[16px_auto] xs:gap-x-1 xs:gap-y-px xs:text-base xs:leading-4'>
              <ClockIcon
                aria-hidden='true'
                weight='regular'
                className='xl:size-8 max-lg:size-6 sm:max-md:size-6 xs:col-start-1 xs:row-start-1 xs:size-4'
              />
              <p className='px-4 whitespace-nowrap max-lg:px-2 sm:max-md:leading-4 xs:col-start-2 xs:m-0 xs:border-0 xs:p-0'>
                {copy.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p className='border-l border-content px-4 whitespace-nowrap max-lg:px-2 sm:max-md:leading-4 xs:col-start-2 xs:m-0 xs:border-0 xs:p-0'>
                {copy.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p className='gusto-footer-copyright whitespace-nowrap font-accent text-sm leading-none xl:max-2xl:text-right xl:max-2xl:text-sm xl:max-2xl:leading-3.5 max-lg:font-sans max-lg:text-xs sm:max-md:text-center sm:max-md:text-xs sm:max-md:leading-3.5 xs:text-center xs:text-xs xs:leading-3.5'>
              {copy.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
