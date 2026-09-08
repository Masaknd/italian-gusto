import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';

export function AboutPageHero({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about-story'
      className='gusto-about-page-hero relative flex w-full flex-col items-center justify-center gap-8 px-4 py-[24px_48px] text-ink sm:p-[32px_32px_64px_32px] lg:flex-row xl:p-[32px_96px_64px_96px] 3xl:p-[0px_240px_120px_240px]'
      aria-labelledby='gusto-about-page-title'
    >
      <div className='gusto-about-page-story gusto-about-left'>
        <div className='relative flex w-full flex-col items-start gap-12 xl:items-start'>
          <div className='gusto-about-title'>
            <h1
              id='gusto-about-page-title'
              className="relative w-max font-display text-3xl leading-12 font-normal tracking-[-0.25em] whitespace-nowrap text-coral after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-5xl sm:leading-16 xl:text-[80px] xl:leading-none 3xl:text-[clamp(2.5rem,4.167vw,5rem)] 3xl:after:h-[3px]"
            >
              {copy.home.aboutTitle}
            </h1>
          </div>

          <div className='gusto-about-page-copy gusto-about-body flex h-auto w-full flex-col gap-6 overflow-visible font-accent text-lg leading-6 text-ink sm:gap-8 sm:overflow-hidden sm:text-[22px] xl:w-[30vw] xl:text-2xl 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] [&_p]:leading-[inherit]'>
            {copy.home.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className='m-0 flex w-full flex-col gap-4 font-accent text-lg leading-6 font-normal text-ink sm:text-[22px] xl:w-[30vw] xl:text-2xl 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36]'>
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
            sizes='276px'
            className='gusto-about-page-barrel h-auto w-[300px] object-contain xl:w-[360px]'
          />
        </div>
      </div>

      <div className='gusto-about-page-interior gusto-about-right'>
        <div className='gusto-about-image w-full'>
          <Image
            src='/images/inside.png'
            alt={copy.home.aboutImageAlt}
            width={1944}
            height={2131}
            priority
            sizes='(max-width: 768px) 92vw, 51vw'
            className='h-auto object-contain'
          />
        </div>
      </div>
    </section>
  );
}
