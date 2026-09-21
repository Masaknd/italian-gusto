'use client';

import { siteConfig } from '@/lib/site-config';
import { trackReservationClick } from './analytics';

export function ReservationLink({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={siteConfig.reservationUrl}
      onClick={trackReservationClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
