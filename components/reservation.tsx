import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { ReservationLink } from './reservation-link';

export function HomeReservationSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section
      id='reservation'
      className="gusto-reservation relative isolate grid h-[min(50vw,960px)] place-items-center overflow-hidden text-content after:absolute after:inset-0 after:z-[-1] after:bg-black/70 after:mix-blend-multiply after:content-[''] min-[1200px]:max-[1599px]:block min-[1200px]:max-[1599px]:h-[914px] max-[1100px]:h-[720px] max-[1100px]:min-h-0 max-[1100px]:p-[56px_24px] min-[481px]:max-[768.02px]:block min-[481px]:max-[768.02px]:h-[832px] min-[481px]:max-[768.02px]:p-0 max-[480px]:block max-[480px]:h-auto max-[480px]:p-[100px_16px]"
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
        className='gusto-reservation-brush-top pointer-events-none absolute top-0 left-0 z-[2] block h-auto w-full min-[1200px]:max-[1599px]:h-[26.691189px] min-[481px]:max-[768.02px]:hidden max-[480px]:h-[7.284471px]'
      />
      <div className='gusto-booking z-[1] flex h-[min(26.7708vw,514px)] w-[min(36.9792vw,710px)] flex-col items-center justify-start gap-[min(1.25vw,24px)] [background:rgb(27_40_27_/_70%)] p-[min(0.8333vw,16px)] text-center min-[1200px]:max-[1599px]:absolute min-[1200px]:max-[1599px]:top-[200px] min-[1200px]:max-[1599px]:left-[414px] min-[1200px]:max-[1599px]:h-[514px] min-[1200px]:max-[1599px]:w-[710px] min-[1200px]:max-[1599px]:gap-6 min-[1200px]:max-[1599px]:p-4 max-[1100px]:h-auto max-[1100px]:min-h-[500px] max-[1100px]:w-[min(100%,568px)] max-[1100px]:min-w-0 max-[1100px]:gap-6 max-[1100px]:p-6 min-[481px]:max-[768.02px]:absolute min-[481px]:max-[768.02px]:top-[76.999969px] min-[481px]:max-[768.02px]:left-[192px] min-[481px]:max-[768.02px]:h-[678.000061px] min-[481px]:max-[768.02px]:min-h-0 min-[481px]:max-[768.02px]:w-[384px] min-[481px]:max-[768.02px]:gap-6 min-[481px]:max-[768.02px]:p-4 max-[480px]:relative max-[480px]:top-auto max-[480px]:left-auto max-[480px]:h-auto max-[480px]:min-h-0 max-[480px]:w-[361px] max-[480px]:gap-6 max-[480px]:p-4'>
        <div className='gusto-booking-title flex flex-col items-center gap-[min(0.2083vw,4px)] min-[1200px]:max-[1599px]:h-[84px] min-[1200px]:max-[1599px]:w-[322px] min-[1200px]:max-[1599px]:gap-1 min-[481px]:max-[768.02px]:h-[80.000038px] min-[481px]:max-[768.02px]:w-[297px] min-[481px]:max-[768.02px]:gap-1 max-[480px]:h-[54.000042px] max-[480px]:w-[198px] max-[480px]:gap-1'>
          <h2 className='h-auto w-auto font-display text-[min(2.7083vw,52px)] leading-none font-normal tracking-[-0.288em] text-coral min-[1200px]:max-[1599px]:h-[52px] min-[1200px]:max-[1599px]:w-[322px] min-[1200px]:max-[1599px]:text-[52px] max-[1100px]:text-[42px] min-[481px]:max-[768.02px]:h-12 min-[481px]:max-[768.02px]:w-[297px] min-[481px]:max-[768.02px]:text-5xl min-[481px]:max-[768.02px]:leading-12 min-[481px]:max-[768.02px]:tracking-[-0.25em] max-[480px]:h-8 max-[480px]:w-[198px] max-[480px]:text-[32px] max-[480px]:leading-8 max-[480px]:tracking-[-0.25em]'>
            {copy.home.reservationTitle}
          </h2>
          <p className="relative m-0 pb-[min(0.2083vw,4px)] font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-coral after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-[repeating-linear-gradient(90deg,var(--color-brand-coral)_0_8px,transparent_8px_16px)] after:content-[''] min-[1200px]:max-[1599px]:h-7 min-[1200px]:max-[1599px]:w-[234px] min-[1200px]:max-[1599px]:pb-1 min-[1200px]:max-[1599px]:text-lg min-[1200px]:max-[1599px]:whitespace-nowrap max-[1100px]:pb-1 max-[1100px]:text-base min-[481px]:max-[768.02px]:h-7 min-[481px]:max-[768.02px]:w-[234px] min-[481px]:max-[768.02px]:pb-1 min-[481px]:max-[768.02px]:text-lg min-[481px]:max-[768.02px]:leading-6 min-[481px]:max-[768.02px]:whitespace-nowrap max-[480px]:h-[18px] max-[480px]:w-[182px] max-[480px]:pb-1 max-[480px]:text-sm max-[480px]:leading-[14px] max-[480px]:whitespace-nowrap">
            {copy.home.reservationLabel}
          </p>
        </div>
        <ul className='gusto-booking-notes m-0 h-[min(15.3125vw,294px)] w-[min(26.9271vw,517px)] pl-[min(1.25vw,24px)] text-left text-[min(0.8333vw,16px)] leading-[min(2.1875vw,42px)] text-content min-[1200px]:max-[1599px]:h-[294px] min-[1200px]:max-[1599px]:w-[517px] min-[1200px]:max-[1599px]:pl-6 min-[1200px]:max-[1599px]:text-base min-[1200px]:max-[1599px]:leading-[42px] max-[1100px]:h-auto max-[1100px]:w-[min(100%,517px)] max-[1100px]:pl-5 max-[1100px]:text-sm max-[1100px]:leading-[1.75] max-[1100px]:[&_li+li]:mt-2 min-[481px]:max-[768.02px]:h-[462px] min-[481px]:max-[768.02px]:w-[352px] min-[481px]:max-[768.02px]:pl-5 min-[481px]:max-[768.02px]:text-sm min-[481px]:max-[768.02px]:leading-[27px] min-[481px]:max-[768.02px]:[&_li+li]:mt-0 max-[480px]:h-auto max-[480px]:w-[329px] max-[480px]:overflow-hidden max-[480px]:pl-6 max-[480px]:text-sm max-[480px]:leading-[27px] max-[480px]:[&_li+li]:mt-0'>
          {copy.home.reservationNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <ReservationLink
          href={siteConfig.reservationUrl}
          className='gusto-booking-button inline-flex min-h-[min(2.9167vw,56px)] w-[min(18.75vw,360px)] items-center justify-center rounded-full bg-coral font-accent text-[min(0.9375vw,18px)] leading-[1.36] text-content no-underline transition-[filter] duration-150 ease-in-out hover:brightness-[0.92] min-[1200px]:max-[1599px]:min-h-[56px] min-[1200px]:max-[1599px]:w-[360px] min-[1200px]:max-[1599px]:text-lg max-[1100px]:min-h-[56px] max-[1100px]:w-[min(100%,360px)] max-[1100px]:p-[12px_24px] max-[1100px]:text-base min-[481px]:max-[768.02px]:h-[56px] min-[481px]:max-[768.02px]:min-h-[56px] min-[481px]:max-[768.02px]:w-[352px] min-[481px]:max-[768.02px]:p-[16px_32px] min-[481px]:max-[768.02px]:text-lg min-[481px]:max-[768.02px]:leading-6 max-[480px]:h-[46px] max-[480px]:min-h-[46px] max-[480px]:w-[329px] max-[480px]:p-4 max-[480px]:text-sm max-[480px]:leading-[14px]'
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
        className='gusto-reservation-brush-bottom pointer-events-none absolute bottom-[-2px] left-0 z-[2] block h-auto w-full min-[1200px]:max-[1599px]:bottom-0 min-[1200px]:max-[1599px]:h-[26.691189px] min-[481px]:max-[768.02px]:bottom-0 min-[481px]:max-[768.02px]:h-[14.235302px] max-[480px]:bottom-0 max-[480px]:h-[7.284471px]'
      />
    </section>
  );
}
