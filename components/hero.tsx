import Image from 'next/image';
import type { HomePageCopy } from './types';
import { Marquee } from './marquee';

export function HomeHeroSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section className='gusto-hero relative isolate h-[min(66.458vw,1276px)] min-h-[900px] overflow-hidden px-[max(8vw,calc((100vw_-_1440px)/2))] py-[205px] min-[1200px]:max-[1599px]:h-[952px] min-[1200px]:max-[1599px]:min-h-[952px] min-[1200px]:max-[1599px]:p-0 max-[768.02px]:h-auto max-[768.02px]:min-h-[470px] max-[768.02px]:px-[15%] max-[768.02px]:pt-[5.2rem] max-[768.02px]:pb-20 min-[481px]:max-[768.02px]:h-[844px] min-[481px]:max-[768.02px]:min-h-[844px] min-[481px]:max-[768.02px]:p-0 max-[480px]:h-[675px] max-[480px]:min-h-[675px] max-[480px]:px-[16px] max-[480px]:py-0'>
      <Marquee className='gusto-vertical top-[304.5px] left-[90px] min-[1200px]:max-[1599px]:top-[163.935059px] max-[768.02px]:top-[27%] max-[768.02px]:left-[5%] max-[768.02px]:text-[clamp(1.1rem,4vw,2rem)] max-[768.02px]:leading-[1.1] max-[768.02px]:tracking-[0.2em] max-[768.02px]:[text-shadow:none] min-[481px]:max-[768.02px]:top-[233.500009px] min-[481px]:max-[768.02px]:left-[-233.499996px] min-[481px]:max-[768.02px]:flex min-[481px]:max-[768.02px]:h-[60px] min-[481px]:max-[768.02px]:w-[527px] min-[481px]:max-[768.02px]:origin-center min-[481px]:max-[768.02px]:items-center min-[481px]:max-[768.02px]:justify-start min-[481px]:max-[768.02px]:text-[length:68px] min-[481px]:max-[768.02px]:leading-[90px] min-[481px]:max-[768.02px]:tracking-[-0.25em] min-[481px]:max-[768.02px]:[text-shadow:var(--shadow-hero-title)] max-[480px]:hidden' text={copy.home.verticalTitle} />
      <div className='relative z-[2] max-w-[596px] min-[1200px]:max-[1599px]:absolute min-[1200px]:max-[1599px]:top-[204.869141px] min-[1200px]:max-[1599px]:left-[202.271194px] min-[1200px]:max-[1599px]:w-[424px] min-[1200px]:max-[1599px]:max-w-none min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-0 min-[481px]:max-[768.02px]:left-[86.237976px] min-[481px]:max-[768.02px]:w-[424px] min-[481px]:max-[768.02px]:max-w-none max-[480px]:absolute max-[480px]:top-0 max-[480px]:left-[16px] max-[480px]:w-[361px] max-[480px]:max-w-none'>
        <h1 className='whitespace-pre-line font-display text-[clamp(4.5rem,5.21vw,100px)] leading-[108px] font-normal tracking-[-0.3em] text-coral min-[1200px]:max-[1599px]:w-[424px] min-[1200px]:max-[1599px]:text-[68px] min-[1200px]:max-[1599px]:leading-[80px] min-[1200px]:max-[1599px]:tracking-[-0.2em] max-[768.02px]:text-[clamp(1.55rem,5vw,2.5rem)] max-[768.02px]:leading-[1.35] max-[768.02px]:tracking-normal min-[481px]:max-[768.02px]:h-[240px] min-[481px]:max-[768.02px]:w-[424px] min-[481px]:max-[768.02px]:text-[68px] min-[481px]:max-[768.02px]:leading-[80px] min-[481px]:max-[768.02px]:tracking-[-0.2em] max-[480px]:h-[180px] max-[480px]:w-[361px] max-[480px]:text-center max-[480px]:text-5xl max-[480px]:leading-[60px] max-[480px]:tracking-[-0.2em]'>
          {copy.hero.titleSegments.map((line, lineIndex) => (
            <span className='block' key={lineIndex}>
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    'emphasis' in segment && segment.emphasis
                      ? 'gusto-hero-title-emphasis min-[481px]:max-[768.02px]:text-[86px] max-[480px]:text-[68px]'
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
        <nav aria-label={copy.home.heroNavLabel} className='gusto-hero-nav mt-[68px] grid gap-[18px] font-label text-[28px] leading-6 font-bold min-[1200px]:max-[1599px]:absolute min-[1200px]:max-[1599px]:top-[calc(532.714966px_-_204.869141px)] min-[1200px]:max-[1599px]:left-[2.556107px] min-[1200px]:max-[1599px]:mt-0 min-[481px]:max-[768.02px]:hidden max-[480px]:hidden [&_a]:w-max [&_a]:text-ink [&_a]:no-underline'>
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
        className='gusto-hero-dishes z-[1] object-contain object-right-top [height:92%]! [left:32.8125%]! [top:0]! [width:68%]! min-[1200px]:max-[1599px]:object-fill min-[1200px]:max-[1599px]:object-center min-[1200px]:max-[1599px]:[height:908.671057px]! min-[1200px]:max-[1599px]:[left:627.082397px]! min-[1200px]:max-[1599px]:[top:-59.054199px]! min-[1200px]:max-[1599px]:[width:844.035925px]! max-[768.02px]:[height:58%]! max-[768.02px]:[left:23%]! max-[768.02px]:[width:89%]! min-[481px]:max-[768.02px]:object-fill min-[481px]:max-[768.02px]:object-center min-[481px]:max-[768.02px]:[height:797.771484px]! min-[481px]:max-[768.02px]:[left:141.321472px]! min-[481px]:max-[768.02px]:[top:-1.597839px]! min-[481px]:max-[768.02px]:[width:739.296631px]! max-[480px]:max-w-none! max-[480px]:object-fill max-[480px]:object-center max-[480px]:[height:501.597656px]! max-[480px]:[left:-17.040405px]! max-[480px]:[top:123.562851px]! max-[480px]:[width:464.832825px]!'
      />
      <Image
        src='/images/four-veggies.png'
        alt=''
        width={360}
        height={246}
        className='gusto-hero-veg absolute top-[675px] left-[24.0625%] z-[2] h-auto w-[360px] opacity-70 min-[1200px]:max-[1599px]:top-[549.103516px] min-[1200px]:max-[1599px]:left-[394.24704px] min-[1200px]:max-[1599px]:w-[415.595337px] min-[1200px]:max-[1599px]:opacity-100 min-[481px]:max-[768.02px]:top-[597.101837px] min-[481px]:max-[768.02px]:bottom-auto min-[481px]:max-[768.02px]:left-[86.73233px] min-[481px]:max-[768.02px]:h-[237.561798px] min-[481px]:max-[768.02px]:w-[347.39679px] min-[481px]:max-[768.02px]:opacity-100 max-[480px]:top-[516.244629px] max-[480px]:bottom-auto max-[480px]:left-[16px] max-[480px]:h-[137.972656px] max-[480px]:w-[201.76062px] max-[480px]:opacity-100'
      />
      <a
        className='gusto-hero-caret absolute top-[1026px] right-[72px] z-[4] flex size-[74px] items-center justify-center rounded-full border-[5px] border-coral font-display text-[46px] leading-none font-normal text-coral no-underline max-[768.02px]:hidden'
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
        className='gusto-hero-brush pointer-events-none absolute inset-x-0 bottom-[-1px]! z-[3] block h-auto! w-full! max-w-none! min-[481px]:max-[768.02px]:hidden max-[480px]:hidden'
      />
    </section>
  );
}
