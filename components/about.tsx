import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href='#wine'
      className='gusto-about-more flex h-[60px] w-full items-center justify-start gap-8 font-accent text-lg leading-6 text-warm-light no-underline sm:w-[720px] sm:justify-center sm:text-[22px] xl:w-max xl:text-2xl xl:leading-[1.36] xl:underline xl:underline-offset-4 3xl:h-auto 3xl:gap-[min(1.667vw,32px)] 3xl:text-[clamp(0.75rem,1.25vw,1.5rem)] 3xl:leading-[1.375]'
    >
      <span className='min-w-0 flex-1 sm:flex-none'>{children}</span>
      <svg
        className='h-[60px] w-[111.396759px] shrink-0 overflow-visible fill-none stroke-current stroke-1 3xl:h-auto 3xl:w-[clamp(3.5rem,5.8vw,6.96rem)]'
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
      className="relative flex h-auto min-h-0 flex-row flex-wrap items-start justify-center gap-x-0 gap-y-8 bg-transparent px-4 pt-[calc(28.976917px_+_48px)] pb-12 text-paper before:absolute before:inset-x-0 before:bottom-[-1px] before:z-[3] before:h-[clamp(24px,4vw,78px)] before:bg-ink before:content-[''] before:[clip-path:polygon(0_24%,5%_61%,10%_47%,16%_85%,22%_43%,29%_66%,35%_28%,43%_70%,49%_46%,56%_88%,63%_42%,70%_65%,77%_30%,85%_72%,93%_42%,100%_67%,100%_100%,0_100%)] after:absolute after:inset-[28.976917px_0_0] after:z-0 after:bg-ink after:content-[''] sm:block sm:h-[1239.476807px] sm:p-0 sm:after:inset-[56.62664px_0_auto] sm:after:h-[1182.850098px] xl:flex xl:h-[832px] xl:flex-nowrap xl:gap-6 xl:bg-ink xl:p-[60px_96px_100px] xl:after:content-none 3xl:h-[min(61.77vw,1186px)] 3xl:gap-[min(1.25vw,24px)] 3xl:p-0 3xl:pt-[min(6.25vw,120px)]"
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='768px'
        className='gusto-about-brush pointer-events-none absolute top-0 left-0 z-[1] block h-[28.976917px] w-full object-fill sm:h-[56.62664px] xl:hidden'
      />
      <div className='gusto-about-left relative z-[2] order-[-1] h-auto min-w-0 basis-full sm:absolute sm:top-[calc(56.62664px_+_64px)] sm:left-6 sm:h-[352.000031px] sm:w-[720px] xl:relative xl:top-auto xl:left-auto xl:order-none xl:h-[672px] xl:w-[612px] xl:basis-auto 3xl:h-[min(39.48vw,758px)] 3xl:w-[min(30.47vw,585px)]'>
        <div className='relative z-[2] flex h-[408.000031px] w-full flex-col items-center gap-12 sm:h-[352.000031px] sm:w-[720px] xl:h-auto xl:w-[612px] xl:items-start 3xl:w-full 3xl:gap-[min(2.5vw,48px)]'>
          <div className='gusto-about-title relative self-center xl:self-auto'>
            <h2 className="w-max font-display text-5xl leading-8 font-normal tracking-[-0.25em] whitespace-nowrap text-coral after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-[60px] sm:leading-12 xl:text-[80px] xl:leading-none 3xl:text-[clamp(2.5rem,4.167vw,5rem)] 3xl:after:h-[3px]">
              {copy.home.aboutTitle}
            </h2>
          </div>
          <div className='gusto-about-body h-[216px] w-full overflow-hidden font-accent text-lg leading-6 text-warm-light sm:h-36 sm:w-[597.013916px] sm:text-[22px] xl:h-[231px] xl:w-[612px] xl:text-2xl xl:leading-[1.36] 3xl:h-auto 3xl:w-auto 3xl:overflow-visible 3xl:text-[clamp(0.85rem,1.25vw,1.5rem)] 3xl:leading-[1.375]'>
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
          className='absolute top-[507.815918px] left-0 z-[2] hidden h-auto w-[276px] opacity-100 xl:block 3xl:top-[min(27.03vw,519px)] 3xl:w-[min(14.355vw,275.62px)] 3xl:opacity-90'
        />
      </div>
      <div className='gusto-about-right relative z-[2] h-[397px] min-w-0 basis-full sm:absolute sm:top-[calc(56.62664px_+_448px)] sm:left-6 sm:h-[670.850098px] sm:w-[720px] xl:relative xl:top-auto xl:left-auto xl:h-[672px] xl:w-[612px] xl:basis-auto 3xl:h-auto 3xl:w-[min(50.68vw,973px)]'>
        <div className='gusto-about-image relative h-[397px] w-full sm:mx-auto sm:h-[670.850098px] sm:w-[611.997742px] xl:h-[672px] xl:w-[612px] 3xl:aspect-[973/1066] 3xl:h-auto 3xl:w-full'>
          <Image
            src='/images/inside.png'
            alt={copy.home.aboutImageAlt}
            fill
            sizes='(max-width: 768px) 92vw, 51vw'
            className='object-fill sm:object-contain'
          />
        </div>
      </div>
    </section>
  );
}
