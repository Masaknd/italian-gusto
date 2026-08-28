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
    <footer className='relative overflow-hidden bg-ink text-content'>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-footer-brush absolute top-0 left-0 z-10 block w-full max-w-none rotate-180 -translate-y-px'
      />
      <div className='gusto-footer-content relative bg-ink'>
        <div className='gusto-footer-upper flex items-center justify-center p-[32px_0] sm:p-[46.235302px_0_32px] lg:p-[calc(32px_+_min(1.8535vw,35.588px))_24px_32px] xl:p-[calc(32px_+_min(1.8535vw,22px))_96px_32px] 3xl:p-[calc(32px_+_min(1.8535vw,35.588px))_240px_32px]'>
          <div className='gusto-footer-upper-inner flex w-full flex-col items-center justify-start gap-6 px-4 sm:gap-8 sm:px-6 xl:flex-row xl:justify-between xl:gap-0 xl:px-0'>
            <Link
              href={`/${locale}`}
              className='gusto-footer-logo block h-22.5 w-[207.637802px] xl:h-25 xl:w-[230.708664px]'
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
              className='gusto-footer-nav flex  flex-col items-center gap-4  sm:flex-row sm:gap-0'
            >
              {footerNav.map(([label, href]) => (
                <Link
                  href={href}
                  className='h-auto border-0 px-4 font-label text-xl leading-4 font-bold text-inherit no-underline sm:h-5 sm:border-l sm:border-content sm:text-[22px] sm:leading-5 sm:last:border-r xl:h-[22px] xl:text-2xl xl:leading-[22px]'
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className='gusto-footer-social flex items-center gap-[52px] xl:h-12'>
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={copy.footer.socialExternal.replace(
                    '{name}',
                    card.name,
                  )}
                  className='block h-8 w-8 text-inherit sm:h-12 sm:w-12'
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
        <div className='gusto-footer-lower bg-orange p-[16px_0] lg:px-6 xl:px-24 3xl:px-60'>
          <div className='gusto-footer-lower-inner flex h-[77px] w-full flex-col items-center justify-start gap-2 sm:h-[88px] xl:h-8 xl:flex-row xl:justify-between xl:gap-0'>
            <a
              className='gusto-footer-phone flex w-[119px] items-center gap-1 font-label text-base leading-4 font-bold text-inherit no-underline sm:w-[139px] sm:text-lg sm:leading-6 xl:w-[196px] xl:gap-4 xl:text-2xl xl:leading-5.5'
              href={siteConfig.phoneHref}
            >
              <PhoneIcon
                aria-hidden='true'
                weight='regular'
                className='size-4 sm:size-6 xl:size-8'
              />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours grid h-[31px] w-[272px] grid-cols-[16px_auto] items-center gap-x-1 gap-y-px font-label text-base leading-4 font-bold text-inherit sm:flex sm:h-6 sm:w-[484px] sm:gap-0 sm:text-lg sm:leading-6 xl:h-8 xl:w-[667px] xl:text-2xl xl:leading-5.5'>
              <ClockIcon
                aria-hidden='true'
                weight='regular'
                className='col-start-1 row-start-1 size-4 sm:static sm:size-6 xl:size-8'
              />
              <p className='col-start-2 m-0 border-0 p-0 whitespace-nowrap sm:px-4 sm:leading-4 lg:px-2 xl:px-4'>
                {copy.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p className='col-start-2 m-0 border-0 p-0 whitespace-nowrap sm:border-l sm:border-content sm:px-4 sm:leading-4 lg:px-2 xl:px-4'>
                {copy.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p className='gusto-footer-copyright w-[218px] text-center whitespace-nowrap font-sans text-xs leading-3.5 sm:text-center lg:font-sans xl:text-right xl:font-accent xl:text-sm'>
              {copy.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
