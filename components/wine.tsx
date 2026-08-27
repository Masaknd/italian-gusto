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
      className='gusto-wine-more mt-[min(2.5vw,48px)] flex h-auto w-max items-center gap-[min(1.6667vw,32px)] font-accent text-[min(1.25vw,24px)] leading-[1.36] text-warm-light underline underline-offset-4 xl:mt-12 xl:h-[60px] xl:gap-8 xl:text-2xl sm:mt-12 sm:h-[60px] sm:gap-8 sm:text-[22px] sm:leading-6 xs:mt-12 xs:h-[60px] xs:w-full xs:justify-start xs:gap-8 xs:text-lg xs:leading-6 xs:no-underline'
    >
      <span className='xs:min-w-0 xs:flex-1'>{children}</span>
      <svg
        className='h-auto w-[min(5.8021vw,111.4px)] shrink-0 overflow-visible fill-none stroke-ink stroke-1 xl:w-[111.396759px] sm:h-[60px] sm:w-[111.396759px] xs:h-[60px] xs:w-[111.396759px]'
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
      className="relative h-[min(71.5201vw,1373.187px)] min-h-0 overflow-hidden bg-transparent text-ink before:absolute before:inset-x-0 before:top-0 before:h-[min(61.6474vw,1183.629px)] before:bg-coral before:content-[''] xl:h-[1068.639893px] xl:before:h-[926.471985px] sm:h-[1097.074585px] sm:min-h-[1097.074585px] sm:before:h-[1021.251709px] xs:h-auto xs:before:top-0 xs:before:bottom-[38.800018px] xs:before:h-auto"
    >
      <Image
        src='/images/b-2.png'
        alt=''
        width={3840}
        height={362}
        sizes='100vw'
        className='gusto-wine-brush-top pointer-events-none absolute top-0 left-0 z-[1] block h-auto w-full xl:h-[135.472px] sm:h-[72.251732px] xs:h-[36.972569px]'
      />
      <div className='gusto-wine-inner absolute top-[min(9.8244vw,188.629px)] left-0 flex h-[min(51.8229vw,995px)] w-full items-start justify-center gap-[min(1.6667vw,32px)] p-[min(6.25vw,120px)_min(12.5vw,240px)] xl:top-[135.472px] xl:h-[791px] xl:gap-8 xl:p-[60px_96px] sm:top-[80.251732px] sm:h-[941px] sm:flex-col sm:items-center sm:gap-8 sm:p-[64px_24px] xs:relative xs:top-auto xs:h-auto xs:flex-row xs:flex-wrap xs:items-start xs:gap-x-0 xs:gap-y-8 xs:p-[calc(36.972569px_+_8px)_16px_calc(38.800018px_+_32px)]'>
        <div className='gusto-wine-visual relative h-[min(39.3229vw,755px)] w-[min(43.2292vw,830px)] flex-none xl:h-[671px] xl:w-[738px] sm:h-[382px] sm:w-[720px] xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto xs:aspect-[308/280]'>
          <Image
            src='/images/bottle-grapes.png'
            alt={copy.home.wineArtworkAlt}
            fill
            sizes='(max-width: 768px) 82vw, 43.23vw'
            className='object-contain sm:[inset:0_auto_auto_50%]! sm:[height:358.636383px]! sm:[width:394.5px]! sm:-translate-x-1/2 xs:[inset:0_auto_auto_0]! xs:[height:100%]! xs:[width:100%]! xs:translate-x-0'
          />
        </div>
        <div className='gusto-wine-copy h-[min(33.0729vw,635px)] w-[min(30.1042vw,578px)] flex-none xl:h-[635px] xl:w-[500px] sm:order-[-1] sm:flex sm:h-[399.000031px] sm:w-[720px] sm:flex-col sm:items-center xs:relative xs:order-[-1] xs:flex xs:h-auto xs:min-w-0 xs:basis-full xs:w-auto xs:flex-col xs:items-start'>
          <div className="gusto-wine-title relative h-[min(4.4792vw,86px)] w-[min(19.7917vw,380px)] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[min(18.8542vw,362px)] after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] xl:h-[83px] xl:w-[380px] xl:after:h-0.5 xl:after:w-[362px] sm:h-[51.000027px] sm:w-[228px] sm:after:h-0.5 sm:after:w-[228px] xs:h-[35px] xs:w-max xs:self-center xs:after:h-0.5 xs:after:w-full">
            <h2 className='whitespace-nowrap font-display text-[min(4.1667vw,80px)] leading-none font-normal tracking-[-0.25em] text-ink xl:text-[80px] sm:h-12 sm:text-[60px] sm:leading-12 xs:h-8 xs:text-5xl xs:leading-8'>
              {copy.home.wineTitle}
            </h2>
          </div>
          <div className='gusto-wine-text mt-[min(2.3438vw,45px)] h-[min(20.625vw,396px)] w-full font-accent text-[min(1.25vw,24px)] leading-[1.36] text-warm-light xl:mt-12 xl:h-[396px] xl:w-[500px] xl:text-2xl sm:mt-12 sm:h-[192px] sm:w-[598px] sm:overflow-hidden sm:text-[22px] sm:leading-6 xs:mt-12 xs:h-auto xs:w-full xs:overflow-visible xs:text-lg xs:leading-6 [&_p]:leading-[inherit] [&_p+p]:mt-[min(1.7188vw,33px)] xl:[&_p+p]:mt-0 sm:[&_p+p]:mt-0 xs:[&_p+p]:mt-0'>
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
        className='gusto-wine-brush-bottom pointer-events-none absolute bottom-0 left-0 z-[1] block h-auto w-full xl:h-[142.167999px] sm:h-[75.822929px] xs:h-[38.800018px]'
      />
    </section>
  );
}
