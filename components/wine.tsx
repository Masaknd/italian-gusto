import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { HomePageCopy } from './types';

function WineMoreLink({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/menu`}
      className='gusto-wine-more mt-8 flex w-full items-center justify-start gap-8 font-accent text-lg leading-6 text-warm-light no-underline sm:w-max sm:text-[22px] xl:mt-12 xl:text-2xl xl:underline xl:underline-offset-4 3xl:mt-[min(2.5vw,48px)] 3xl:gap-[min(1.6667vw,32px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36]'
    >
      <span className='min-w-0 flex-1 sm:flex-none'>{children}</span>
      <svg
        className='group h-[60px] w-[111.396759px] shrink-0 overflow-visible fill-none stroke-current stroke-1 3xl:h-auto 3xl:w-[min(5.8021vw,111.4px)]'
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

export function HomeWineSection({
  copy,
  locale,
}: {
  copy: HomePageCopy;
  locale: Locale;
}) {
  return (
    <section id='wine' className='relative w-full overflow-hidden text-ink'>
      <Image
        src='/images/b-2.png'
        alt=''
        width={3840}
        height={362}
        sizes='100vw'
        className='gusto-wine-brush-top pointer-events-none absolute top-0 left-0 z-1 block h-auto w-full'
      />
      <div className='gusto-wine-inner relative flex h-full w-full flex-col items-center justify-center gap-x-0 gap-y-8 bg-coral p-[64px_16px_32px_16px] sm:flex-col sm:flex-nowrap sm:items-center sm:gap-8 sm:p-[120px_32px_64px_32px] xl:flex-row xl:items-start xl:p-[200px_96px_60px_96px] 3xl:gap-[min(1.6667vw,32px)] 3xl:p-[300px_240px_120px_240px]'>
        <div className='gusto-wine-visual order-2 xl:order-1'>
          <Image
            src='/images/bottle-grapes.png'
            alt={copy.home.wineArtworkAlt}
            width={768}
            height={480}
            sizes='(max-width: 768px) 82vw, 43.23vw'
            className='object-contain'
          />
        </div>
        <div className='gusto-wine-copy order-1 flex flex-col items-start gap-8 sm:items-center sm:gap-12 xl:order-2 xl:flex-none xl:items-start'>
          <div className='gusto-wine-title relative w-max'>
            <h2 className="font-display text-5xl leading-12 font-normal tracking-[-0.25em] whitespace-nowrap text-ink after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-[60px] sm:leading-16 xl:text-[80px] xl:leading-none 3xl:text-[min(4.1667vw,80px)]">
              {copy.home.wineTitle}
            </h2>
          </div>
          <div className='gusto-wine-text flex h-auto w-full flex-col gap-6 overflow-visible font-accent text-lg leading-6 text-warm-light sm:gap-8 sm:overflow-hidden sm:text-[22px] xl:w-[30vw] xl:text-2xl 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] [&_p]:leading-[inherit]'>
            {copy.home.wineBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <WineMoreLink locale={locale}>{copy.home.wineMenu}</WineMoreLink>
        </div>
      </div>
      <Image
        src='/images/b-3.png'
        alt=''
        width={3840}
        height={380}
        sizes='100vw'
        className='gusto-wine-brush-bottom pointer-events-none z-1 block h-auto w-full'
      />
    </section>
  );
}
