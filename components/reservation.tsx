import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { ReservationLink } from './reservation-link';

export function HomeReservationSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='reservation'
      className="gusto-reservation relative isolate flex items-center justify-center overflow-hidden p-[100px_16px] text-content after:absolute after:inset-0 after:z-[-1] after:bg-black/70 after:mix-blend-multiply after:content-[''] sm:h-[832px] sm:p-0 lg:h-[720px] lg:min-h-0 lg:p-[56px_24px] xl:h-[914px] xl:p-0"
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
      <div className='gusto-booking z-[1] flex flex-col items-center justify-start gap-6 p-4 text-center [background:rgb(27_40_27_/_70%)] sm:p-8 lg:p-14'>
        <div className='gusto-booking-title flex w-full flex-col items-center gap-1'>
          <h2 className='font-display text-[32px] leading-8 font-normal tracking-[-0.25em] text-coral sm:text-5xl sm:leading-8 lg:text-[42px] lg:leading-10 lg:tracking-[-0.288em] xl:text-[52px]'>
            {copy.home.reservationTitle}
          </h2>
          <p className="relative pb-1 font-accent text-sm leading-3.5 whitespace-nowrap text-coral after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] sm:text-lg sm:leading-6 lg:text-base lg:leading-[1.36] xl:text-lg">
            {copy.home.reservationLabel}
          </p>
        </div>
        <ul className='gusto-booking-notes w-auto overflow-hidden text-left text-sm leading-[27px] text-content sm:w-[60vw] lg:w-[30vw] lg:leading-[1.75] xl:text-base xl:leading-[42px]'>
          {copy.home.reservationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ReservationLink
          href={siteConfig.reservationUrl}
          className='gusto-booking-button inline-flex cursor-pointer items-center justify-center rounded-full bg-coral p-4 font-accent text-sm leading-3.5 text-content no-underline transition-[filter] duration-150 ease-in-out hover:brightness-[0.92] sm:p-[16px_32px] sm:text-lg sm:leading-6 lg:p-[12px_24px] lg:text-base xl:text-lg'
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
