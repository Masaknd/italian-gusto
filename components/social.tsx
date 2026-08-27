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
      className="gusto-social relative h-[min(55.2083vw,1060px)] overflow-hidden bg-none p-0 text-warm-light after:absolute after:inset-[min(7.3733vw,141.567px)_0_0] after:z-0 after:bg-ink after:content-[''] min-[1200px]:max-[1599px]:h-[814.17511px] min-[1200px]:max-[1599px]:after:inset-[106.174957px_0_0] min-[481px]:max-[768.02px]:h-[714.626709px] min-[481px]:max-[768.02px]:after:inset-[56.62664px_0_0] max-[480px]:h-[573px] max-[480px]:after:inset-[38.800018px_0_0]"
      aria-label={copy.home.gallery}
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className='gusto-social-brush pointer-events-none absolute top-0 left-0 z-[1] h-[calc(min(7.3733vw,141.567px)_+_2px)] w-full min-[1200px]:max-[1599px]:h-[108.174957px] min-[481px]:max-[768.02px]:h-[58.62664px] max-[480px]:h-[40.800018px]'
      />
      <div className='gusto-gallery absolute top-[min(12.5816vw,241.567px)] left-1/2 z-[2] flex h-[min(10.4167vw,200px)] w-[min(111.875vw,2148px)] -translate-x-1/2 gap-[min(0.4167vw,8px)] min-[1200px]:max-[1599px]:top-[156.175087px] min-[1200px]:max-[1599px]:left-[-354px] min-[1200px]:max-[1599px]:h-[200px] min-[1200px]:max-[1599px]:w-[2148px] min-[1200px]:max-[1599px]:translate-x-0 min-[1200px]:max-[1599px]:gap-2 min-[481px]:max-[768.02px]:top-[106.626709px] min-[481px]:max-[768.02px]:left-[-690px] min-[481px]:max-[768.02px]:h-[200px] min-[481px]:max-[768.02px]:w-[2148px] min-[481px]:max-[768.02px]:translate-x-0 min-[481px]:max-[768.02px]:gap-2 max-[480px]:top-[70.800018px] max-[480px]:left-[-340.5px] max-[480px]:h-[100px] max-[480px]:w-[1074px] max-[480px]:translate-x-0 max-[480px]:gap-1'>
        {gallery.map((image) => (
          <div
            className='gusto-gallery-item h-[min(10.4167vw,200px)] w-[min(15.625vw,300px)] flex-[0_0_min(15.625vw,300px)] bg-warm-light p-[min(0.2083vw,4px)_min(0.3125vw,6px)] min-[1200px]:max-[1599px]:h-[200px] min-[1200px]:max-[1599px]:w-[300px] min-[1200px]:max-[1599px]:basis-[300px] min-[1200px]:max-[1599px]:p-[4px_6px] min-[481px]:max-[768.02px]:h-[200px] min-[481px]:max-[768.02px]:w-[300px] min-[481px]:max-[768.02px]:basis-[300px] min-[481px]:max-[768.02px]:p-[4px_6px] max-[480px]:h-[100px] max-[480px]:w-[150px] max-[480px]:basis-[150px] max-[480px]:p-[2px_3px]'
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
      <div className='gusto-social-links absolute top-1/2 left-1/2 z-[2] m-0 grid h-[min(14.8958vw,286px)] w-[min(61.5625vw,1182px)] -translate-x-1/2 grid-cols-3 text-center min-[1200px]:max-[1599px]:h-[286px] min-[1200px]:max-[1599px]:w-[1182px] min-[481px]:max-[768.02px]:top-[378.626709px] min-[481px]:max-[768.02px]:h-[286px] min-[481px]:max-[768.02px]:w-[722px] max-[480px]:top-[234px] max-[480px]:h-[286px] max-[480px]:w-[361px]'>
        {socialCards.map((card) => (
          <a
            href={siteConfig.socialUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={copy.footer.socialExternal.replace(
              '{name}',
              card.name,
            )}
            className='flex h-[min(14.8958vw,286px)] w-[min(20.5208vw,394px)] flex-col items-center gap-[min(2.5vw,48px)] border-r border-warm-light p-[min(1.6667vw,32px)] text-inherit no-underline last:border-0 min-[1200px]:max-[1599px]:h-[286px] min-[1200px]:max-[1599px]:w-[394px] min-[1200px]:max-[1599px]:gap-12 min-[1200px]:max-[1599px]:p-8 min-[481px]:max-[768.02px]:h-[286px] min-[481px]:max-[768.02px]:w-[calc(722px/3)] min-[481px]:max-[768.02px]:gap-12 min-[481px]:max-[768.02px]:p-8 max-[480px]:h-[286px] max-[480px]:w-full max-[480px]:min-w-0 max-[480px]:gap-12 max-[480px]:p-[32px_8px]'
            key={card.name}
          >
            <div className='gusto-social-copy h-[min(6.5625vw,126px)] w-[min(17.1875vw,330px)] min-[1200px]:max-[1599px]:h-[126px] min-[1200px]:max-[1599px]:w-[330px] min-[481px]:max-[768.02px]:h-[110px] min-[481px]:max-[768.02px]:w-[calc(722px/3_-_64px)] max-[480px]:h-[110px] max-[480px]:min-w-0 max-[480px]:w-full'>
              <div className='gusto-social-heading flex h-[min(3.9583vw,76px)] flex-col items-center gap-[min(0.8333vw,16px)] min-[1200px]:max-[1599px]:h-[76px] min-[1200px]:max-[1599px]:gap-4 min-[481px]:max-[768.02px]:h-[72px] min-[481px]:max-[768.02px]:gap-4 max-[480px]:h-[72px] max-[480px]:gap-4'>
                <Image
                  src='/images/deco-1.png'
                  alt=''
                  width={216}
                  height={120}
                  className='h-[min(1.6667vw,32px)] w-[min(3vw,57.6px)] min-[1200px]:max-[1599px]:h-8 min-[1200px]:max-[1599px]:w-[57.6px] min-[481px]:max-[768.02px]:h-8 min-[481px]:max-[768.02px]:w-[57.6px] max-[480px]:h-6 max-[480px]:w-[43.2px]'
                />
                <span className='h-[min(1.4583vw,28px)] font-display text-[min(1.4583vw,28px)] leading-none font-normal tracking-[-8px] min-[1200px]:max-[1599px]:h-7 min-[1200px]:max-[1599px]:text-[28px] min-[481px]:max-[768.02px]:h-6 min-[481px]:max-[768.02px]:text-2xl min-[481px]:max-[768.02px]:tracking-[-0.25em] max-[480px]:h-6 max-[480px]:whitespace-nowrap max-[480px]:text-xl max-[480px]:leading-6 max-[480px]:tracking-[-0.2em]'>
                  {card.name}
                </span>
              </div>
              <p className='h-[min(2.6042vw,50px)] font-accent text-[min(1.1458vw,22px)] leading-[1.36] text-center min-[1200px]:max-[1599px]:h-[50px] min-[1200px]:max-[1599px]:text-[22px] min-[481px]:max-[768.02px]:h-[19px] min-[481px]:max-[768.02px]:text-sm min-[481px]:max-[768.02px]:leading-[1.36] max-[480px]:h-[38px] max-[480px]:overflow-hidden max-[480px]:text-sm max-[480px]:leading-[19px]'>
                {card.description}
              </p>
            </div>
            <HomeSocialIcon
              type={card.icon}
              className='h-[min(2.5vw,48px)] w-[min(2.5vw,48px)] text-current min-[1200px]:max-[1599px]:h-12 min-[1200px]:max-[1599px]:w-12 min-[481px]:max-[768.02px]:h-16 min-[481px]:max-[768.02px]:w-16 max-[480px]:h-8 max-[480px]:w-8 max-[480px]:flex-[0_0_32px]'
            />
          </a>
        ))}
      </div>
    </section>
  );
}
