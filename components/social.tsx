import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { HomeSocialIcon } from './social-icon';
import type { HomePageCopy, SocialCard } from './types';

const gallery = [
  'slide-3.jpg',
  'slide-1.jpg',
  'slide-6.jpg',
  'slide-2.jpg',
  'slide-4.jpg',
  'slide-5.jpg',
  'slide-7.jpg',
];

export function HomeSocialSection({
  copy,
  socialCards,
}: {
  copy: HomePageCopy;
  socialCards: SocialCard[];
}) {
  return (
    <section
      id='social'
      className="gusto-social relative h-[573px] overflow-hidden bg-none p-0 text-warm-light after:absolute after:inset-[38.800018px_0_0] after:z-0 after:bg-ink after:content-[''] sm:h-[714.626709px] sm:after:inset-[56.62664px_0_0] xl:h-[814.17511px] xl:after:inset-[106.174957px_0_0] 3xl:h-[min(55.2083vw,1060px)] 3xl:after:inset-[min(7.3733vw,141.567px)_0_0]"
      aria-label={copy.home.gallery}
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className='gusto-social-brush pointer-events-none absolute top-0 left-0 z-[1] h-[40.800018px] w-full sm:h-[58.62664px] xl:h-[108.174957px] 3xl:h-[calc(min(7.3733vw,141.567px)_+_2px)]'
      />
      <div className='gusto-gallery absolute top-[70.800018px] left-[-340.5px] z-[2] flex h-[100px] w-[1074px] translate-x-0 gap-1 sm:top-[106.626709px] sm:left-[-690px] sm:h-[200px] sm:w-[2148px] sm:gap-2 xl:top-[156.175087px] xl:left-[-354px] 3xl:top-[min(12.5816vw,241.567px)] 3xl:left-1/2 3xl:h-[min(10.4167vw,200px)] 3xl:w-[min(111.875vw,2148px)] 3xl:-translate-x-1/2 3xl:gap-[min(0.4167vw,8px)]'>
        {gallery.map((image) => (
          <div
            className='gusto-gallery-item h-[100px] w-[150px] flex-[0_0_150px] bg-warm-light p-[2px_3px] sm:h-[200px] sm:w-[300px] sm:basis-[300px] sm:p-[4px_6px] 3xl:h-[min(10.4167vw,200px)] 3xl:w-[min(15.625vw,300px)] 3xl:flex-[0_0_min(15.625vw,300px)] 3xl:p-[min(0.2083vw,4px)_min(0.3125vw,6px)]'
            key={image}
          >
            <Image
              src={`/images/${image}`}
              alt={copy.home.galleryImageAlt}
              width={290}
              height={192}
              className='block h-full w-full object-cover'
            />
          </div>
        ))}
      </div>
      <div className='gusto-social-links absolute top-[234px] left-1/2 z-[2] m-0 grid h-[286px] w-[361px] -translate-x-1/2 grid-cols-3 text-center sm:top-[378.626709px] sm:w-[722px] xl:top-1/2 xl:w-[1182px] 3xl:h-[min(14.8958vw,286px)] 3xl:w-[min(61.5625vw,1182px)]'>
        {socialCards.map((card) => (
          <a
            href={siteConfig.socialUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={copy.footer.socialExternal.replace('{name}', card.name)}
            className='flex h-[286px] w-full min-w-0 flex-col items-center gap-12 border-r border-warm-light p-[32px_8px] text-inherit no-underline last:border-0 sm:w-[calc(722px/3)] sm:p-8 xl:w-[394px] 3xl:h-[min(14.8958vw,286px)] 3xl:w-[min(20.5208vw,394px)] 3xl:gap-[min(2.5vw,48px)] 3xl:p-[min(1.6667vw,32px)]'
            key={card.name}
          >
            <div className='gusto-social-copy h-[110px] min-w-0 w-full sm:w-[calc(722px/3_-_64px)] xl:h-[126px] xl:w-[330px] 3xl:h-[min(6.5625vw,126px)] 3xl:w-[min(17.1875vw,330px)]'>
              <div className='gusto-social-heading flex h-[72px] flex-col items-center gap-4 xl:h-[76px] 3xl:h-[min(3.9583vw,76px)] 3xl:gap-[min(0.8333vw,16px)]'>
                <Image
                  src='/images/deco-1.png'
                  alt=''
                  width={216}
                  height={120}
                  className='h-6 w-[43.2px] sm:h-8 sm:w-[57.6px] 3xl:h-[min(1.6667vw,32px)] 3xl:w-[min(3vw,57.6px)]'
                />
                <span className='h-6 whitespace-nowrap font-display text-xl leading-6 font-normal tracking-[-0.2em] sm:text-2xl sm:tracking-[-0.25em] xl:h-7 xl:text-[28px] 3xl:h-[min(1.4583vw,28px)] 3xl:text-[min(1.4583vw,28px)] 3xl:leading-none 3xl:tracking-[-8px]'>
                  {card.name}
                </span>
              </div>
              <p className='h-[38px] overflow-hidden text-center font-accent text-sm leading-[19px] sm:h-[19px] sm:leading-[1.36] xl:h-[50px] xl:text-[22px] 3xl:h-[min(2.6042vw,50px)] 3xl:text-[min(1.1458vw,22px)]'>
                {card.description}
              </p>
            </div>
            <HomeSocialIcon
              type={card.icon}
              className='h-8 w-8 flex-[0_0_32px] text-current sm:h-16 sm:w-16 sm:flex-auto xl:h-12 xl:w-12 3xl:h-[min(2.5vw,48px)] 3xl:w-[min(2.5vw,48px)]'
            />
          </a>
        ))}
      </div>
    </section>
  );
}
