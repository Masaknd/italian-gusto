'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';
import { siteConfig } from '@/lib/site-config';
import { ReservationLink } from './reservation-link';

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const d = getDictionary(locale);
  const other = locale === 'ja' ? 'en' : 'ja';
  const desktopNav = [
    [d.nav.home, `/${locale}`],
    [d.nav.menu, `/${locale}/menu`],
    [d.nav.access, `/${locale}#access`],
  ];
  const mobileNav = [
    [d.home.heroNav.home, `/${locale}`],
    [d.home.heroNav.menu, `/${locale}/menu`],
    [d.home.heroNav.access, `/${locale}#access`],
    [d.footer.nav.story, `/${locale}#about`],
  ];
  useEffect(() => {
    const mobileMenu = window.matchMedia('(max-width: 767px)');
    const closeOutsideMobile = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false);
    };
    mobileMenu.addEventListener('change', closeOutsideMobile);
    return () => mobileMenu.removeEventListener('change', closeOutsideMobile);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const focusableSelector = 'a[href], button:not([disabled])';
    const focusable = Array.from(
      menuRef.current?.querySelectorAll(focusableSelector) ?? [],
    ).filter((node): node is HTMLElement => node instanceof HTMLElement);
    const first = focusable[0];
    const last = focusable.at(-1);

    document.body.style.overflow = 'hidden';
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

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
          {desktopNav.map(([label, href]) => (
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
          ref={menuButtonRef}
          type='button'
          aria-expanded={open}
          aria-haspopup='dialog'
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
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id='mobile-nav'
            role='dialog'
            aria-modal='true'
            aria-label={d.nav.menu}
            className='site-header-mobile-nav'
            initial={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className='site-header-mobile-header'>
              <button
                type='button'
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className='site-header-mobile-close'
              >
                <span className='sr-only'>{d.nav.closeMenu}</span>
                <span
                  aria-hidden='true'
                  className='site-header-mobile-close-icon'
                >
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <Link
                href={`/${locale}`}
                className='site-header-mobile-logo'
                onClick={() => setOpen(false)}
              >
                <Image
                  src='/images/logo-w2@2x.png'
                  alt='Gusto Italian Bar'
                  width={692}
                  height={300}
                />
              </Link>
            </div>
            <nav aria-label={d.nav.menu} className='site-header-mobile-links'>
              <div className='site-header-mobile-link-list'>
                {mobileNav.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
              <ReservationLink
                href={siteConfig.reservationUrl}
                className='site-header-mobile-reservation'
              >
                {d.nav.mobileReserve}
              </ReservationLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
