import Image from 'next/image';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero relative isolate h-screen overflow-hidden px-4 py-0 sm:px-[86px] xl:px-24 xl:py-[132px_64px] 3xl:px-[max(12vw,calc((100vw_-_1920px)/2))] 3xl:py-[132px_64px]'>
      <Marquee
        className='gusto-vertical hidden sm:top-[400px] sm:left-[-235px] sm:flex sm:h-[60px] sm:w-[527px] sm:origin-center sm:items-center sm:justify-start sm:text-[length:68px] sm:leading-[90px] sm:tracking-[-0.25em] sm:[text-shadow:var(--shadow-hero-title)] xl:top-[164px] xl:left-[90px] xl:block xl:h-auto xl:w-auto xl:origin-top-left xl:text-[86px] xl:leading-[90px] xl:tracking-[-0.25em] 3xl:top-[305px]'
        text={copy.home.verticalTitle}
      />
      {/* container */}
      <div className='relative w-full'>
        {/* left content */}
        <div className='absolute z-10 flex w-max flex-col gap-12 sm:top-0 sm:left-0 xl:top-30 xl:left-30 3xl:top-30 3xl:left-10'>
          <h1 className='h-[180px] w-[361px] text-center font-display text-5xl leading-[50px] font-normal tracking-[-0.2em] whitespace-pre-line text-coral sm:h-[240px] sm:w-[424px] sm:text-left sm:text-[68px] sm:leading-[70px] 3xl:h-auto 3xl:w-auto 3xl:text-[clamp(4.5rem,5.21vw,100px)] 3xl:leading-[108px] 3xl:tracking-[-0.3em]'>
            {copy.hero.titleSegments.map((line, lineIndex) => (
              <span className='block' key={lineIndex}>
                {line.map((segment, segmentIndex) => (
                  <span
                    className={
                      'emphasis' in segment && segment.emphasis
                        ? 'gusto-hero-title-emphasis text-[68px] sm:text-[86px] 3xl:text-[126px]'
                        : undefined
                    }
                    key={`${lineIndex}-${segmentIndex}`}
                  >
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <nav
            aria-label={copy.home.heroNavLabel}
            className='gusto-hero-nav relative hidden gap-[18px] font-label text-[28px] leading-6 font-bold xl:flex xl:flex-col'
          >
            <a href=''>{copy.home.heroNav.home}</a>
            <a href='#about'>{copy.home.heroNav.about}</a>
            <a href='#recommendations'>{copy.home.heroNav.menu}</a>
            <a href='#access'>{copy.home.heroNav.access}</a>
            <a href='#reservation'>{copy.home.heroNav.reservation}</a>
          </nav>
          <Image
            src='/images/four-veggies.png'
            alt=''
            width={360}
            height={246}
            className='gusto-hero-veg absolute right-40 -bottom-125 z-2 h-auto w-[202px] sm:right-0 sm:-bottom-160 sm:w-[347px] 2xl:-right-25 2xl:-bottom-20 2xl:w-[315px] 3xl:right-0 3xl:-bottom-30 3xl:w-[360px]'
          />
        </div>
        {/* right content */}
        <div className='absolute top-30 -right-15 w-max sm:top-0 sm:-right-50 xl:-top-40 xl:-right-30 3xl:-top-50 3xl:right-0'>
          <Image
            src='/images/dishes.png'
            alt={copy.home.heroDishesAlt}
            width={768}
            height={480}
            priority
            className='gusto-hero-dishes h-auto w-[min(120vw,150vw)] object-contain sm:w-[min(100vw,150vw)] 2xl:w-[min(60vw,120vw)] 3xl:w-[min(50vw,120vw)]'
          />
        </div>
      </div>
      <a
        className='gusto-hero-caret absolute top-[1026px] right-[72px] z-[4] hidden size-[74px] items-center justify-center rounded-full border-[5px] border-coral font-display text-[46px] leading-none font-normal text-coral no-underline lg:flex'
        href='#about'
        aria-label={copy.home.heroScrollLabel}
      >
        <span aria-hidden='true'>↑</span>
      </a>
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className='gusto-hero-brush pointer-events-none absolute bottom-0 left-0 z-[3] h-auto w-full translate-y-px'
      />
    </section>
  );
}
