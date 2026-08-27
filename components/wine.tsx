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
      className='gusto-wine-more mt-[min(2.5vw,48px)] flex h-auto w-max items-center gap-[min(1.6667vw,32px)] font-accent text-[min(1.25vw,24px)] leading-[1.36] text-warm-light underline underline-offset-4 xl:max-2xl:mt-12 xl:max-2xl:h-[60px] xl:max-2xl:gap-8 xl:max-2xl:text-2xl sm:max-md:mt-12 sm:max-md:h-[60px] sm:max-md:gap-8 sm:max-md:text-[22px] sm:max-md:leading-6 xs:mt-12 xs:h-[60px] xs:w-full xs:justify-start xs:gap-8 xs:text-lg xs:leading-6 xs:no-underline'
    >
      <span className='xs:min-w-0 xs:flex-1'>
        {children}
      </span>
      <svg
        className='h-auto w-[min(5.8021vw,111.4px)] shrink-0 overflow-visible fill-none stroke-ink stroke-1 xl:max-2xl:w-[111.396759px] sm:max-md:h-[60px] sm:max-md:w-[111.396759px] xs:h-[60px] xs:w-[111.396759px]'
        aria-hidden='true'
        viewBox='0 0 111.4 60'
        focusable='false'
      >
        <circle cx='46' cy='30' r='29.5' />
        <path d='M37 30h73m-22-22 22 22-22 22' />
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
    <section
      id='wine'
      className="relative h-[min(71.5201vw,1373.187px)] min-h-0 overflow-hidden bg-transparent text-ink before:absolute before:inset-x-0 before:top-0 before:h-[min(61.6474vw,1183.629px)] before:bg-coral before:content-[''] xl:max-2xl:h-[1068.639893px] xl:max-2xl:before:h-[926.471985px] sm:max-md:h-[1097.074585px] sm:max-md:min-h-[1097.074585px] sm:max-md:before:h-[1021.251709px] xs:h-auto xs:before:top-0 xs:before:bottom-[38.800018px] xs:before:h-auto"
    >
      <Image
        src='/images/b-2.png'
        alt=''
        width={3840}
        height={362}
        sizes='100vw'
        className='gusto-wine-brush-top pointer-events-none absolute top-0 left-0 z-[1] block h-auto w-full xl:max-2xl:h-[135.472px] sm:max-md:h-[72.251732px] xs:h-[36.972569px]'
      />
      <div className='gusto-wine-inner absolute top-[min(9.8244vw,188.629px)] left-0 flex h-[min(51.8229vw,995px)] w-full items-start justify-center gap-[min(1.6667vw,32px)] p-[min(6.25vw,120px)_min(12.5vw,240px)] xl:max-2xl:top-[135.472px] xl:max-2xl:h-[791px] xl:max-2xl:gap-8 xl:max-2xl:p-[60px_96px] sm:max-md:top-[80.251732px] sm:max-md:h-[941px] sm:max-md:flex-col sm:max-md:items-center sm:max-md:gap-8 sm:max-md:p-[64px_24px] xs:relative xs:top-auto xs:h-auto xs:flex-row xs:flex-wrap xs:items-start xs:gap-x-0 xs:gap-y-8 xs:p-[calc(36.972569px_+_8px)_16px_calc(38.800018px_+_32px)]'>
        <div className='gusto-wine-visual relative h-[min(39.3229vw,755px)] w-[min(43.2292vw,830px)] flex-none xl:max-2xl:h-[671px] xl:max-2xl:w-[738px] sm:max-md:h-[382px] sm:max-md:w-[720px] xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto xs:aspect-[308/280]'>
          <Image
            src='/images/bottle-grapes.png'
            alt={copy.home.wineArtworkAlt}
            fill
            sizes='(max-width: 768px) 82vw, 43.23vw'
            className='object-contain sm:max-md:[inset:0_auto_auto_50%]! sm:max-md:[height:358.636383px]! sm:max-md:[width:394.5px]! sm:max-md:-translate-x-1/2 xs:[inset:0_auto_auto_0]! xs:[height:100%]! xs:[width:100%]! xs:translate-x-0'
          />
        </div>
        <div className='gusto-wine-copy h-[min(33.0729vw,635px)] w-[min(30.1042vw,578px)] flex-none xl:max-2xl:h-[635px] xl:max-2xl:w-[500px] sm:max-md:order-[-1] sm:max-md:flex sm:max-md:h-[399.000031px] sm:max-md:w-[720px] sm:max-md:flex-col sm:max-md:items-center xs:relative xs:order-[-1] xs:flex xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto xs:flex-col xs:items-start'>
          <div className="gusto-wine-title relative h-[min(4.4792vw,86px)] w-[min(19.7917vw,380px)] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[min(18.8542vw,362px)] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] xl:max-2xl:h-[83px] xl:max-2xl:w-[380px] xl:max-2xl:after:h-0.5 xl:max-2xl:after:w-[362px] sm:max-md:h-[51.000027px] sm:max-md:w-[228px] sm:max-md:after:h-0.5 sm:max-md:after:w-[228px] xs:h-[35px] xs:w-max xs:self-center xs:after:h-0.5 xs:after:w-full">
            <h2 className='whitespace-nowrap font-display text-[min(4.1667vw,80px)] leading-none font-normal tracking-[-0.25em] text-ink xl:max-2xl:text-[80px] sm:max-md:h-12 sm:max-md:text-[60px] sm:max-md:leading-12 xs:h-8 xs:text-5xl xs:leading-8'>
              {copy.home.wineTitle}
            </h2>
          </div>
          <div className='gusto-wine-text mt-[min(2.3438vw,45px)] h-[min(20.625vw,396px)] w-full font-accent text-[min(1.25vw,24px)] leading-[1.36] text-warm-light xl:max-2xl:mt-12 xl:max-2xl:h-[396px] xl:max-2xl:w-[500px] xl:max-2xl:text-2xl sm:max-md:mt-12 sm:max-md:h-[192px] sm:max-md:w-[598px] sm:max-md:overflow-hidden sm:max-md:text-[22px] sm:max-md:leading-6 xs:mt-12 xs:h-auto xs:w-full xs:overflow-visible xs:text-lg xs:leading-6 [&_p]:leading-[inherit] [&_p+p]:mt-[min(1.7188vw,33px)] xl:max-2xl:[&_p+p]:mt-0 sm:max-md:[&_p+p]:mt-0 xs:[&_p+p]:mt-0'>
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
        className='gusto-wine-brush-bottom pointer-events-none absolute bottom-0 left-0 z-[1] block h-auto w-full xl:max-2xl:h-[142.167999px] sm:max-md:h-[75.822929px] xs:h-[38.800018px]'
      />
    </section>
  );
}
