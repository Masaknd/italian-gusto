'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { getDictionary } from '@/locales';
import { ReservationLink } from './reservation-link';

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}`;
  const isInnerPage =
    pathname === `/${locale}/menu` || pathname === `/${locale}/about`;
  const usesGustoHeader = isHomePage || isInnerPage;
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
    [d.footer.nav.story, `/${locale}/about`],
  ];

  useEffect(() => {
    const mobileMenu = window.matchMedia('(max-width: 991px)');
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
    <header
      className={[
        'bg-transparent shadow-none backdrop-filter-none',
        usesGustoHeader
          ? 'z-40 h-[84px] border-0 p-[4px_0] sm:h-[120px] sm:p-[8px_0] lg:h-[132px] lg:p-0'
          : 'sticky top-0 z-30 border-b border-ink/10',
        isHomePage ? 'relative inset-[0_0_auto] lg:absolute' : '',
        isInnerPage ? 'relative inset-auto' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'site-header-inner mx-auto flex w-full items-center justify-between bg-transparent',
          usesGustoHeader
            ? 'h-[76px] max-w-none p-[8px_16px] sm:h-[104px] lg:h-[132px] lg:p-[16px_48px]'
            : 'max-w-[var(--layout-container)] p-4 md:px-6 lg:px-24 3xl:px-60',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Link
          href={`/${locale}`}
          className={[
            'block',
            usesGustoHeader
              ? 'h-15 w-[138.425201px] sm:relative sm:-top-px sm:h-[90px] sm:w-[207.637802px] lg:static lg:h-25 lg:w-[230.708664px]'
              : 'h-auto w-40',
          ].join(' ')}
          onClick={() => setOpen(false)}
        >
          <Image
            src='/images/logo-w2@2x.png'
            alt={siteConfig.name}
            width={692}
            height={300}
            priority
            className='block h-full w-full'
          />
        </Link>

        <nav
          aria-label='Primary navigation'
          className={`items-center gap-6 ${usesGustoHeader ? 'hidden' : 'hidden lg:flex'}`}
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
            className='inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 font-sans text-body-sm font-bold text-white no-underline transition-[background-color,transform] duration-150 ease-in-out hover:-translate-y-px hover:bg-[var(--color-action-primary-hover)]'
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
          className='relative z-[1] mr-[-8px] ml-auto flex size-8 flex-[0_0_32px] items-center justify-center border-0 bg-none p-0 text-ink sm:mr-0 lg:hidden'
        >
          <span className='sr-only'>{d.nav.menu}</span>
          <span
            aria-hidden='true'
            className='relative block size-8 [&_i]:absolute [&_i]:left-[5px] [&_i]:block [&_i]:h-[3px] [&_i]:w-[22px] [&_i]:bg-ink [&_i]:opacity-100 [&_i:nth-child(1)]:top-2 [&_i:nth-child(2)]:top-4 [&_i:nth-child(3)]:top-6'
          >
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
            className='fixed inset-0 z-50 flex min-h-[100dvh] flex-col overflow-y-auto bg-ink text-warm-light will-change-[opacity,transform] lg:hidden'
            initial={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className='site-header-mobile-header relative flex h-[84px] w-full flex-[0_0_84px] items-center justify-start p-[4px_0] sm:h-auto sm:flex-[0_0_120px] sm:justify-center sm:p-[8px_24px]'>
              <button
                type='button'
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className='absolute top-[26px] right-2 flex size-8 items-center justify-center border-0 bg-transparent p-0 text-warm-light sm:top-[44px] sm:right-4'
              >
                <span className='sr-only'>{d.nav.closeMenu}</span>
                <span
                  aria-hidden='true'
                  className='relative block size-8 [&_i]:absolute [&_i]:left-[5px] [&_i]:block [&_i]:h-[3px] [&_i]:w-[22px] [&_i]:rotate-0! [&_i]:bg-current [&_i:nth-child(1)]:top-2 [&_i:nth-child(2)]:top-4 [&_i:nth-child(3)]:top-6 sm:[&_i]:top-[14.5px] sm:[&_i]:left-[7px] sm:[&_i]:w-[18px] sm:[&_i:nth-child(2)]:hidden sm:[&_i:first-child]:rotate-45! sm:[&_i:last-child]:-rotate-45!'
                >
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <Link
                href={`/${locale}`}
                className='absolute top-3 left-4 block h-[60px] w-[138.425201px] translate-x-0 sm:top-[20.976112px] sm:left-1/2 sm:h-[91.023888px] sm:w-[210px] sm:-translate-x-1/2'
                onClick={() => setOpen(false)}
              >
                <Image
                  src='/images/logo-w2@2x.png'
                  alt={siteConfig.name}
                  width={692}
                  height={300}
                  className='block h-full w-full'
                />
              </Link>
            </div>
            <nav
              aria-label={d.nav.menu}
              className='flex h-[736px] w-full flex-[0_0_736px] flex-col items-center gap-16 p-[100px_16px] sm:h-auto sm:flex-auto sm:gap-[84px] sm:p-[100px_24px]'
            >
              <div className='site-header-mobile-link-list flex w-[118px] flex-col items-center gap-7 sm:w-auto sm:gap-12 [&_a]:font-label [&_a]:text-[28px] [&_a]:leading-[45px] [&_a]:font-bold [&_a]:text-inherit [&_a]:no-underline'>
                {mobileNav.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
              <ReservationLink
                href={siteConfig.reservationUrl}
                className='flex h-[54px] w-[360px] max-w-[360px] flex-[0_0_54px] items-center justify-center bg-coral p-[8px_16px] font-label text-2xl leading-[38px] font-bold text-warm-light no-underline sm:w-full'
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
