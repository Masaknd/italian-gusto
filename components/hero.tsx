import Image from 'next/image';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero relative isolate h-[675px] min-h-[675px] overflow-hidden px-4 py-0 sm:h-[844px] sm:min-h-[844px] sm:p-0 xl:h-[952px] xl:min-h-[952px] xl:p-0 3xl:h-[min(66.458vw,1276px)] 3xl:min-h-[900px] 3xl:px-[max(8vw,calc((100vw_-_1440px)/2))] 3xl:py-[205px]'>
      <Marquee
        className='gusto-vertical hidden sm:top-[233.500009px] sm:left-[-233.499996px] sm:flex sm:h-[60px] sm:w-[527px] sm:origin-center sm:items-center sm:justify-start sm:text-[length:68px] sm:leading-[90px] sm:tracking-[-0.25em] sm:[text-shadow:var(--shadow-hero-title)] xl:top-[163.935059px] xl:left-[90px] xl:block xl:h-auto xl:w-auto xl:origin-top-left xl:text-[86px] xl:leading-[90px] xl:tracking-[-0.25em] 3xl:top-[304.5px]'
        text={copy.home.verticalTitle}
      />
      <div className='absolute top-0 left-4 z-[2] w-[361px] max-w-none sm:left-[86.237976px] sm:w-[424px] xl:top-[204.869141px] xl:left-[202.271194px] 3xl:relative 3xl:top-auto 3xl:left-auto 3xl:w-auto 3xl:max-w-[596px]'>
        <h1 className='h-[180px] w-[361px] text-center font-display text-5xl leading-[60px] font-normal tracking-[-0.2em] whitespace-pre-line text-coral sm:h-[240px] sm:w-[424px] sm:text-[68px] sm:leading-[80px] xl:text-left 3xl:h-auto 3xl:w-auto 3xl:text-[clamp(4.5rem,5.21vw,100px)] 3xl:leading-[108px] 3xl:tracking-[-0.3em]'>
          {copy.hero.titleSegments.map((line, lineIndex) => (
            <span className='block' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    'emphasis' in segment && segment.emphasis
                      ? 'gusto-hero-title-emphasis text-[68px] sm:text-[86px] 3xl:text-[inherit]'
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
          className='gusto-hero-nav hidden gap-[18px] font-label text-[28px] leading-6 font-bold xl:absolute xl:top-[calc(532.714966px_-_204.869141px)] xl:left-[2.556107px] xl:grid 3xl:static 3xl:mt-[68px] [&_a]:w-max [&_a]:text-ink [&_a]:no-underline'
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
        className='gusto-hero-dishes [top:123.562851px]! [left:-17.040405px]! z-[1] [height:501.597656px]! [width:464.832825px]! max-w-none! object-fill object-center sm:[top:-1.597839px]! sm:[left:141.321472px]! sm:[height:797.771484px]! sm:[width:739.296631px]! xl:[top:-59.054199px]! xl:[left:627.082397px]! xl:[height:908.671057px]! xl:[width:844.035925px]! 3xl:[top:0]! 3xl:[left:32.8125%]! 3xl:[height:92%]! 3xl:[width:68%]! 3xl:object-contain 3xl:object-right-top'
      />
      <Image
        src='/images/four-veggies.png'
        alt=''
        width={360}
        height={246}
        className='gusto-hero-veg absolute top-[516.244629px] bottom-auto left-4 z-[2] h-[137.972656px] w-[201.76062px] opacity-100 sm:top-[597.101837px] sm:left-[86.73233px] sm:h-[237.561798px] sm:w-[347.39679px] xl:top-[549.103516px] xl:left-[394.24704px] xl:h-auto xl:w-[415.595337px] 3xl:top-[675px] 3xl:left-[24.0625%] 3xl:w-[360px] 3xl:opacity-70'
      />
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
        className='gusto-hero-brush pointer-events-none absolute inset-x-0 bottom-[-1px]! z-[3] hidden h-auto! w-full! max-w-none! xl:block'
      />
    </section>
  );
}
