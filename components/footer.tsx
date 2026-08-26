import Image from 'next/image';
import Link from 'next/link';
import { ClockIcon, PhoneIcon } from '@phosphor-icons/react/ssr';
import type { Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { HomeSocialIcon } from './social-icon';
import type { HomePageCopy, SocialCard } from './types';

export function HomeFooter({ copy, locale, socialCards, storyHref = '#about' }: { copy: HomePageCopy; locale: Locale; socialCards: SocialCard[]; storyHref?: string }) {
  const footerNav = [
    [copy.footer.nav.menu, `/${locale}/menu`],
    [copy.footer.nav.story, storyHref],
    [copy.footer.nav.access, '#access'],
    [copy.footer.nav.reservation, '#reservation'],
  ];

  return (
    <footer className='gusto-footer'>
      <Image src='/images/b-4.png' alt='' width={3849} height={72} sizes='100vw' className='gusto-footer-brush' />
      <div className='gusto-footer-content'>
        <div className='gusto-footer-upper'>
          <div className='gusto-footer-upper-inner'>
            <Link href={`/${locale}`} className='gusto-footer-logo'>
              <Image src='/images/logo-w@2x.png' alt={siteConfig.name} width={692} height={300} sizes='(max-width: 900px) 208px, 231px' />
            </Link>
            <nav aria-label={copy.footer.navigation} className='gusto-footer-nav'>
              {footerNav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </nav>
            <div className='gusto-footer-social'>
              {socialCards.map((card) => (
                <a
                  href={siteConfig.socialUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={copy.footer.socialExternal.replace('{name}', card.name)}
                  key={card.name}
                >
                  <HomeSocialIcon type={card.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='gusto-footer-lower'>
          <div className='gusto-footer-lower-inner'>
            <a className='gusto-footer-phone' href={siteConfig.phoneHref}>
              <PhoneIcon aria-hidden='true' weight='regular' />
              <span>{siteConfig.phone}</span>
            </a>
            <div className='gusto-footer-hours'>
              <ClockIcon aria-hidden='true' weight='regular' />
              <p>{copy.footer.lunch}: {siteConfig.lunchHours}</p>
              <p>{copy.footer.dinner}: {siteConfig.dinnerHours}</p>
            </div>
            <p className='gusto-footer-copyright'>{copy.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
