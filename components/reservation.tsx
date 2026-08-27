import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { ReservationLink } from './reservation-link';

export function HomeReservationSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='reservation'
      className="gusto-reservation relative isolate grid h-[min(50vw,960px)] place-items-center overflow-hidden text-content after:absolute after:inset-0 after:z-[-1] after:bg-black/70 after:mix-blend-multiply after:content-[''] xl:block xl:h-[914px] max-lg:h-[720px] max-lg:min-h-0 max-lg:p-[56px_24px] sm:block sm:h-[832px] sm:p-0 xs:block xs:h-auto xs:p-[100px_16px]"
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
        className='gusto-reservation-brush-top pointer-events-none absolute top-0 left-0 z-[2] block h-auto w-full xl:h-[26.691189px] sm:hidden xs:h-[7.284471px]'
      />
      <div className='gusto-booking z-[1] flex h-[min(26.7708vw,514px)] w-[min(36.9792vw,710px)] flex-col items-center justify-start gap-[min(1.25vw,24px)] [background:rgb(27_40_27_/_70%)] p-[min(0.8333vw,16px)] text-center xl:absolute xl:top-[200px] xl:left-[414px] xl:h-[514px] xl:w-[710px] xl:gap-6 xl:p-4 max-lg:h-auto max-lg:min-h-[500px] max-lg:w-[min(100%,568px)] max-lg:min-w-0 max-lg:gap-6 max-lg:p-6 sm:absolute sm:top-[76.999969px] sm:left-[192px] sm:h-[678.000061px] sm:min-h-0 sm:w-[384px] sm:gap-6 sm:p-4 xs:relative xs:top-auto xs:left-auto xs:h-auto xs:min-h-0 xs:w-[361px] xs:gap-6 xs:p-4'>
        <div className='gusto-booking-title flex flex-col items-center gap-[min(0.2083vw,4px)] xl:h-[84px] xl:w-[322px] xl:gap-1 sm:h-[80.000038px] sm:w-[297px] sm:gap-1 xs:h-[54.000042px] xs:w-[198px] xs:gap-1'>
          <h2 className='h-auto w-auto font-display text-[min(2.7083vw,52px)] leading-none font-normal tracking-[-0.288em] text-coral xl:h-[52px] xl:w-[322px] xl:text-[52px] max-lg:text-[42px] sm:h-12 sm:w-[297px] sm:text-5xl sm:leading-12 sm:tracking-[-0.25em] xs:h-8 xs:w-[198px] xs:text-[32px] xs:leading-8 xs:tracking-[-0.25em]'>
            {copy.home.reservationTitle}
          </h2>
          <p className="relative m-0 pb-[min(0.2083vw,4px)] font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-coral after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] xl:h-7 xl:w-[234px] xl:pb-1 xl:text-lg xl:whitespace-nowrap max-lg:pb-1 max-lg:text-base sm:h-7 sm:w-[234px] sm:pb-1 sm:text-lg sm:leading-6 sm:whitespace-nowrap xs:h-[18px] xs:w-[182px] xs:pb-1 xs:text-sm xs:leading-[14px] xs:whitespace-nowrap">
            {copy.home.reservationLabel}
          </p>
        </div>
        <ul className='gusto-booking-notes m-0 h-[min(15.3125vw,294px)] w-[min(26.9271vw,517px)] pl-[min(1.25vw,24px)] text-left text-[min(0.8333vw,16px)] leading-[min(2.1875vw,42px)] text-content xl:h-[294px] xl:w-[517px] xl:pl-6 xl:text-base xl:leading-[42px] max-lg:h-auto max-lg:w-[min(100%,517px)] max-lg:pl-5 max-lg:text-sm max-lg:leading-[1.75] max-lg:[&_li+li]:mt-2 sm:h-[462px] sm:w-[352px] sm:pl-5 sm:text-sm sm:leading-[27px] sm:[&_li+li]:mt-0 xs:h-auto xs:w-[329px] xs:overflow-hidden xs:pl-6 xs:text-sm xs:leading-[27px] xs:[&_li+li]:mt-0'>
          {copy.home.reservationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ReservationLink
          href={siteConfig.reservationUrl}
          className='gusto-booking-button inline-flex min-h-[min(2.9167vw,56px)] w-[min(18.75vw,360px)] items-center justify-center rounded-full bg-coral font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-content no-underline transition-[filter] duration-150 ease-in-out hover:brightness-[0.92] xl:min-h-[56px] xl:w-[360px] xl:text-lg max-lg:min-h-[56px] max-lg:w-[min(100%,360px)] max-lg:p-[12px_24px] max-lg:text-base sm:h-[56px] sm:min-h-[56px] sm:w-[352px] sm:p-[16px_32px] sm:text-lg sm:leading-6 xs:h-[46px] xs:min-h-[46px] xs:w-[329px] xs:p-4 xs:text-sm xs:leading-[14px]'
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
        className='gusto-reservation-brush-bottom pointer-events-none absolute bottom-[-2px] left-0 z-[2] block h-auto w-full xl:bottom-0 xl:h-[26.691189px] sm:bottom-0 sm:h-[14.235302px] xs:bottom-0 xs:h-[7.284471px]'
      />
    </section>
  );
}
