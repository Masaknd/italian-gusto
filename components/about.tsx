import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href='#wine'
      className='gusto-about-more flex h-auto w-max items-center gap-[min(1.667vw,32px)] font-accent text-[clamp(0.75rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light underline underline-offset-4 xl:max-2xl:h-[60px] xl:max-2xl:gap-8 xl:max-2xl:text-2xl xl:max-2xl:leading-[1.36] sm:max-md:h-[60px] sm:max-md:w-[720px] sm:max-md:justify-center sm:max-md:gap-8 sm:max-md:text-[22px] sm:max-md:leading-6 xs:h-[60px] xs:w-full xs:justify-start xs:gap-8 xs:text-lg xs:leading-6 xs:no-underline'
    >
      <span className='xs:min-w-0 xs:flex-1'>{children}</span>
      <svg
        className='h-auto w-[clamp(3.5rem,5.8vw,6.96rem)] shrink-0 overflow-visible fill-none stroke-current stroke-1 xl:max-2xl:w-[111.396759px] max-md:h-[60px] max-md:w-[111.396759px]'
        aria-hidden='true'
        viewBox='0 0 111.4 60'
        focusable='false'
      >
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
      </svg>
    </Link>
  );
}

export function HomeAboutSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about'
      className="relative flex h-[min(61.77vw,1186px)] min-h-0 items-start justify-center gap-[min(1.25vw,24px)] bg-ink pt-[min(6.25vw,120px)] text-paper before:absolute before:inset-x-0 before:bottom-[-1px] before:z-[3] before:h-[clamp(24px,4vw,78px)] before:bg-ink before:[clip-path:polygon(0_24%,5%_61%,10%_47%,16%_85%,22%_43%,29%_66%,35%_28%,43%_70%,49%_46%,56%_88%,63%_42%,70%_65%,77%_30%,85%_72%,93%_42%,100%_67%,100%_100%,0_100%)] before:content-[''] xl:max-2xl:h-[832px] xl:max-2xl:gap-6 xl:max-2xl:p-[60px_96px_100px] sm:max-md:block sm:max-md:h-[1239.476807px] sm:max-md:bg-transparent sm:max-md:p-0 sm:max-md:after:absolute sm:max-md:after:inset-[56.62664px_0_auto] sm:max-md:after:z-0 sm:max-md:after:h-[1182.850098px] sm:max-md:after:bg-ink sm:max-md:after:content-[''] xs:h-auto xs:flex-row xs:flex-wrap xs:items-start xs:gap-x-0 xs:gap-y-8 xs:bg-transparent xs:px-4 xs:pt-[calc(28.976917px_+_48px)] xs:pb-12 xs:after:absolute xs:after:inset-[28.976917px_0_0] xs:after:z-0 xs:after:bg-ink xs:after:content-['']"
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='768px'
        className='gusto-about-brush pointer-events-none absolute top-0 left-0 z-[1] hidden w-full object-fill sm:max-md:block sm:max-md:h-[56.62664px] xs:block xs:h-[28.976917px]'
      />
      <div className='gusto-about-left relative h-[min(39.48vw,758px)] w-[min(30.47vw,585px)] xl:max-2xl:h-[672px] xl:max-2xl:w-[612px] sm:max-md:absolute sm:max-md:top-[calc(56.62664px_+_64px)] sm:max-md:left-6 sm:max-md:z-[2] sm:max-md:h-[352.000031px] sm:max-md:w-[720px] xs:relative xs:z-[2] xs:order-[-1] xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto'>
        <div className='relative z-[2] flex w-full flex-col gap-[min(2.5vw,48px)] xl:max-2xl:w-[612px] xl:max-2xl:gap-12 sm:max-md:h-[352.000031px] sm:max-md:w-[720px] sm:max-md:items-center sm:max-md:gap-12 xs:h-[408.000031px] xs:items-center xs:gap-12'>
          <div className="gusto-about-title relative h-[min(4.375vw,84px)] w-full after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] xl:max-2xl:h-[84px] xl:max-2xl:w-[320px] sm:max-md:h-[52.000023px] sm:max-md:w-[192px] sm:max-md:after:h-0.5 xs:h-[35px] xs:w-max xs:self-center xs:after:h-0.5">
            <h2 className='font-display text-[clamp(2.5rem,4.167vw,5rem)] leading-none font-normal tracking-[-0.25em] text-coral xl:max-2xl:text-[80px] sm:max-md:h-12 sm:max-md:whitespace-nowrap sm:max-md:text-[60px] sm:max-md:leading-12 xs:h-8 xs:whitespace-nowrap xs:text-5xl xs:leading-8'>
              {copy.home.aboutTitle}
            </h2>
          </div>
          <div className='gusto-about-body h-auto font-accent text-[clamp(0.85rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light xl:max-2xl:h-[231px] xl:max-2xl:w-[612px] xl:max-2xl:text-2xl xl:max-2xl:leading-[1.36] sm:max-md:h-36 sm:max-md:w-[597.013916px] sm:max-md:overflow-hidden sm:max-md:text-[22px] sm:max-md:leading-6 xs:h-[216px] xs:w-full xs:overflow-hidden xs:text-lg xs:leading-6'>
            {copy.home.aboutBody.map((paragraph) => (
              <p className='leading-[inherit] [&+&]:mt-0' key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <AboutMoreLink>{copy.home.aboutMore}</AboutMoreLink>
        </div>
        <Image
          src='/images/glasscheese.png'
          alt=''
          width={276}
          height={239}
          className='absolute top-[min(27.03vw,519px)] left-0 z-[2] h-auto w-[min(14.355vw,275.62px)] opacity-90 xl:max-2xl:top-[507.815918px] xl:max-2xl:w-[276px] xl:max-2xl:opacity-100 max-md:hidden'
        />
      </div>
      <div className='gusto-about-right w-[min(50.68vw,973px)] xl:max-2xl:h-[672px] xl:max-2xl:w-[612px] sm:max-md:absolute sm:max-md:top-[calc(56.62664px_+_448px)] sm:max-md:left-6 sm:max-md:z-[2] sm:max-md:h-[670.850098px] sm:max-md:w-[720px] xs:relative xs:z-[2] xs:h-[397px] xs:min-w-0 xs:basis-full xs:w-auto'>
        <div className='gusto-about-image relative aspect-[973/1066] w-full xl:max-2xl:h-[672px] xl:max-2xl:w-[612px] xl:max-2xl:[aspect-ratio:auto] sm:max-md:mx-auto sm:max-md:h-[670.850098px] sm:max-md:w-[611.997742px] xs:h-[397px] xs:w-full'>
          <Image
            src='/images/inside.png'
            alt={copy.home.aboutImageAlt}
            fill
            sizes='(max-width: 768px) 92vw, 51vw'
            className='object-contain xs:object-fill'
          />
        </div>
      </div>
    </section>
  );
}
