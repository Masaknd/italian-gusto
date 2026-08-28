import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { ReservationLink } from './reservation-link';

export function HomeReservationSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='reservation'
      className="gusto-reservation relative isolate block h-auto overflow-hidden p-[100px_16px] text-content after:absolute after:inset-0 after:z-[-1] after:bg-black/70 after:mix-blend-multiply after:content-[''] sm:h-[832px] sm:p-0 lg:grid lg:h-[720px] lg:min-h-0 lg:place-items-center lg:p-[56px_24px] xl:block xl:h-[914px] xl:p-0 3xl:grid 3xl:h-[min(50vw,960px)] 3xl:place-items-center"
    >
      <Image
        src='/images/slide-8.jpg'
        alt=''
        fill
        sizes='100vw'
        className='gusto-reservation-image z-[-2] object-cover object-center'
      />
      <Image
        src='/images/b-5.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-reservation-brush-top pointer-events-none absolute top-0 left-0 z-[2] block h-auto w-full'
      />
      <div className='gusto-booking relative top-auto left-auto z-[1] flex flex-col items-center justify-start gap-6 p-4 text-center [background:rgb(27_40_27_/_70%)] sm:absolute sm:top-[76.999969px] sm:left-[192px] sm:h-[678.000061px] sm:w-[384px] lg:relative lg:top-auto lg:left-auto lg:h-auto lg:min-h-[500px] lg:w-[min(100%,568px)] lg:min-w-0 lg:p-6 xl:absolute xl:top-[200px] xl:left-[414px] xl:h-[514px] xl:min-h-0 xl:w-[710px] xl:p-4 3xl:relative 3xl:top-auto 3xl:left-auto 3xl:h-[min(26.7708vw,514px)] 3xl:w-[min(36.9792vw,710px)] 3xl:gap-[min(1.25vw,24px)] 3xl:p-[min(0.8333vw,16px)]'>
        <div className='gusto-booking-title flex h-[54.000042px] w-[198px] flex-col items-center gap-1 sm:h-[80.000038px] sm:w-[297px] lg:h-auto lg:w-auto xl:h-[84px] xl:w-[322px] 3xl:h-auto 3xl:w-auto 3xl:gap-[min(0.2083vw,4px)]'>
          <h2 className='h-8 w-[198px] font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-coral sm:h-12 sm:w-[297px] sm:text-5xl sm:leading-12 lg:h-auto lg:w-auto lg:text-[42px] lg:leading-none lg:tracking-[-0.288em] xl:h-[52px] xl:w-[322px] xl:text-[52px] 3xl:h-auto 3xl:w-auto 3xl:text-[min(2.7083vw,52px)]'>
            {copy.home.reservationTitle}
          </h2>
          <p className="relative m-0 h-[18px] w-[182px] pb-1 font-accent text-sm leading-[14px] whitespace-nowrap text-coral after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:h-7 sm:w-[234px] sm:text-lg sm:leading-6 lg:h-auto lg:w-auto lg:text-base lg:leading-[1.36] xl:h-7 xl:w-[234px] xl:text-lg 3xl:h-auto 3xl:w-auto 3xl:pb-[min(0.2083vw,4px)] 3xl:text-[min(0.9375vw,18px)]">
            {copy.home.reservationLabel}
          </p>
        </div>
        <ul className='gusto-booking-notes m-0 h-auto w-[329px] overflow-hidden pl-6 text-left text-sm leading-[27px] text-content sm:h-[462px] sm:w-[352px] sm:pl-5 lg:h-auto lg:w-[min(100%,517px)] lg:leading-[1.75] xl:h-[294px] xl:w-[517px] xl:pl-6 xl:text-base xl:leading-[42px] 3xl:h-[min(15.3125vw,294px)] 3xl:w-[min(26.9271vw,517px)] 3xl:pl-[min(1.25vw,24px)] 3xl:text-[min(0.8333vw,16px)] 3xl:leading-[min(2.1875vw,42px)] [&_li+li]:mt-0 lg:[&_li+li]:mt-2 xl:[&_li+li]:mt-0'>
          {copy.home.reservationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ReservationLink
          href={siteConfig.reservationUrl}
          className='gusto-booking-button inline-flex h-[46px] min-h-[46px] w-[329px] items-center justify-center rounded-full bg-coral p-4 font-accent text-sm leading-[14px] text-content no-underline transition-[filter] duration-150 ease-in-out hover:brightness-[0.92] sm:h-[56px] sm:min-h-[56px] sm:w-[352px] sm:p-[16px_32px] sm:text-lg sm:leading-6 lg:w-[min(100%,360px)] lg:p-[12px_24px] lg:text-base xl:w-[360px] xl:text-lg 3xl:min-h-[min(2.9167vw,56px)] 3xl:w-[min(18.75vw,360px)] 3xl:text-[min(0.9375vw,18px)] 3xl:leading-[1.36]'
          ariaLabel={copy.reserve.external}
        >
          {copy.home.reservationCta}
        </ReservationLink>
      </div>
      <Image
        src='/images/b-4.png'
        alt=''
        width={3849}
        height={72}
        sizes='100vw'
        className='gusto-reservation-brush-bottom pointer-events-none absolute -bottom-px left-0 z-[2] block h-auto w-full'
      />
    </section>
  );
}
