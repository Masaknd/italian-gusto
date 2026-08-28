import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function AboutPageHero({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about-story'
      className='gusto-about-page-hero relative h-[907px] w-full overflow-hidden sm:h-[1254px] xl:h-[926px] 3xl:h-[1166px]'
      aria-labelledby='gusto-about-page-title'
    >
      <Marquee
        className='gusto-about-page-marquee top-[262.01px] left-[90px] z-[3] hidden xl:top-[84px] xl:block 3xl:top-[262.01px]'
        text={copy.home.verticalTitle}
      />

      <div className='gusto-about-page-story absolute top-6 left-4 z-[2] flex h-[436px] w-[361px] max-w-[calc(100%_-_32px)] translate-x-0 flex-col items-start gap-6 sm:left-1/2 sm:h-[404px] sm:w-[min(720px,calc(100%_-_48px))] sm:max-w-none sm:-translate-x-1/2 sm:gap-12 xl:left-[120px] xl:h-[609px] xl:w-[612px] xl:translate-x-0 3xl:left-[264px] 3xl:w-[585px]'>
        <div className='flex h-9 w-32 flex-col items-start gap-1 border-b-2 border-dashed border-coral sm:h-[52px] sm:w-48 xl:h-[84px] xl:w-80'>
          <h1
            id='gusto-about-page-title'
            className='m-0 flex h-8 w-32 items-center whitespace-nowrap font-display text-[32px] leading-[38px] font-normal tracking-[-0.25em] text-coral sm:h-12 sm:w-48 sm:text-5xl sm:leading-[58px] xl:h-20 xl:w-80 xl:text-[80px] xl:leading-[96px]'
          >
            {copy.home.aboutTitle}
          </h1>
        </div>

        <div className='relative flex h-[376px] w-[360px] max-w-full flex-col items-start gap-4 sm:h-[304px] sm:w-full xl:h-[477px] xl:gap-12'>
          <div className='gusto-about-page-copy relative z-[2] h-[216px] w-full font-accent text-lg leading-[1.36] font-normal text-ink sm:h-36 xl:h-[231px] xl:text-2xl'>
            {copy.home.aboutBody.map((paragraph) => (
              <p className='m-0 leading-[inherit]' key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <dl className='relative z-[2] m-0 flex h-36 w-full flex-col justify-between font-accent text-lg leading-[1.36] font-normal text-ink xl:h-[198px] xl:text-2xl'>
            <div className='grid grid-cols-[96px_minmax(0,1fr)] xl:grid-cols-[112px_minmax(0,1fr)]'>
              <dt className='m-0 font-[inherit]'>{copy.info.hours}</dt>
              <dd className='m-0 font-[inherit]'>
                <span className='block'>{siteConfig.lunchHours}</span>
                <span className='block'>{siteConfig.dinnerHours}</span>
              </dd>
            </div>
            <div className='grid grid-cols-[96px_minmax(0,1fr)] xl:grid-cols-[112px_minmax(0,1fr)]'>
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
            <div className='grid grid-cols-[96px_minmax(0,1fr)] xl:grid-cols-[112px_minmax(0,1fr)]'>
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
            className='gusto-about-page-barrel absolute top-[105px] right-0 left-auto z-[1] hidden h-[199px] w-[310.31px] object-contain sm:block xl:top-[477.66px] xl:right-auto xl:left-[220px] xl:h-[255.62px] xl:w-[398.6px] 3xl:top-[555px] 3xl:left-0 3xl:h-[354.46px] 3xl:w-[552.71px]'
          />
        </div>
      </div>

      <div className='gusto-about-page-interior absolute top-[484px] left-4 h-[397px] w-[361px] max-w-[calc(100%_-_32px)] translate-x-0 sm:top-[452px] sm:left-1/2 sm:h-[776px] sm:w-[709px] sm:max-w-none sm:-translate-x-1/2 xl:top-6 xl:left-[732px] xl:translate-x-0 3xl:top-0 3xl:left-[849px] 3xl:h-[1066px] 3xl:w-[973px]'>
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
        className='absolute right-8 bottom-[100px] z-[4] hidden size-12 items-center justify-center rounded-full border-[3px] border-coral font-display text-3xl leading-none font-normal text-coral no-underline xl:flex 3xl:right-[72px] 3xl:size-[74px] 3xl:border-[5px] 3xl:text-[46px]'
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
