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
    <footer className='relative overflow-hidden bg-ink text-content [--footer-brush-height:min(1.8535vw,35.588px)] xs:pt-[7.284471px]'>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-footer-brush absolute top-0 left-0 z-10 block w-full max-w-none rotate-180 xl:max-2xl:h-[26.691189px] sm:max-md:h-[14.235302px] xs:h-[7.284471px]'
      />
      <div className='gusto-footer-content relative bg-ink xl:max-2xl:h-[287.691315px] sm:max-md:h-[420.235382px] xs:h-[455px]'>
        <div className='gusto-footer-upper flex h-[calc(197px_+_var(--footer-brush-height))] items-center justify-center p-[calc(32px_+_var(--footer-brush-height))_var(--layout-page-padding)_32px] xl:max-2xl:h-[calc(26.691189px_+_197px)] xl:max-2xl:p-[calc(var(--footer-brush-height)_+_32px)_96px_32px] max-lg:h-[calc(286px_+_var(--footer-brush-height))] max-lg:p-[calc(32px_+_var(--footer-brush-height))_24px_32px] sm:max-md:h-[calc(14.235302px_+_286px)] sm:max-md:p-[calc(var(--footer-brush-height)_+_32px)_0_32px] xs:h-[346px] xs:p-[32px_0]'>
          <div className='gusto-footer-upper-inner flex h-[133px] w-full items-center justify-between xl:max-2xl:h-[133px] xl:max-2xl:w-[1248px] max-lg:h-[222px] max-lg:flex-col max-lg:justify-start max-lg:gap-8 sm:max-md:h-[222px] sm:max-md:w-[768px] sm:max-md:px-6 xs:h-[282px] xs:w-full xs:gap-6 xs:px-4'>
            <Link
              href={`/${locale}`}
              className='gusto-footer-logo block h-[100px] w-[230.709px] flex-none xl:max-2xl:h-[100px] xl:max-2xl:w-[230.708664px] max-lg:h-[90px] max-lg:w-[207.638px] sm:max-md:w-[207.637802px] xs:w-[207.637802px]'
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
              className='gusto-footer-nav flex items-center xl:max-2xl:h-[22px] xl:max-2xl:w-[479px] sm:max-md:h-5 sm:max-md:w-[451px] xs:h-[112px] xs:w-[124px] xs:flex-col xs:gap-4'
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
            <div className='gusto-footer-social flex items-center gap-[52px] xl:max-2xl:h-12 xl:max-2xl:w-[248px] sm:max-md:h-12 sm:max-md:w-[248px] xs:h-8 xs:w-[200px]'>
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
        <div className='gusto-footer-lower h-16 bg-orange p-[16px_var(--layout-page-padding)] text-ink xl:max-2xl:h-16 xl:max-2xl:p-[16px_96px] max-lg:h-[120px] max-lg:p-[16px_24px] sm:max-md:h-[120px] sm:max-md:p-[16px_0] xs:h-[109px] xs:p-[16px_0]'>
          <div className='gusto-footer-lower-inner flex h-8 w-full items-center justify-between xl:max-2xl:h-8 xl:max-2xl:w-[1248px] max-lg:h-[88px] max-lg:flex-col max-lg:justify-start max-lg:gap-2 sm:max-md:h-[88px] sm:max-md:w-[768px] sm:max-md:px-6 xs:h-[77px] xs:w-full xs:gap-2 xs:px-4'>
            <a
              className='gusto-footer-phone flex items-center gap-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline xl:max-2xl:h-8 xl:max-2xl:w-[196px] xl:max-2xl:text-2xl xl:max-2xl:leading-[22px] max-lg:gap-1 max-lg:text-lg max-lg:leading-6 sm:max-md:h-6 sm:max-md:w-[139px] sm:max-md:text-2xl sm:max-md:leading-4 xs:h-4 xs:w-[119px] xs:text-base xs:leading-4'
              href={siteConfig.phoneHref}
            >
              <PhoneIcon
                aria-hidden='true'
                weight='regular'
                className='size-8 flex-none max-lg:size-6 sm:max-md:size-6 xs:size-4'
              />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours flex items-center font-label text-2xl leading-[22px] font-bold text-inherit xl:max-2xl:h-8 xl:max-2xl:w-[667px] xl:max-2xl:text-2xl xl:max-2xl:leading-[22px] max-lg:text-lg max-lg:leading-6 sm:max-md:h-6 sm:max-md:w-[484px] sm:max-md:text-2xl sm:max-md:leading-4 xs:grid xs:h-[31px] xs:w-[272px] xs:grid-cols-[16px_auto] xs:gap-x-1 xs:gap-y-px xs:text-base xs:leading-4'>
              <ClockIcon
                aria-hidden='true'
                weight='regular'
                className='size-8 flex-none max-lg:size-6 sm:max-md:size-6 xs:col-start-1 xs:row-start-1 xs:size-4'
              />
              <p className='border-l border-ink px-4 whitespace-nowrap max-lg:px-2 sm:max-md:h-6 sm:max-md:leading-4 xs:col-start-2 xs:m-0 xs:border-0 xs:p-0'>
                {copy.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p className='border-l border-ink px-4 whitespace-nowrap max-lg:px-2 sm:max-md:h-6 sm:max-md:leading-4 xs:col-start-2 xs:m-0 xs:border-0 xs:p-0'>
                {copy.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p className='gusto-footer-copyright whitespace-nowrap font-accent text-sm leading-none xl:max-2xl:h-[14px] xl:max-2xl:w-[218px] xl:max-2xl:text-right xl:max-2xl:text-sm xl:max-2xl:leading-[14px] max-lg:font-sans max-lg:text-xs sm:max-md:h-[14px] sm:max-md:w-[218px] sm:max-md:text-center sm:max-md:text-xs sm:max-md:leading-[14px] xs:h-[14px] xs:w-[218px] xs:text-center xs:text-xs xs:leading-[14px]'>
              {copy.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
