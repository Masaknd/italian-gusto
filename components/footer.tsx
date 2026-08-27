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
    <footer className='relative overflow-hidden bg-ink text-content [--footer-brush-height:min(1.8535vw,35.588px)] max-[480px]:pt-[7.284471px]'>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-footer-brush absolute top-0 left-0 z-10 block w-full max-w-none rotate-180 min-[1200px]:max-[1599px]:h-[26.691189px] min-[481px]:max-[768.02px]:h-[14.235302px] max-[480px]:h-[7.284471px]'
      />
      <div className='gusto-footer-content relative bg-ink min-[1200px]:max-[1599px]:h-[287.691315px] min-[481px]:max-[768.02px]:h-[420.235382px] max-[480px]:h-[455px]'>
        <div className='gusto-footer-upper flex h-[calc(197px_+_var(--footer-brush-height))] items-center justify-center p-[calc(32px_+_var(--footer-brush-height))_var(--layout-page-padding)_32px] min-[1200px]:max-[1599px]:h-[calc(26.691189px_+_197px)] min-[1200px]:max-[1599px]:p-[calc(var(--footer-brush-height)_+_32px)_96px_32px] max-[900px]:h-[calc(286px_+_var(--footer-brush-height))] max-[900px]:p-[calc(32px_+_var(--footer-brush-height))_24px_32px] min-[481px]:max-[768.02px]:h-[calc(14.235302px_+_286px)] min-[481px]:max-[768.02px]:p-[calc(var(--footer-brush-height)_+_32px)_0_32px] max-[480px]:h-[346px] max-[480px]:p-[32px_0]'>
          <div className='gusto-footer-upper-inner flex h-[133px] w-full items-center justify-between min-[1200px]:max-[1599px]:h-[133px] min-[1200px]:max-[1599px]:w-[1248px] max-[900px]:h-[222px] max-[900px]:flex-col max-[900px]:justify-start max-[900px]:gap-8 min-[481px]:max-[768.02px]:h-[222px] min-[481px]:max-[768.02px]:w-[768px] min-[481px]:max-[768.02px]:px-6 max-[480px]:h-[282px] max-[480px]:w-full max-[480px]:gap-6 max-[480px]:px-4'>
            <Link
              href={`/${locale}`}
              className='gusto-footer-logo block h-[100px] w-[230.709px] flex-none min-[1200px]:max-[1599px]:h-[100px] min-[1200px]:max-[1599px]:w-[230.708664px] max-[900px]:h-[90px] max-[900px]:w-[207.638px] min-[481px]:max-[768.02px]:w-[207.637802px] max-[480px]:w-[207.637802px]'
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
              className='gusto-footer-nav flex items-center min-[1200px]:max-[1599px]:h-[22px] min-[1200px]:max-[1599px]:w-[479px] min-[481px]:max-[768.02px]:h-5 min-[481px]:max-[768.02px]:w-[451px] max-[480px]:h-[112px] max-[480px]:w-[124px] max-[480px]:flex-col max-[480px]:gap-4'
            >
              {footerNav.map(([label, href]) => (
                <Link
                  href={href}
                  className='h-auto border-l border-content px-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline last:border-r min-[1200px]:max-[1599px]:h-[22px] min-[1200px]:max-[1599px]:text-2xl min-[1200px]:max-[1599px]:leading-[22px] max-[900px]:text-[22px] max-[900px]:leading-5 min-[481px]:max-[768.02px]:h-5 min-[481px]:max-[768.02px]:text-2xl min-[481px]:max-[768.02px]:leading-5 max-[480px]:border-0 max-[480px]:px-4 max-[480px]:text-xl max-[480px]:leading-4 max-[480px]:last:border-0'
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className='gusto-footer-social flex items-center gap-[52px] min-[1200px]:max-[1599px]:h-12 min-[1200px]:max-[1599px]:w-[248px] min-[481px]:max-[768.02px]:h-12 min-[481px]:max-[768.02px]:w-[248px] max-[480px]:h-8 max-[480px]:w-[200px]'>
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={copy.footer.socialExternal.replace(
                    '{name}',
                    card.name,
                  )}
                  className='block h-12 w-12 text-inherit min-[1200px]:max-[1599px]:h-12 min-[1200px]:max-[1599px]:w-12 min-[481px]:max-[768.02px]:h-12 min-[481px]:max-[768.02px]:w-12 max-[480px]:h-8 max-[480px]:w-8'
                  key={card.name}
                >
                  <HomeSocialIcon type={card.icon} className='block h-full w-full' />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='gusto-footer-lower h-16 bg-orange p-[16px_var(--layout-page-padding)] text-ink min-[1200px]:max-[1599px]:h-16 min-[1200px]:max-[1599px]:p-[16px_96px] max-[900px]:h-[120px] max-[900px]:p-[16px_24px] min-[481px]:max-[768.02px]:h-[120px] min-[481px]:max-[768.02px]:p-[16px_0] max-[480px]:h-[109px] max-[480px]:p-[16px_0]'>
          <div className='gusto-footer-lower-inner flex h-8 w-full items-center justify-between min-[1200px]:max-[1599px]:h-8 min-[1200px]:max-[1599px]:w-[1248px] max-[900px]:h-[88px] max-[900px]:flex-col max-[900px]:justify-start max-[900px]:gap-2 min-[481px]:max-[768.02px]:h-[88px] min-[481px]:max-[768.02px]:w-[768px] min-[481px]:max-[768.02px]:px-6 max-[480px]:h-[77px] max-[480px]:w-full max-[480px]:gap-2 max-[480px]:px-4'>
            <a
              className='gusto-footer-phone flex items-center gap-4 font-label text-2xl leading-[22px] font-bold text-inherit no-underline min-[1200px]:max-[1599px]:h-8 min-[1200px]:max-[1599px]:w-[196px] min-[1200px]:max-[1599px]:text-2xl min-[1200px]:max-[1599px]:leading-[22px] max-[900px]:gap-1 max-[900px]:text-lg max-[900px]:leading-6 min-[481px]:max-[768.02px]:h-6 min-[481px]:max-[768.02px]:w-[139px] min-[481px]:max-[768.02px]:text-2xl min-[481px]:max-[768.02px]:leading-4 max-[480px]:h-4 max-[480px]:w-[119px] max-[480px]:text-base max-[480px]:leading-4'
              href={siteConfig.phoneHref}
            >
              <PhoneIcon
                aria-hidden='true'
                weight='regular'
                className='size-8 flex-none max-[900px]:size-6 min-[481px]:max-[768.02px]:size-6 max-[480px]:size-4'
              />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours flex items-center font-label text-2xl leading-[22px] font-bold text-inherit min-[1200px]:max-[1599px]:h-8 min-[1200px]:max-[1599px]:w-[667px] min-[1200px]:max-[1599px]:text-2xl min-[1200px]:max-[1599px]:leading-[22px] max-[900px]:text-lg max-[900px]:leading-6 min-[481px]:max-[768.02px]:h-6 min-[481px]:max-[768.02px]:w-[484px] min-[481px]:max-[768.02px]:text-2xl min-[481px]:max-[768.02px]:leading-4 max-[480px]:grid max-[480px]:h-[31px] max-[480px]:w-[272px] max-[480px]:grid-cols-[16px_auto] max-[480px]:gap-x-1 max-[480px]:gap-y-px max-[480px]:text-base max-[480px]:leading-4'>
              <ClockIcon
                aria-hidden='true'
                weight='regular'
                className='size-8 flex-none max-[900px]:size-6 min-[481px]:max-[768.02px]:size-6 max-[480px]:col-start-1 max-[480px]:row-start-1 max-[480px]:size-4'
              />
              <p className='border-l border-ink px-4 whitespace-nowrap max-[900px]:px-2 min-[481px]:max-[768.02px]:h-6 min-[481px]:max-[768.02px]:leading-4 max-[480px]:col-start-2 max-[480px]:m-0 max-[480px]:border-0 max-[480px]:p-0'>
                {copy.footer.lunch}: {siteConfig.lunchHours}
              </p>
              <p className='border-l border-ink px-4 whitespace-nowrap max-[900px]:px-2 min-[481px]:max-[768.02px]:h-6 min-[481px]:max-[768.02px]:leading-4 max-[480px]:col-start-2 max-[480px]:m-0 max-[480px]:border-0 max-[480px]:p-0'>
                {copy.footer.dinner}: {siteConfig.dinnerHours}
              </p>
            </div>
            <p className='gusto-footer-copyright whitespace-nowrap font-accent text-sm leading-none min-[1200px]:max-[1599px]:h-[14px] min-[1200px]:max-[1599px]:w-[218px] min-[1200px]:max-[1599px]:text-right min-[1200px]:max-[1599px]:text-sm min-[1200px]:max-[1599px]:leading-[14px] max-[900px]:font-sans max-[900px]:text-xs min-[481px]:max-[768.02px]:h-[14px] min-[481px]:max-[768.02px]:w-[218px] min-[481px]:max-[768.02px]:text-center min-[481px]:max-[768.02px]:text-xs min-[481px]:max-[768.02px]:leading-[14px] max-[480px]:h-[14px] max-[480px]:w-[218px] max-[480px]:text-center max-[480px]:text-xs max-[480px]:leading-[14px]'>
              {copy.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
