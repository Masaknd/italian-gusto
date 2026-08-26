import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function AboutPageHero({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id="about-story"
      className="gusto-about-page-hero"
      aria-labelledby="gusto-about-page-title"
    >
      <Marquee className="gusto-about-page-marquee" text={copy.home.verticalTitle} />

      <div className="gusto-about-page-story">
        <div className="gusto-about-page-heading">
          <h1 id="gusto-about-page-title">{copy.home.aboutTitle}</h1>
        </div>

        <div className="gusto-about-page-content">
          <div className="gusto-about-page-copy">
            {copy.home.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="gusto-about-page-details">
            <div>
              <dt>{copy.info.hours}</dt>
              <dd>
                <span>{siteConfig.lunchHours}</span>
                <span>{siteConfig.dinnerHours}</span>
              </dd>
            </div>
            <div>
              <dt>{copy.info.phone}</dt>
              <dd>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </dd>
            </div>
            <div>
              <dt>{copy.home.paymentLabel}</dt>
              <dd>{copy.home.paymentMethods}</dd>
            </div>
          </dl>

          <Image
            src="/images/about-barrel.png"
            alt=""
            width={399}
            height={256}
            sizes="(max-width: 768px) 310px, (max-width: 1599px) 399px, 553px"
            className="gusto-about-page-barrel"
          />
        </div>
      </div>

      <div className="gusto-about-page-interior">
        <Image
          src="/images/inside.png"
          alt={copy.home.aboutImageAlt}
          fill
          priority
          sizes="(max-width: 480px) 361px, (max-width: 1599px) 709px, 973px"
        />
      </div>

      <a
        className="gusto-about-page-caret"
        href="#about-story"
        aria-label={copy.aboutPage.backToTop}
      >
        <span aria-hidden="true">⌃</span>
      </a>
    </section>
  );
}
