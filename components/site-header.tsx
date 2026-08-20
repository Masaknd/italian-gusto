'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';
import { siteConfig } from '@/lib/site-config';
import { ReservationLink } from './reservation-link';

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const d = getDictionary(locale);
  const other = locale === 'ja' ? 'en' : 'ja';
  const nav = [
    [d.nav.home, `/${locale}`],
    [d.nav.menu, `/${locale}/menu`],
    [d.nav.access, `/${locale}#information`],
  ];
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className='site-header'>
      <div className='site-header-inner'>
        <Link
          href={`/${locale}`}
          className='site-header-logo'
          onClick={() => setOpen(false)}
        >
          <Image
            src='/images/logo-w2@2x.png'
            alt='Gusto Italian Bar'
            width={692}
            height={300}
            priority
          />
        </Link>
        <nav
          aria-label='Primary navigation'
          className='site-header-desktop-nav items-center gap-6'
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className='text-body-sm transition-colors hover:text-coral'
            >
              {label}
            </Link>
          ))}
          <Link
            href={`/${other}`}
            lang={other}
            className='text-body-sm underline underline-offset-4'
          >
            {other.toUpperCase()}
          </Link>
          <ReservationLink
            href={siteConfig.reservationUrl}
            className='action-primary'
          >
            {d.nav.reserve}
          </ReservationLink>
        </nav>
        <button
          type='button'
          aria-expanded={open}
          aria-controls='mobile-nav'
          onClick={() => setOpen((current) => !current)}
          className='site-header-menu-button'
        >
          <span className='sr-only'>{d.nav.menu}</span>
          <span aria-hidden='true' className='site-header-menu-icon'>
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id='mobile-nav'
          aria-label={d.nav.menu}
          className='site-header-mobile-nav border-t border-ink/10 px-[var(--layout-page-padding)] pb-5'
        >
          <button
            type='button'
            onClick={() => setOpen(false)}
            className='mt-2 text-body-sm underline underline-offset-4'
          >
            {d.nav.closeMenu}
          </button>
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className='block py-3'
            >
              {label}
            </Link>
          ))}
          <Link
            href={`/${other}`}
            onClick={() => setOpen(false)}
            className='block py-3'
          >
            {other.toUpperCase()}
          </Link>
          <ReservationLink
            href={siteConfig.reservationUrl}
            className='action-primary mt-2 flex'
          >
            {d.nav.reserve}
          </ReservationLink>
        </nav>
      )}
    </header>
  );
}
