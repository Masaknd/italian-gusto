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
      className='gusto-social relative h-auto overflow-hidden'
      aria-label={copy.home.gallery}
    >
      <Image
        src='/images/b-1.png'
        alt=''
        width={3841}
        height={284}
        sizes='100vw'
        className='gusto-social-brush pointer-events-none h-auto w-full translate-y-px'
      />
      <div className='h-[310px] bg-ink text-warm-light sm:h-[480px] xl:h-[530px]'>
        <div className='gusto-gallery absolute top-[50px] left-[-340px] z-[2] h-[100px] w-[1074px] translate-x-0 overflow-hidden sm:top-[106.626709px] sm:left-[-690px] sm:h-[200px] sm:w-[2148px] xl:top-[156.175087px] xl:left-[-354px] 3xl:top-[min(12.5816vw,241.567px)] 3xl:left-1/2 3xl:h-[min(10.4167vw,200px)] 3xl:w-[min(111.875vw,2148px)] 3xl:-translate-x-1/2'>
          <div className='gusto-gallery-track flex h-full w-max'>
            {[false, true].map((isDuplicate) => (
              <div
                aria-hidden={isDuplicate || undefined}
                className='gusto-gallery-set flex h-full shrink-0 gap-1 pr-1 sm:gap-2 sm:pr-2 3xl:gap-[min(0.4167vw,8px)] 3xl:pr-[min(0.4167vw,8px)]'
                key={isDuplicate ? 'duplicate' : 'original'}
              >
                {gallery.map((image) => (
                  <div
                    className='gusto-gallery-item h-[100px] w-[150px] flex-[0_0_150px] bg-warm-light p-[2px_3px] sm:h-[200px] sm:w-[300px] sm:basis-[300px] sm:p-[4px_6px] 3xl:h-[min(10.4167vw,200px)] 3xl:w-[min(15.625vw,300px)] 3xl:flex-[0_0_min(15.625vw,300px)] 3xl:p-[min(0.2083vw,4px)_min(0.3125vw,6px)]'
                    key={`${isDuplicate ? 'duplicate' : 'original'}-${image}`}
                  >
                    <Image
                      src={`/images/${image}`}
                      alt={isDuplicate ? '' : copy.home.galleryImageAlt}
                      width={290}
                      height={192}
                      className='block h-full w-full object-cover'
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='gusto-social-links xl:16 m-0 grid w-full grid-cols-3 place-items-center px-4 pt-[140px] text-center sm:px-8 sm:pt-[280px] xl:px-[clamp(10vw,20vw,30vw)] xl:pt-[280px] 3xl:pt-[320px]'>
          {socialCards.map((card) => (
            <a
              href={siteConfig.socialUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={copy.footer.socialExternal.replace(
                '{name}',
                card.name,
              )}
              className='flex w-full min-w-0 flex-col items-center gap-4 border-r border-warm-light px-2 text-inherit no-underline last:border-0 sm:gap-6 sm:px-0'
              key={card.name}
            >
              <div className='gusto-social-copy w-full'>
                <div className='gusto-social-heading flex flex-col items-center gap-4 3xl:gap-[min(0.8333vw,16px)]'>
                  <Image
                    src='/images/deco-1.png'
                    alt=''
                    width={216}
                    height={120}
                    className='aspect-auto h-6 w-[43.2px] sm:h-8 sm:w-[57.6px] 3xl:h-[min(1.6667vw,32px)] 3xl:w-[min(3vw,57.6px)]'
                  />
                  <span className='h-6 font-display text-lg leading-6 font-normal tracking-[-0.2em] whitespace-nowrap sm:text-2xl sm:tracking-[-0.25em] xl:h-7 xl:text-[28px] 3xl:h-[min(1.4583vw,28px)] 3xl:text-[min(1.4583vw,28px)] 3xl:leading-none 3xl:tracking-[-8px]'>
                    {card.name}
                  </span>
                </div>
                <p className='overflow-hidden text-center font-accent text-sm leading-[19px] sm:leading-[1.36] xl:text-[22px] 3xl:text-[min(1.1458vw,22px)]'>
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
      </div>
    </section>
  );
}
