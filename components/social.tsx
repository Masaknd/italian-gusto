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
      className="gusto-social relative h-[min(55.2083vw,1060px)] overflow-hidden bg-none p-0 text-warm-light after:absolute after:inset-[min(7.3733vw,141.567px)_0_0] after:z-0 after:bg-ink after:content-[''] xl:h-[814.17511px] xl:after:inset-[106.174957px_0_0] sm:h-[714.626709px] sm:after:inset-[56.62664px_0_0] xs:h-[573px] xs:after:inset-[38.800018px_0_0]"
      aria-label={copy.home.gallery}
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className='gusto-social-brush pointer-events-none absolute top-0 left-0 z-[1] h-[calc(min(7.3733vw,141.567px)_+_2px)] w-full xl:h-[108.174957px] sm:h-[58.62664px] xs:h-[40.800018px]'
      />
      <div className='gusto-gallery absolute top-[min(12.5816vw,241.567px)] left-1/2 z-[2] flex h-[min(10.4167vw,200px)] w-[min(111.875vw,2148px)] -translate-x-1/2 gap-[min(0.4167vw,8px)] xl:top-[156.175087px] xl:left-[-354px] xl:h-[200px] xl:w-[2148px] xl:translate-x-0 xl:gap-2 sm:top-[106.626709px] sm:left-[-690px] sm:h-[200px] sm:w-[2148px] sm:translate-x-0 sm:gap-2 xs:top-[70.800018px] xs:left-[-340.5px] xs:h-[100px] xs:w-[1074px] xs:translate-x-0 xs:gap-1'>
        {gallery.map((image) => (
          <div
            className='gusto-gallery-item h-[min(10.4167vw,200px)] w-[min(15.625vw,300px)] flex-[0_0_min(15.625vw,300px)] bg-warm-light p-[min(0.2083vw,4px)_min(0.3125vw,6px)] xl:h-[200px] xl:w-[300px] xl:basis-[300px] xl:p-[4px_6px] sm:h-[200px] sm:w-[300px] sm:basis-[300px] sm:p-[4px_6px] xs:h-[100px] xs:w-[150px] xs:basis-[150px] xs:p-[2px_3px]'
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
      <div className='gusto-social-links absolute top-1/2 left-1/2 z-[2] m-0 grid h-[min(14.8958vw,286px)] w-[min(61.5625vw,1182px)] -translate-x-1/2 grid-cols-3 text-center xl:h-[286px] xl:w-[1182px] sm:top-[378.626709px] sm:h-[286px] sm:w-[722px] xs:top-[234px] xs:h-[286px] xs:w-[361px]'>
        {socialCards.map((card) => (
          <a
            href={siteConfig.socialUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={copy.footer.socialExternal.replace('{name}', card.name)}
            className='flex h-[min(14.8958vw,286px)] w-[min(20.5208vw,394px)] flex-col items-center gap-[min(2.5vw,48px)] border-r border-warm-light p-[min(1.6667vw,32px)] text-inherit no-underline last:border-0 xl:h-[286px] xl:w-[394px] xl:gap-12 xl:p-8 sm:h-[286px] sm:w-[calc(722px/3)] sm:gap-12 sm:p-8 xs:h-[286px] xs:w-full xs:min-w-0 xs:gap-12 xs:p-[32px_8px]'
            key={card.name}
          >
            <div className='gusto-social-copy h-[min(6.5625vw,126px)] w-[min(17.1875vw,330px)] xl:h-[126px] xl:w-[330px] sm:h-[110px] sm:w-[calc(722px/3_-_64px)] xs:h-[110px] xs:min-w-0 xs:w-full'>
              <div className='gusto-social-heading flex h-[min(3.9583vw,76px)] flex-col items-center gap-[min(0.8333vw,16px)] xl:h-[76px] xl:gap-4 sm:h-[72px] sm:gap-4 xs:h-[72px] xs:gap-4'>
                <Image
                  src='/images/deco-1.png'
                  alt=''
                  width={216}
                  height={120}
                  className='h-[min(1.6667vw,32px)] w-[min(3vw,57.6px)] xl:h-8 xl:w-[57.6px] sm:h-8 sm:w-[57.6px] xs:h-6 xs:w-[43.2px]'
                />
                <span className='h-[min(1.4583vw,28px)] font-display text-[min(1.4583vw,28px)] leading-none font-normal tracking-[-8px] xl:h-7 xl:text-[28px] sm:h-6 sm:text-2xl sm:tracking-[-0.25em] xs:h-6 xs:whitespace-nowrap xs:text-xl xs:leading-6 xs:tracking-[-0.2em]'>
                  {card.name}
                </span>
              </div>
              <p className='h-[min(2.6042vw,50px)] font-accent text-[min(1.1458vw,22px)] leading-[1.36] text-center xl:h-[50px] xl:text-[22px] sm:h-[19px] sm:text-sm sm:leading-[1.36] xs:h-[38px] xs:overflow-hidden xs:text-sm xs:leading-[19px]'>
                {card.description}
              </p>
            </div>
            <HomeSocialIcon
              type={card.icon}
              className='h-[min(2.5vw,48px)] w-[min(2.5vw,48px)] text-current xl:h-12 xl:w-12 sm:h-16 sm:w-16 xs:h-8 xs:w-8 xs:flex-[0_0_32px]'
            />
          </a>
        ))}
      </div>
    </section>
  );
}
