import Image from 'next/image';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero relative isolate h-[min(66.458vw,1276px)] min-h-[900px] overflow-hidden px-[max(8vw,calc((100vw_-_1440px)/2))] py-[205px] xl:h-[952px] xl:min-h-[952px] xl:p-0 max-md:h-auto max-md:min-h-[470px] max-md:px-[15%] max-md:pt-[5.2rem] max-md:pb-20 sm:h-[844px] sm:min-h-[844px] sm:p-0 xs:h-[675px] xs:min-h-[675px] xs:px-[16px] xs:py-0'>
      <Marquee
        className='gusto-vertical top-[304.5px] left-[90px] xl:top-[163.935059px] max-md:top-[27%] max-md:left-[5%] max-md:text-[clamp(1.1rem,4vw,2rem)] max-md:leading-[1.1] max-md:tracking-[0.2em] max-md:[text-shadow:none] sm:top-[233.500009px] sm:left-[-233.499996px] sm:flex sm:h-[60px] sm:w-[527px] sm:origin-center sm:items-center sm:justify-start sm:text-[length:68px] sm:leading-[90px] sm:tracking-[-0.25em] sm:[text-shadow:var(--shadow-hero-title)] xs:hidden'
        text={copy.home.verticalTitle}
      />
      <div className='relative z-[2] max-w-[596px] xl:absolute xl:top-[204.869141px] xl:left-[202.271194px] xl:w-[424px] xl:max-w-none sm:absolute sm:top-0 sm:left-[86.237976px] sm:w-[424px] sm:max-w-none xs:absolute xs:top-0 xs:left-[16px] xs:w-[361px] xs:max-w-none'>
        <h1 className='whitespace-pre-line font-display text-[clamp(4.5rem,5.21vw,100px)] leading-[108px] font-normal tracking-[-0.3em] text-coral xl:w-[424px] xl:text-[68px] xl:leading-[80px] xl:tracking-[-0.2em] max-md:text-[clamp(1.55rem,5vw,2.5rem)] max-md:leading-[1.35] max-md:tracking-normal sm:h-[240px] sm:w-[424px] sm:text-[68px] sm:leading-[80px] sm:tracking-[-0.2em] xs:h-[180px] xs:w-[361px] xs:text-center xs:text-5xl xs:leading-[60px] xs:tracking-[-0.2em]'>
          {copy.hero.titleSegments.map((line, lineIndex) => (
            <span className='block' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    'emphasis' in segment && segment.emphasis
                      ? 'gusto-hero-title-emphasis sm:text-[86px] xs:text-[68px]'
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
          className='gusto-hero-nav mt-[68px] grid gap-[18px] font-label text-[28px] leading-6 font-bold xl:absolute xl:top-[calc(532.714966px_-_204.869141px)] xl:left-[2.556107px] xl:mt-0 sm:hidden xs:hidden [&_a]:w-max [&_a]:text-ink [&_a]:no-underline'
        >
          <a href=''>{copy.home.heroNav.home}</a>
          <a href='#about'>{copy.home.heroNav.about}</a>
          <a href='#recommendations'>{copy.home.heroNav.menu}</a>
          <a href='#access'>{copy.home.heroNav.access}</a>
          <a href='#reservation'>{copy.home.heroNav.reservation}</a>
        </nav>
      </div>
      <Image
        src='/images/dishes.png'
        alt={copy.home.heroDishesAlt}
        fill
        priority
        sizes='(max-width: 768px) 90vw, 65vw'
        className='gusto-hero-dishes z-[1] object-contain object-right-top [height:92%]! [left:32.8125%]! [top:0]! [width:68%]! xl:object-fill xl:object-center xl:[height:908.671057px]! xl:[left:627.082397px]! xl:[top:-59.054199px]! xl:[width:844.035925px]! max-md:[height:58%]! max-md:[left:23%]! max-md:[width:89%]! sm:object-fill sm:object-center sm:[height:797.771484px]! sm:[left:141.321472px]! sm:[top:-1.597839px]! sm:[width:739.296631px]! xs:max-w-none! xs:object-fill xs:object-center xs:[height:501.597656px]! xs:[left:-17.040405px]! xs:[top:123.562851px]! xs:[width:464.832825px]!'
      />
      <Image
        src='/images/four-veggies.png'
        alt=''
        width={360}
        height={246}
        className='gusto-hero-veg absolute top-[675px] left-[24.0625%] z-[2] h-auto w-[360px] opacity-70 xl:top-[549.103516px] xl:left-[394.24704px] xl:w-[415.595337px] xl:opacity-100 sm:top-[597.101837px] sm:bottom-auto sm:left-[86.73233px] sm:h-[237.561798px] sm:w-[347.39679px] sm:opacity-100 xs:top-[516.244629px] xs:bottom-auto xs:left-[16px] xs:h-[137.972656px] xs:w-[201.76062px] xs:opacity-100'
      />
      <a
        className='gusto-hero-caret absolute top-[1026px] right-[72px] z-[4] flex size-[74px] items-center justify-center rounded-full border-[5px] border-coral font-display text-[46px] leading-none font-normal text-coral no-underline max-md:hidden'
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
        className='gusto-hero-brush pointer-events-none absolute inset-x-0 bottom-[-1px]! z-[3] block h-auto! w-full! max-w-none! sm:hidden xs:hidden'
      />
    </section>
  );
}
