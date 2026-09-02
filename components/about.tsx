import Image from 'next/image';
import Link from 'next/link';
import type { HomePageCopy } from './types';

function AboutMoreLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href='#wine'
      className='gusto-about-more mt-8 flex w-full items-center justify-start gap-8 font-accent text-lg leading-6 text-warm-light no-underline sm:w-max sm:text-[22px] xl:mt-12 xl:text-2xl xl:underline xl:underline-offset-4 3xl:text-[24px] 3xl:leading-[1.36]'
    >
      <span className='min-w-0 flex-1 sm:flex-none'>{children}</span>
      <svg
        className='group h-[60px] w-[111.396759px] shrink-0 overflow-visible fill-none stroke-current stroke-1 3xl:h-auto 3xl:w-[clamp(3.5rem,5.8vw,6.96rem)]'
        aria-hidden='true'
        viewBox='0 0 111.4 60'
        focusable='false'
      >
        <circle cx='46' cy='30' r='29.5' />
        <path
          d='M37 30h73m-22-22 22 22-22 22'
          className='transform duration-200 group-hover:translate-x-6'
        />
      </svg>
    </Link>
  );
}

export function HomeAboutSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='about'
      className='relative flex w-full flex-col items-center justify-center gap-8 bg-ink px-4 py-12 text-paper sm:p-[64px_32px] xl:flex-row xl:p-[64px_96px] 3xl:p-[120px_240px]'
    >
      <div className='gusto-about-left'>
        <div className='relative flex w-full flex-col items-start gap-12 xl:items-start'>
          <div className='gusto-about-title'>
            <h2 className="relative w-max font-display text-5xl leading-12 font-normal tracking-[-0.25em] whitespace-nowrap text-coral after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-[60px] sm:leading-16 xl:text-[80px] xl:leading-none 3xl:text-[clamp(2.5rem,4.167vw,5rem)] 3xl:after:h-[3px]">
              {copy.home.aboutTitle}
            </h2>
          </div>
          <div className='gusto-about-body flex h-auto w-full flex-col gap-6 overflow-visible font-accent text-lg leading-6 text-warm-light sm:gap-8 sm:overflow-hidden sm:text-[22px] xl:w-[30vw] xl:text-2xl 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] [&_p]:leading-[inherit]'>
            {copy.home.aboutBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <AboutMoreLink>{copy.home.aboutMore}</AboutMoreLink>
          <Image
            src='/images/glasscheese.png'
            alt='glass wine and cheese'
            width={276}
            height={239}
            className=''
          />
        </div>
      </div>
      <div className='gusto-about-right'>
        <div className='gusto-about-image w-full'>
          <Image
            src='/images/inside.png'
            alt={copy.home.aboutImageAlt}
            width={768}
            height={480}
            sizes='(max-width: 768px) 92vw, 51vw'
            className='object-contain'
          />
        </div>
      </div>
    </section>
  );
}
