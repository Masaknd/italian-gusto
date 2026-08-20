import Image from 'next/image';
import Link from 'next/link';
import {
  ClockIcon,
  InstagramLogoIcon,
  PhoneIcon,
  WineIcon,
  XLogoIcon,
} from '@phosphor-icons/react/ssr';
import type { Locale } from '@/lib/i18n';
import type { FeaturedMenu } from '@/lib/microcms/types';
import { siteConfig } from '@/lib/site-config';
import { getDictionary } from '@/locales';
import { ReservationLink } from './reservation-link';

type Copy = ReturnType<typeof getDictionary>;
function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link href='#wine' className='gusto-about-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}
function WineMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/menu`} className='gusto-wine-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}
function RecommendationMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link href={`/${locale}/menu`} className='gusto-feature-more'>
      <span>{children}</span>
      <svg aria-hidden='true' viewBox='0 0 111.4 60' focusable='false'>
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}
function SocialIcon({ type }: { type: 'x' | 'instagram' | 'drink' }) {
  if (type === 'instagram') {
    return <InstagramLogoIcon aria-hidden='true' weight='regular' />;
  }
  if (type === 'drink') {
    return <WineIcon aria-hidden='true' weight='regular' />;
  }
  return <XLogoIcon aria-hidden='true' weight='regular' />;
}
function Feature({
  item,
  index,
  copy,
  locale,
}: {
  item: FeaturedMenu;
  index: number;
  copy: Copy;
  locale: Locale;
}) {
  return (
    <article
      id={`recommendation-${index}`}
      className={`gusto-feature gusto-feature-${index}`}
    >
      <div className='gusto-feature-copy'>
        <div className='gusto-feature-heading'>
          <p>
            {copy.featured.title}
            {copy.featured.numberLabels[index - 1]}
          </p>
        </div>
        <div className='gusto-feature-content'>
          <h3>{item.name}</h3>
          {item.description && (
            <p className='gusto-feature-description'>{item.description}</p>
          )}
          <RecommendationMoreLink locale={locale}>
            {copy.featured.menuLinks[index - 1]}
          </RecommendationMoreLink>
        </div>
      </div>
      <div className='gusto-feature-image'>
        <Image
          src={item.image.url}
          alt={item.name}
          fill
          sizes='(max-width: 768px) 80vw, 36vw'
          className='object-contain'
        />
      </div>
      {index === 2 && (
        <Image
          src='/images/two-veggies.png'
          alt=''
          width={535}
          height={445}
          className='gusto-feature-2-deco'
        />
      )}
      {index === 3 && (
        <Image
          src='/images/olives.png'
          alt=''
          width={996}
          height={872}
          className='gusto-feature-3-deco'
        />
      )}
    </article>
  );
}
export function HomeGusto({
  locale,
  featured,
}: {
  locale: Locale;
  featured: FeaturedMenu[];
}) {
  const d = getDictionary(locale);
  const gallery = [
    'slide-3.jpg',
    'slide-1.jpg',
    'slide-6.jpg',
    'slide-2.jpg',
    'slide-4.jpg',
    'slide-5.jpg',
    'slide-7.jpg',
  ];
  const socialCards = [
    { ...d.home.social.twitter, icon: 'x' as const },
    { ...d.home.social.instagram, icon: 'instagram' as const },
    { ...d.home.social.blog, icon: 'drink' as const },
  ];
  const footerNav = [
    [d.footer.nav.menu, `/${locale}/menu`],
    [d.footer.nav.story, '#about'],
    [d.footer.nav.access, '#access'],
    [d.footer.nav.reservation, '#reservation'],
  ];
  return (
    <>
      <main className='gusto-home'>
        <section className='gusto-hero'>
          <p className='gusto-vertical'>{d.home.verticalTitle}</p>
          <div className='gusto-hero-copy'>
            <h1>{d.hero.title}</h1>
            <nav aria-label={d.home.heroNavLabel} className='gusto-hero-nav'>
              <a href=''>{d.home.heroNav.home}</a>
              <a href='#about'>{d.home.heroNav.about}</a>
              <a href='#recommendations'>{d.home.heroNav.menu}</a>
              <a href='#access'>{d.home.heroNav.access}</a>
              <a href='#reservation'>{d.home.heroNav.reservation}</a>
            </nav>
          </div>
          <Image
            src='/images/dishes.png'
            alt={d.home.heroDishesAlt}
            fill
            priority
            sizes='(max-width: 768px) 90vw, 65vw'
            className='gusto-hero-dishes object-contain object-right-top'
          />
          <Image
            src='/images/four-veggies.png'
            alt=''
            width={360}
            height={246}
            className='gusto-hero-veg'
          />
          <a
            className='gusto-hero-caret'
            href='#about'
            aria-label={d.home.heroScrollLabel}
          >
            <span aria-hidden='true'>↑</span>
          </a>
          <Image
            src='/images/b-1.png'
            alt=''
            width={3841}
            height={284}
            sizes='100vw'
            className='gusto-hero-brush'
          />
        </section>
        <section id='about' className='gusto-about gusto-dark'>
          <div className='gusto-about-left'>
            <div className='gusto-about-copy'>
              <div className='gusto-about-title'>
                <h2>{d.home.aboutTitle}</h2>
              </div>
              <div className='gusto-about-body'>
                {d.home.aboutBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <AboutMoreLink>{d.home.aboutMore}</AboutMoreLink>
            </div>
            <Image
              src='/images/glasscheese.png'
              alt=''
              width={276}
              height={239}
              className='gusto-about-deco'
            />
          </div>
          <div className='gusto-about-right'>
            <div className='gusto-about-image'>
              <Image
                src='/images/inside.png'
                alt='温かな照明の店内'
                fill
                sizes='(max-width: 768px) 92vw, 51vw'
                className='object-contain'
              />
            </div>
          </div>
        </section>
        <section id='wine' className='gusto-wine'>
          <Image
            src='/images/b-2.png'
            alt=''
            width={3840}
            height={362}
            sizes='100vw'
            className='gusto-wine-brush gusto-wine-brush-top'
          />
          <div className='gusto-wine-inner'>
            <div className='gusto-wine-visual'>
              <Image
                src='/images/bottle-grapes.png'
                alt={d.home.wineArtworkAlt}
                fill
                sizes='(max-width: 768px) 82vw, 43.23vw'
                className='object-contain'
              />
            </div>
            <div className='gusto-wine-copy'>
              <div className='gusto-wine-title'>
                <h2>{d.home.wineTitle}</h2>
              </div>
              <div className='gusto-wine-text'>
                {d.home.wineBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <WineMoreLink locale={locale}>{d.home.wineMenu}</WineMoreLink>
            </div>
          </div>
          <Image
            src='/images/b-3.png'
            alt=''
            width={3840}
            height={380}
            sizes='100vw'
            className='gusto-wine-brush gusto-wine-brush-bottom'
          />
        </section>
        <section id='recommendations' className='gusto-recommendations'>
          {featured.slice(0, 3).map((item, index) => (
            <Feature
              item={item}
              index={index + 1}
              copy={d}
              locale={locale}
              key={item.id}
            />
          ))}
        </section>
        <section
          id='social'
          className='gusto-social'
          aria-label={d.home.gallery}
        >
          <Image
            src='/images/b-1.png'
            alt=''
            width={3841}
            height={284}
            sizes='100vw'
            className='gusto-social-brush'
          />
          <div className='gusto-gallery'>
            {gallery.map((image) => (
              <div className='gusto-gallery-item' key={image}>
                <Image
                  src={`/images/${image}`}
                  alt={d.home.galleryImageAlt}
                  width={290}
                  height={192}
                />
              </div>
            ))}
          </div>
          <div className='gusto-social-links'>
            {socialCards.map((card) => (
              <a href={siteConfig.socialUrl} key={card.name}>
                <div className='gusto-social-copy'>
                  <div className='gusto-social-heading'>
                    <Image
                      src='/images/deco-1.png'
                      alt=''
                      width={216}
                      height={120}
                    />
                    <span>{card.name}</span>
                  </div>
                  <p>{card.description}</p>
                </div>
                <SocialIcon type={card.icon} />
              </a>
            ))}
          </div>
        </section>
        <section id='reservation' className='gusto-reservation'>
          <Image
            src='/images/slide-8.jpg'
            alt=''
            fill
            sizes='100vw'
            className='gusto-reservation-image'
          />
          <Image
            src='/images/b-5.png'
            alt=''
            width={3849}
            height={72}
            sizes='100vw'
            className='gusto-reservation-brush gusto-reservation-brush-top'
          />
          <div className='gusto-booking'>
            <div className='gusto-booking-title'>
              <h2>{d.home.reservationTitle}</h2>
              <p>{d.home.reservationLabel}</p>
            </div>
            <ul className='gusto-booking-notes'>
              {d.home.reservationNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <ReservationLink
              href={siteConfig.reservationUrl}
              className='gusto-booking-button'
              ariaLabel={d.reserve.external}
            >
              {d.home.reservationCta}
            </ReservationLink>
          </div>
          <Image
            src='/images/b-4.png'
            alt=''
            width={3849}
            height={72}
            sizes='100vw'
            className='gusto-reservation-brush gusto-reservation-brush-bottom'
          />
        </section>
        <section id='access' className='gusto-access'>
          <div className='gusto-access-title'>
            <h2>{d.home.accessTitle}</h2>
            <p>{d.home.accessLabel}</p>
          </div>
          <div className='gusto-access-grid'>
            <div className='gusto-map'>
              <iframe
                src={siteConfig.mapEmbedUrl}
                title={d.home.accessMapTitle}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
            <dl className='gusto-access-details'>
              <div className='gusto-access-row'>
                <dt>{d.info.address}</dt>
                <dd>
                  <address>{siteConfig.address}</address>
                  <a
                    href={siteConfig.mapUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={d.home.accessMapExternal}
                  >
                    {d.home.accessMap}
                  </a>
                </dd>
              </div>
              <div className='gusto-access-row gusto-access-routes'>
                <dt>{d.home.accessDetails}</dt>
                <dd>
                  <ul>
                    {d.home.accessRoutes.map((route) => (
                      <li key={route}>{route}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className='gusto-access-row'>
                <dt>{d.info.phone}</dt>
                <dd>
                  <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                </dd>
              </div>
              <div className='gusto-access-row'>
                <dt>{d.info.hours}</dt>
                <dd>{siteConfig.hours}</dd>
              </div>
              <div className='gusto-access-row'>
                <dt>{d.home.paymentLabel}</dt>
                <dd>{d.home.paymentMethods}</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <footer className='gusto-footer'>
        <Image
          src='/images/b-4.png'
          alt=''
          width={3849}
          height={72}
          sizes='100vw'
          className='gusto-footer-brush'
        />
        <div className='gusto-footer-content'>
          <div className='gusto-footer-upper'>
            <div className='gusto-footer-upper-inner'>
              <Link href={`/${locale}`} className='gusto-footer-logo'>
                <Image
                  src='/images/logo-w@2x.png'
                  alt={siteConfig.name}
                  width={692}
                  height={300}
                  sizes='(max-width: 900px) 208px, 231px'
                />
              </Link>
              <nav
                aria-label={d.footer.navigation}
                className='gusto-footer-nav'
              >
                {footerNav.map(([label, href]) => (
                  <Link href={href} key={href}>
                    {label}
                  </Link>
                ))}
              </nav>
              <div className='gusto-footer-social'>
                {socialCards.map((card) => (
                  <a
                    href={siteConfig.socialUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={d.footer.socialExternal.replace(
                      '{name}',
                      card.name,
                    )}
                    key={card.name}
                  >
                    <SocialIcon type={card.icon} />
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
                <p>
                  {d.footer.lunch}: {siteConfig.lunchHours}
                </p>
                <p>
                  {d.footer.dinner}: {siteConfig.dinnerHours}
                </p>
              </div>
              <p className='gusto-footer-copyright'>{d.footer.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
