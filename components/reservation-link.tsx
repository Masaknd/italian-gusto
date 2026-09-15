'use client';

import { trackReservationClick } from './analytics';

export function ReservationLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      onClick={trackReservationClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
