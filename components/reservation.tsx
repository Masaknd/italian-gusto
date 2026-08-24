import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import type { HomePageCopy } from './types';
import { ReservationLink } from './reservation-link';

export function HomeReservationSection({ copy }: { copy: HomePageCopy }) {
  return (
    <section id='reservation' className='gusto-reservation'>
      <Image src='/images/slide-8.jpg' alt='' fill sizes='100vw' className='gusto-reservation-image' />
      <Image src='/images/b-5.png' alt='' width={3849} height={72} sizes='100vw' className='gusto-reservation-brush gusto-reservation-brush-top' />
      <div className='gusto-booking'>
        <div className='gusto-booking-title'>
          <h2>{copy.home.reservationTitle}</h2>
          <p>{copy.home.reservationLabel}</p>
        </div>
        <ul className='gusto-booking-notes'>
          {copy.home.reservationNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
        <ReservationLink href={siteConfig.reservationUrl} className='gusto-booking-button' ariaLabel={copy.reserve.external}>
          {copy.home.reservationCta}
        </ReservationLink>
      </div>
      <Image src='/images/b-4.png' alt='' width={3849} height={72} sizes='100vw' className='gusto-reservation-brush gusto-reservation-brush-bottom' />
    </section>
  );
}
