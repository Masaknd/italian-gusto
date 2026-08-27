import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function AboutPageHero({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about-story'
      className='gusto-about-page-hero relative h-[1166px] w-full overflow-hidden xl:max-2xl:h-[926px] max-xl:h-[1254px] xs:h-[907px]'
      aria-labelledby='gusto-about-page-title'
    >
      <Marquee
        className='gusto-about-page-marquee top-[262.01px] left-[90px] z-[3] xl:max-2xl:top-[84px] max-xl:hidden'
        text={copy.home.verticalTitle}
      />

      <div className='gusto-about-page-story absolute top-6 left-[264px] z-[2] flex h-[609px] w-[585px] flex-col items-start gap-12 xl:max-2xl:left-[120px] xl:max-2xl:w-[612px] max-xl:left-1/2 max-xl:h-[404px] max-xl:w-[min(720px,calc(100%_-_48px))] max-xl:-translate-x-1/2 xs:left-4 xs:h-[436px] xs:w-[361px] xs:max-w-[calc(100%_-_32px)] xs:translate-x-0 xs:gap-6'>
        <div className='flex h-[84px] w-80 flex-col items-start gap-1 border-b-2 border-dashed border-coral max-xl:h-[52px] max-xl:w-48 xs:h-9 xs:w-32'>
          <h1
            id='gusto-about-page-title'
            className='m-0 flex h-20 w-80 items-center whitespace-nowrap font-display text-[80px] leading-[96px] font-normal tracking-[-0.25em] text-coral max-xl:h-12 max-xl:w-48 max-xl:text-5xl max-xl:leading-[58px] xs:h-8 xs:w-32 xs:text-[32px] xs:leading-[38px]'
          >
            {copy.home.aboutTitle}
          </h1>
        </div>

        <div className='relative flex h-[477px] w-full flex-col items-start gap-12 max-xl:h-[304px] max-xl:gap-4 xs:h-[376px] xs:w-[360px] xs:max-w-full'>
          <div className='gusto-about-page-copy relative z-[2] h-[231px] w-full font-accent text-2xl leading-[1.36] font-normal text-ink max-xl:h-36 max-xl:text-lg xs:h-[216px]'>
            {copy.home.aboutBody.map((paragraph) => (
              <p className='m-0 leading-[inherit]' key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <dl className='relative z-[2] m-0 flex h-[198px] w-full flex-col justify-between font-accent text-2xl leading-[1.36] font-normal text-ink max-xl:h-36 max-xl:text-lg'>
            <div className='grid grid-cols-[112px_minmax(0,1fr)] max-xl:grid-cols-[96px_minmax(0,1fr)]'>
              <dt className='m-0 font-[inherit]'>{copy.info.hours}</dt>
              <dd className='m-0 font-[inherit]'>
                <span className='block'>{siteConfig.lunchHours}</span>
                <span className='block'>{siteConfig.dinnerHours}</span>
              </dd>
            </div>
            <div className='grid grid-cols-[112px_minmax(0,1fr)] max-xl:grid-cols-[96px_minmax(0,1fr)]'>
              <dt className='m-0 font-[inherit]'>{copy.info.phone}</dt>
              <dd className='m-0 font-[inherit]'>
                <a
                  className='text-inherit no-underline'
                  href={siteConfig.phoneHref}
                >
                  {siteConfig.phone}
                </a>
              </dd>
            </div>
            <div className='grid grid-cols-[112px_minmax(0,1fr)] max-xl:grid-cols-[96px_minmax(0,1fr)]'>
              <dt className='m-0 font-[inherit]'>{copy.home.paymentLabel}</dt>
              <dd className='m-0 font-[inherit]'>{copy.home.paymentMethods}</dd>
            </div>
          </dl>

          <Image
            src='/images/about-barrel.png'
            alt=''
            width={399}
            height={256}
            sizes='(max-width: 768px) 310px, (max-width: 1599px) 399px, 553px'
            className='gusto-about-page-barrel absolute top-[555px] left-0 z-[1] block h-[354.46px] w-[552.71px] object-contain xl:max-2xl:top-[477.66px] xl:max-2xl:left-[220px] xl:max-2xl:h-[255.62px] xl:max-2xl:w-[398.6px] max-xl:top-[105px] max-xl:right-0 max-xl:left-auto max-xl:h-[199px] max-xl:w-[310.31px] xs:hidden'
          />
        </div>
      </div>

      <div className='gusto-about-page-interior absolute top-0 left-[849px] h-[1066px] w-[973px] xl:max-2xl:top-6 xl:max-2xl:left-[732px] xl:max-2xl:h-[776px] xl:max-2xl:w-[709px] max-xl:top-[452px] max-xl:left-1/2 max-xl:h-[776px] max-xl:w-[709px] max-xl:-translate-x-1/2 xs:top-[484px] xs:left-4 xs:h-[397px] xs:w-[361px] xs:max-w-[calc(100%_-_32px)] xs:translate-x-0'>
        <Image
          src='/images/inside.png'
          alt={copy.home.aboutImageAlt}
          fill
          priority
          sizes='(max-width: 480px) 361px, (max-width: 1599px) 709px, 973px'
          className='object-contain'
        />
      </div>

      <a
        className='absolute right-[72px] bottom-[100px] z-[4] flex size-[74px] items-center justify-center rounded-full border-[5px] border-coral font-display text-[46px] leading-none font-normal text-coral no-underline xl:max-2xl:right-8 xl:max-2xl:size-12 xl:max-2xl:border-[3px] xl:max-2xl:text-3xl max-xl:hidden'
        href='#about-story'
        aria-label={copy.aboutPage.backToTop}
      >
        <span className='translate-y-1' aria-hidden='true'>
          ⌃
        </span>
      </a>
    </section>
  );
}
