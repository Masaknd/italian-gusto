import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function AboutPageHero({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id="about-story"
      className="gusto-about-page-hero relative h-[1166px] w-full overflow-hidden min-[1200px]:max-[1599px]:h-[926px] max-[1199px]:h-[1254px] max-[480.02px]:h-[907px]"
      aria-labelledby="gusto-about-page-title"
    >
      <Marquee className="gusto-about-page-marquee top-[262.01px] left-[90px] z-[3] min-[1200px]:max-[1599px]:top-[84px] max-[1199px]:hidden" text={copy.home.verticalTitle} />

      <div className="gusto-about-page-story absolute top-6 left-[264px] z-[2] flex h-[609px] w-[585px] flex-col items-start gap-12 min-[1200px]:max-[1599px]:left-[120px] min-[1200px]:max-[1599px]:w-[612px] max-[1199px]:left-1/2 max-[1199px]:h-[404px] max-[1199px]:w-[min(720px,calc(100%_-_48px))] max-[1199px]:-translate-x-1/2 max-[480.02px]:left-4 max-[480.02px]:h-[436px] max-[480.02px]:w-[361px] max-[480.02px]:max-w-[calc(100%_-_32px)] max-[480.02px]:translate-x-0 max-[480.02px]:gap-6">
        <div className="flex h-[84px] w-80 flex-col items-start gap-1 border-b-2 border-dashed border-coral max-[1199px]:h-[52px] max-[1199px]:w-48 max-[480.02px]:h-9 max-[480.02px]:w-32">
          <h1 id="gusto-about-page-title" className="m-0 flex h-20 w-80 items-center whitespace-nowrap font-display text-[80px] leading-[96px] font-normal tracking-[-0.25em] text-coral max-[1199px]:h-12 max-[1199px]:w-48 max-[1199px]:text-5xl max-[1199px]:leading-[58px] max-[480.02px]:h-8 max-[480.02px]:w-32 max-[480.02px]:text-[32px] max-[480.02px]:leading-[38px]">{copy.home.aboutTitle}</h1>
        </div>

        <div className="relative flex h-[477px] w-full flex-col items-start gap-12 max-[1199px]:h-[304px] max-[1199px]:gap-4 max-[480.02px]:h-[376px] max-[480.02px]:w-[360px] max-[480.02px]:max-w-full">
          <div className="gusto-about-page-copy relative z-[2] h-[231px] w-full font-accent text-2xl leading-[1.36] font-normal text-ink max-[1199px]:h-36 max-[1199px]:text-lg max-[480.02px]:h-[216px]">
            {copy.home.aboutBody.map((paragraph) => (
              <p className="m-0 leading-[inherit]" key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="relative z-[2] m-0 flex h-[198px] w-full flex-col justify-between font-accent text-2xl leading-[1.36] font-normal text-ink max-[1199px]:h-36 max-[1199px]:text-lg">
            <div className="grid grid-cols-[112px_minmax(0,1fr)] max-[1199px]:grid-cols-[96px_minmax(0,1fr)]">
              <dt className="m-0 font-[inherit]">{copy.info.hours}</dt>
              <dd className="m-0 font-[inherit]">
                <span className="block">{siteConfig.lunchHours}</span>
                <span className="block">{siteConfig.dinnerHours}</span>
              </dd>
            </div>
            <div className="grid grid-cols-[112px_minmax(0,1fr)] max-[1199px]:grid-cols-[96px_minmax(0,1fr)]">
              <dt className="m-0 font-[inherit]">{copy.info.phone}</dt>
              <dd className="m-0 font-[inherit]">
                <a className="text-inherit no-underline" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </dd>
            </div>
            <div className="grid grid-cols-[112px_minmax(0,1fr)] max-[1199px]:grid-cols-[96px_minmax(0,1fr)]">
              <dt className="m-0 font-[inherit]">{copy.home.paymentLabel}</dt>
              <dd className="m-0 font-[inherit]">{copy.home.paymentMethods}</dd>
            </div>
          </dl>

          <Image
            src="/images/about-barrel.png"
            alt=""
            width={399}
            height={256}
            sizes="(max-width: 768px) 310px, (max-width: 1599px) 399px, 553px"
            className="gusto-about-page-barrel absolute top-[555px] left-0 z-[1] block h-[354.46px] w-[552.71px] object-contain min-[1200px]:max-[1599px]:top-[477.66px] min-[1200px]:max-[1599px]:left-[220px] min-[1200px]:max-[1599px]:h-[255.62px] min-[1200px]:max-[1599px]:w-[398.6px] max-[1199px]:top-[105px] max-[1199px]:right-0 max-[1199px]:left-auto max-[1199px]:h-[199px] max-[1199px]:w-[310.31px] max-[480.02px]:hidden"
          />
        </div>
      </div>

      <div className="gusto-about-page-interior absolute top-0 left-[849px] h-[1066px] w-[973px] min-[1200px]:max-[1599px]:top-6 min-[1200px]:max-[1599px]:left-[732px] min-[1200px]:max-[1599px]:h-[776px] min-[1200px]:max-[1599px]:w-[709px] max-[1199px]:top-[452px] max-[1199px]:left-1/2 max-[1199px]:h-[776px] max-[1199px]:w-[709px] max-[1199px]:-translate-x-1/2 max-[480.02px]:top-[484px] max-[480.02px]:left-4 max-[480.02px]:h-[397px] max-[480.02px]:w-[361px] max-[480.02px]:max-w-[calc(100%_-_32px)] max-[480.02px]:translate-x-0">
        <Image
          src="/images/inside.png"
          alt={copy.home.aboutImageAlt}
          fill
          priority
          sizes="(max-width: 480px) 361px, (max-width: 1599px) 709px, 973px"
          className="object-contain"
        />
      </div>

      <a
        className="absolute right-[72px] bottom-[100px] z-[4] flex size-[74px] items-center justify-center rounded-full border-[5px] border-coral font-display text-[46px] leading-none font-normal text-coral no-underline min-[1200px]:max-[1599px]:right-8 min-[1200px]:max-[1599px]:size-12 min-[1200px]:max-[1599px]:border-[3px] min-[1200px]:max-[1599px]:text-3xl max-[1199px]:hidden"
        href="#about-story"
        aria-label={copy.aboutPage.backToTop}
      >
        <span className="translate-y-1" aria-hidden="true">⌃</span>
      </a>
    </section>
  );
}
