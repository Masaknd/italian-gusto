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
      className='gusto-wine-more mt-12 flex h-[60px] w-full items-center justify-start gap-8 font-accent text-lg leading-6 text-warm-light no-underline sm:w-max sm:text-[22px] xl:text-2xl xl:underline xl:underline-offset-4 3xl:mt-[min(2.5vw,48px)] 3xl:h-auto 3xl:gap-[min(1.6667vw,32px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36]'
    >
      <span className='min-w-0 flex-1 sm:flex-none'>{children}</span>
      <svg
        className='h-[60px] w-[111.396759px] shrink-0 overflow-visible fill-none stroke-ink stroke-1 3xl:h-auto 3xl:w-[min(5.8021vw,111.4px)]'
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
      className="relative h-auto min-h-0 overflow-hidden bg-transparent text-ink before:absolute before:inset-x-0 before:top-0 before:bottom-[38.800018px] before:h-auto before:bg-coral before:content-[''] sm:h-[1097.074585px] sm:min-h-[1097.074585px] sm:before:bottom-auto sm:before:h-[1021.251709px] xl:h-[1068.639893px] xl:min-h-0 xl:before:h-[926.471985px] 3xl:h-[min(71.5201vw,1373.187px)] 3xl:before:h-[min(61.6474vw,1183.629px)]"
    >
      <Image
        src='/images/b-2.png'
        alt=''
        width={3840}
        height={362}
        sizes='100vw'
        className='gusto-wine-brush-top pointer-events-none absolute top-0 left-0 z-[1] block h-[36.972569px] w-full sm:h-[72.251732px] xl:h-[135.472px] 3xl:h-auto'
      />
      <div className='gusto-wine-inner relative top-auto left-0 flex h-auto w-full flex-row flex-wrap items-start justify-center gap-x-0 gap-y-8 p-[calc(36.972569px_+_8px)_16px_calc(38.800018px_+_32px)] sm:absolute sm:top-[80.251732px] sm:h-[941px] sm:flex-col sm:flex-nowrap sm:items-center sm:gap-8 sm:p-[64px_24px] xl:top-[135.472px] xl:h-[791px] xl:flex-row xl:items-start xl:p-[60px_96px] 3xl:top-[min(9.8244vw,188.629px)] 3xl:h-[min(51.8229vw,995px)] 3xl:gap-[min(1.6667vw,32px)] 3xl:p-[min(6.25vw,120px)_min(12.5vw,240px)]'>
        <div className='gusto-wine-visual relative aspect-[308/280] h-auto min-w-0 basis-full sm:h-[382px] sm:w-[720px] sm:basis-auto xl:h-[671px] xl:w-[738px] xl:flex-none 3xl:h-[min(39.3229vw,755px)] 3xl:w-[min(43.2292vw,830px)]'>
          <Image
            src='/images/bottle-grapes.png'
            alt={copy.home.wineArtworkAlt}
            fill
            sizes='(max-width: 768px) 82vw, 43.23vw'
            className='[inset:0_auto_auto_0]! [height:100%]! [width:100%]! translate-x-0 object-contain sm:[inset:0_auto_auto_50%]! sm:[height:358.636383px]! sm:[width:394.5px]! sm:-translate-x-1/2 xl:[inset:0]! xl:[height:100%]! xl:[width:100%]! xl:translate-x-0'
          />
        </div>
        <div className='gusto-wine-copy relative order-[-1] flex h-auto min-w-0 basis-full flex-col items-start sm:h-[399.000031px] sm:w-[720px] sm:basis-auto sm:items-center xl:order-none xl:h-[635px] xl:w-[500px] xl:flex-none xl:items-start 3xl:h-[min(33.0729vw,635px)] 3xl:w-[min(30.1042vw,578px)]'>
          <div className="gusto-wine-title relative h-[35px] w-max self-center after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[repeating-linear-gradient(90deg,var(--color-brand-ink)_0_8px,transparent_8px_16px)] after:content-[''] sm:h-[51.000027px] sm:w-[228px] xl:h-[83px] xl:w-[380px] xl:self-auto xl:after:w-[362px] 3xl:h-[min(4.4792vw,86px)] 3xl:w-[min(19.7917vw,380px)] 3xl:after:h-[3px] 3xl:after:w-[min(18.8542vw,362px)]">
            <h2 className='h-8 font-display text-5xl leading-8 font-normal tracking-[-0.25em] whitespace-nowrap text-ink sm:h-12 sm:text-[60px] sm:leading-12 xl:h-auto xl:text-[80px] xl:leading-none 3xl:text-[min(4.1667vw,80px)]'>
              {copy.home.wineTitle}
            </h2>
          </div>
          <div className='gusto-wine-text mt-12 h-auto w-full overflow-visible font-accent text-lg leading-6 text-warm-light sm:h-[192px] sm:w-[598px] sm:overflow-hidden sm:text-[22px] xl:h-[396px] xl:w-[500px] xl:text-2xl 3xl:mt-[min(2.3438vw,45px)] 3xl:h-[min(20.625vw,396px)] 3xl:text-[min(1.25vw,24px)] 3xl:leading-[1.36] [&_p]:leading-[inherit] [&_p+p]:mt-0 sm:[&_p+p]:mt-0 3xl:[&_p+p]:mt-[min(1.7188vw,33px)]'>
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
        className='gusto-wine-brush-bottom pointer-events-none absolute bottom-0 left-0 z-[1] block h-[38.800018px] w-full sm:h-[75.822929px] xl:h-[142.167999px] 3xl:h-auto'
      />
    </section>
  );
}
