import Image from 'next/image';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero relative isolate h-[min(66.458vw,1276px)] min-h-[900px] overflow-hidden px-[max(8vw,calc((100vw_-_1440px)/2))] py-[205px] xl:max-2xl:h-[952px] xl:max-2xl:min-h-[952px] xl:max-2xl:p-0 max-md:h-auto max-md:min-h-[470px] max-md:px-[15%] max-md:pt-[5.2rem] max-md:pb-20 sm:max-md:h-[844px] sm:max-md:min-h-[844px] sm:max-md:p-0 xs:h-[675px] xs:min-h-[675px] xs:px-[16px] xs:py-0'>
      <Marquee className='gusto-vertical top-[304.5px] left-[90px] xl:max-2xl:top-[163.935059px] max-md:top-[27%] max-md:left-[5%] max-md:text-[clamp(1.1rem,4vw,2rem)] max-md:leading-[1.1] max-md:tracking-[0.2em] max-md:[text-shadow:none] sm:max-md:top-[233.500009px] sm:max-md:left-[-233.499996px] sm:max-md:flex sm:max-md:h-[60px] sm:max-md:w-[527px] sm:max-md:origin-center sm:max-md:items-center sm:max-md:justify-start sm:max-md:text-[length:68px] sm:max-md:leading-[90px] sm:max-md:tracking-[-0.25em] sm:max-md:[text-shadow:var(--shadow-hero-title)] xs:hidden' text={copy.home.verticalTitle} />
      <div className='relative z-[2] max-w-[596px] xl:max-2xl:absolute xl:max-2xl:top-[204.869141px] xl:max-2xl:left-[202.271194px] xl:max-2xl:w-[424px] xl:max-2xl:max-w-none sm:max-md:absolute sm:max-md:top-0 sm:max-md:left-[86.237976px] sm:max-md:w-[424px] sm:max-md:max-w-none xs:absolute xs:top-0 xs:left-[16px] xs:w-[361px] xs:max-w-none'>
        <h1 className='whitespace-pre-line font-display text-[clamp(4.5rem,5.21vw,100px)] leading-[108px] font-normal tracking-[-0.3em] text-coral xl:max-2xl:w-[424px] xl:max-2xl:text-[68px] xl:max-2xl:leading-[80px] xl:max-2xl:tracking-[-0.2em] max-md:text-[clamp(1.55rem,5vw,2.5rem)] max-md:leading-[1.35] max-md:tracking-normal sm:max-md:h-[240px] sm:max-md:w-[424px] sm:max-md:text-[68px] sm:max-md:leading-[80px] sm:max-md:tracking-[-0.2em] xs:h-[180px] xs:w-[361px] xs:text-center xs:text-5xl xs:leading-[60px] xs:tracking-[-0.2em]'>
          {copy.hero.titleSegments.map((line, lineIndex) => (
            <span className='block' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    'emphasis' in segment && segment.emphasis
                      ? 'gusto-hero-title-emphasis sm:max-md:text-[86px] xs:text-[68px]'
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
        <nav aria-label={copy.home.heroNavLabel} className='gusto-hero-nav mt-[68px] grid gap-[18px] font-label text-[28px] leading-6 font-bold xl:max-2xl:absolute xl:max-2xl:top-[calc(532.714966px_-_204.869141px)] xl:max-2xl:left-[2.556107px] xl:max-2xl:mt-0 sm:max-md:hidden xs:hidden [&_a]:w-max [&_a]:text-ink [&_a]:no-underline'>
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
        className='gusto-hero-dishes z-[1] object-contain object-right-top [height:92%]! [left:32.8125%]! [top:0]! [width:68%]! xl:max-2xl:object-fill xl:max-2xl:object-center xl:max-2xl:[height:908.671057px]! xl:max-2xl:[left:627.082397px]! xl:max-2xl:[top:-59.054199px]! xl:max-2xl:[width:844.035925px]! max-md:[height:58%]! max-md:[left:23%]! max-md:[width:89%]! sm:max-md:object-fill sm:max-md:object-center sm:max-md:[height:797.771484px]! sm:max-md:[left:141.321472px]! sm:max-md:[top:-1.597839px]! sm:max-md:[width:739.296631px]! xs:max-w-none! xs:object-fill xs:object-center xs:[height:501.597656px]! xs:[left:-17.040405px]! xs:[top:123.562851px]! xs:[width:464.832825px]!'
      />
      <Image
        src='/images/four-veggies.png'
        alt=''
        width={360}
        height={246}
        className='gusto-hero-veg absolute top-[675px] left-[24.0625%] z-[2] h-auto w-[360px] opacity-70 xl:max-2xl:top-[549.103516px] xl:max-2xl:left-[394.24704px] xl:max-2xl:w-[415.595337px] xl:max-2xl:opacity-100 sm:max-md:top-[597.101837px] sm:max-md:bottom-auto sm:max-md:left-[86.73233px] sm:max-md:h-[237.561798px] sm:max-md:w-[347.39679px] sm:max-md:opacity-100 xs:top-[516.244629px] xs:bottom-auto xs:left-[16px] xs:h-[137.972656px] xs:w-[201.76062px] xs:opacity-100'
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
        className='gusto-hero-brush pointer-events-none absolute inset-x-0 bottom-[-1px]! z-[3] block h-auto! w-full! max-w-none! sm:max-md:hidden xs:hidden'
      />
    </section>
  );
}
