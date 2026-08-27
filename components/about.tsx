import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href='#wine'
      className='gusto-about-more flex h-auto w-max items-center gap-[min(1.667vw,32px)] font-accent text-[clamp(0.75rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light underline underline-offset-4 xl:h-[60px] xl:gap-8 xl:text-2xl xl:leading-[1.36] sm:h-[60px] sm:w-[720px] sm:justify-center sm:gap-8 sm:text-[22px] sm:leading-6 xs:h-[60px] xs:w-full xs:justify-start xs:gap-8 xs:text-lg xs:leading-6 xs:no-underline'
    >
      <span className='xs:min-w-0 xs:flex-1'>{children}</span>
      <svg
        className='h-auto w-[clamp(3.5rem,5.8vw,6.96rem)] shrink-0 overflow-visible fill-none stroke-current stroke-1 xl:w-[111.396759px] max-md:h-[60px] max-md:w-[111.396759px]'
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
      className="relative flex h-[min(61.77vw,1186px)] min-h-0 items-start justify-center gap-[min(1.25vw,24px)] bg-ink pt-[min(6.25vw,120px)] text-paper before:absolute before:inset-x-0 before:bottom-[-1px] before:z-[3] before:h-[clamp(24px,4vw,78px)] before:bg-ink before:[clip-path:polygon(0_24%,5%_61%,10%_47%,16%_85%,22%_43%,29%_66%,35%_28%,43%_70%,49%_46%,56%_88%,63%_42%,70%_65%,77%_30%,85%_72%,93%_42%,100%_67%,100%_100%,0_100%)] before:content-[''] xl:h-[832px] xl:gap-6 xl:p-[60px_96px_100px] sm:block sm:h-[1239.476807px] sm:bg-transparent sm:p-0 sm:after:absolute sm:after:inset-[56.62664px_0_auto] sm:after:z-0 sm:after:h-[1182.850098px] sm:after:bg-ink sm:after:content-[''] xs:h-auto xs:flex-row xs:flex-wrap xs:items-start xs:gap-x-0 xs:gap-y-8 xs:bg-transparent xs:px-4 xs:pt-[calc(28.976917px_+_48px)] xs:pb-12 xs:after:absolute xs:after:inset-[28.976917px_0_0] xs:after:z-0 xs:after:bg-ink xs:after:content-['']"
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='768px'
        className='gusto-about-brush pointer-events-none absolute top-0 left-0 z-[1] hidden w-full object-fill sm:block sm:h-[56.62664px] xs:block xs:h-[28.976917px]'
      />
      <div className='gusto-about-left relative h-[min(39.48vw,758px)] w-[min(30.47vw,585px)] xl:h-[672px] xl:w-[612px] sm:absolute sm:top-[calc(56.62664px_+_64px)] sm:left-6 sm:z-[2] sm:h-[352.000031px] sm:w-[720px] xs:relative xs:z-[2] xs:order-[-1] xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto'>
        <div className='relative z-[2] flex w-full flex-col gap-[min(2.5vw,48px)] xl:w-[612px] xl:gap-12 sm:h-[352.000031px] sm:w-[720px] sm:items-center sm:gap-12 xs:h-[408.000031px] xs:items-center xs:gap-12'>
          <div className="gusto-about-title relative h-[min(4.375vw,84px)] w-full after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] xl:h-[84px] xl:w-[320px] sm:h-[52.000023px] sm:w-[192px] sm:after:h-0.5 xs:h-[35px] xs:w-max xs:self-center xs:after:h-0.5">
            <h2 className='font-display text-[clamp(2.5rem,4.167vw,5rem)] leading-none font-normal tracking-[-0.25em] text-coral xl:text-[80px] sm:h-12 sm:whitespace-nowrap sm:text-[60px] sm:leading-12 xs:h-8 xs:whitespace-nowrap xs:text-5xl xs:leading-8'>
              {copy.home.aboutTitle}
            </h2>
          </div>
          <div className='gusto-about-body h-auto font-accent text-[clamp(0.85rem,1.25vw,1.5rem)] leading-[1.375] text-warm-light xl:h-[231px] xl:w-[612px] xl:text-2xl xl:leading-[1.36] sm:h-36 sm:w-[597.013916px] sm:overflow-hidden sm:text-[22px] sm:leading-6 xs:h-[216px] xs:w-full xs:overflow-hidden xs:text-lg xs:leading-6'>
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
          className='absolute top-[min(27.03vw,519px)] left-0 z-[2] h-auto w-[min(14.355vw,275.62px)] opacity-90 xl:top-[507.815918px] xl:w-[276px] xl:opacity-100 max-md:hidden'
        />
      </div>
      <div className='gusto-about-right w-[min(50.68vw,973px)] xl:h-[672px] xl:w-[612px] sm:absolute sm:top-[calc(56.62664px_+_448px)] sm:left-6 sm:z-[2] sm:h-[670.850098px] sm:w-[720px] xs:relative xs:z-[2] xs:h-[397px] xs:min-w-0 xs:basis-full xs:w-auto'>
        <div className='gusto-about-image relative aspect-[973/1066] w-full xl:h-[672px] xl:w-[612px] xl:[aspect-ratio:auto] sm:mx-auto sm:h-[670.850098px] sm:w-[611.997742px] xs:h-[397px] xs:w-full'>
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
