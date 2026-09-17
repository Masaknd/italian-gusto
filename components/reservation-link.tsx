'use client';

import { trackReservationClick } from './analytics';

export function ReservationLink({
  href,
  children,
  className,
  ariaLabel,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={trackReservationClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
