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
    <footer className='footer-brush relative overflow-hidden bg-ink text-content'>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-footer-brush block w-full max-w-none rotate-180 xl:h-7 sm:h-4 xs:h-2 -translate-y-px'
      />
      <div className='gusto-footer-content relative bg-ink'>
        <div className='gusto-footer-upper flex  items-center justify-center'>
          <div className='gusto-footer-upper-inner flex w-full items-center justify-between  max-lg:flex-col max-lg:justify-start max-lg:gap-8 xs:gap-6 2xl:px-60 xl:px-24 sm:px-6 xs:px-4 py-8'>
            <Link
              href={`/${locale}`}
              className='gusto-footer-logo block h-25 max-lg:h-[90px]'
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
              className='gusto-footer-nav flex items-center xs:flex-col xs:gap-4'
            >
              {footerNav.map(([label, href]) => (
                <Link
                  href={href}
                  className='h-auto border-l border-content px-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline last:border-r xl:h-[22px] xl:text-2xl xl:leading-[22px] max-lg:text-[22px] max-lg:leading-5 sm:h-5 sm:text-2xl sm:leading-5 xs:border-0 xs:px-4 xs:text-xl xs:leading-4 xs:last:border-0'
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className='gusto-footer-social flex items-center gap-[52px] xl:h-12 sm:h-12 xs:h-8'>
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={copy.footer.socialExternal.replace(
                    '{name}',
                    card.name,
                  )}
                  className='block h-12 w-12 text-inherit xl:h-12 xl:w-12 sm:h-12 sm:w-12 xs:h-8 xs:w-8'
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
        <div className='gusto-footer-lower w-full bg-orange text-ink'>
          <div className='gusto-footer-lower-inner flex w-full items-center justify-between max-lg:flex-col max-lg:justify-start max-lg:gap-2 xs:gap-2 2xl:p-[16px_240px] xl:p-[16px_96px] sm:p-[16px_24px] xs:p-4'>
            <a
              className='gusto-footer-phone flex items-center gap-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline xl:text-2xl xl:leading-[22px] max-lg:gap-1 max-lg:text-lg max-lg:leading-6 sm:text-2xl sm:leading-4 xs:text-base xs:leading-4'
              href={siteConfig.phoneHref}
            >
              <PhoneIcon
                aria-hidden='true'
                weight='regular'
                className='xl:size-8 max-lg:size-6 sm:size-6 xs:size-4'
              />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours flex items-center font-label text-2xl leading-[22px] font-bold text-inherit xl:text-2xl xl:leading-[22px] max-lg:text-lg max-lg:leading-6 sm:text-2xl sm:leading-4 xs:grid xs:grid-cols-[16px_auto] xs:gap-x-1 xs:gap-y-px xs:text-base xs:leading-4'>
              <ClockIcon
                aria-hidden='true'
                weight='regular'
                className='xl:size-8 max-lg:size-6 sm:size-6 xs:size-4'
              />
              <p className='px-4 whitespace-nowrap max-lg:px-2 sm:leading-4 xs:col-start-2'>
                {copy.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p className='border-l border-ink px-4 whitespace-nowrap max-lg:px-2 sm:leading-4 xs:col-start-2'>
                {copy.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p className='gusto-footer-copyright whitespace-nowrap font-accent text-sm leading-none xl:text-right xl:text-sm xl:leading-[14px] max-lg:font-sans max-lg:text-xs sm:text-center sm:text-xs sm:leading-[14px] xs:text-center xs:text-xs xs:leading-[14px]'>
              {copy.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
