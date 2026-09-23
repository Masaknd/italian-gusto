'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from './animations/use-reduced-motion';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site-config';
import { getDictionary } from '@/locales';
import { entranceEasing } from './animations/config';
import { ReservationLink } from './reservation-link';

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}`;
  const isInnerPage =
    pathname === `/${locale}/menu` ||
    pathname === `/${locale}/about` ||
    pathname === `/${locale}/privacy`;
  const usesGustoHeader = isHomePage || isInnerPage;
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const d = getDictionary(locale);
  const other = locale === 'ja' ? 'en' : 'ja';
  const otherPath = pathname.replace(/^\/(ja|en)(?=\/|$)/, `/${other}`);
  const preserveFragment = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = `${window.location.origin}${otherPath}${window.location.hash}`;
    setOpen(false);
  };
  const desktopNav = [
    [d.nav.home, `/${locale}`],
    [d.nav.menu, `/${locale}/menu`],
    [d.nav.access, `/${locale}#access`],
  ];
  const mobileNav = [
    [d.home.heroNav.home, `/${locale}`],
    [d.home.heroNav.menu, `/${locale}/menu`],
    [d.home.heroNav.about, `/${locale}/about`],
    [d.home.heroNav.access, `/${locale}#access`],
    [d.home.heroNav.privacy, `/${locale}/privacy`],
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
          ? 'z-40 h-21 border-0 sm:h-30 lg:h-33'
          : 'sticky top-0 z-30 border-b border-ink/10',
        isHomePage ? 'relative inset-[0_0_auto] lg:absolute' : '',
        isInnerPage ? 'relative inset-auto' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'site-header-inner relative mx-auto flex w-full items-center justify-between bg-transparent',
          usesGustoHeader
            ? 'h-19 max-w-none p-[8px_16px] sm:h-26 lg:h-33 lg:p-[16px_48px]'
            : 'max-w-(--layout-container) p-4 md:px-6 lg:px-24 3xl:px-60',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Link
          href={`/${locale}`}
          className={[
            'block',
            usesGustoHeader
              ? 'h-15 w-[138.425201px] sm:relative sm:-top-px sm:h-22.5 sm:w-[207.637802px] lg:static lg:h-25 lg:w-[230.708664px]'
              : 'h-auto w-40',
          ].join(' ')}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className='block h-full w-full'
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: entranceEasing,
            }}
          >
            <Image
              src='/images/logo-w2@2x.png'
              alt={siteConfig.name}
              width={692}
              height={300}
              priority
              className='block h-full w-full'
            />
          </motion.div>
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
          <ReservationLink className='inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 font-sans text-body-sm font-bold text-white no-underline transition-[background-color,transform] duration-150 ease-in-out hover:-translate-y-px hover:bg-action-hover'>
            {d.nav.reserve}
          </ReservationLink>
        </nav>
        <div className='group top-0 right-0 hidden h-0 w-0 cursor-pointer border-t-120 border-l-120 border-t-coral border-l-transparent hover:border-t-ink lg:absolute lg:block'>
          <a
            href={otherPath}
            lang={other}
            onClick={preserveFragment}
            className={`absolute -top-20 right-10 translate-x-1/2 -translate-y-1/2 font-display text-2xl font-bold tracking-[-0.25em] text-ink transition-colors group-hover:text-coral`}
            aria-label={d.nav.switchLanguage}
          >
            {d.nav.switchLanguageLabel}
          </a>
        </div>

        {/* HEADER:MOBILE */}
        <div className='flex items-center justify-center gap-8'>
          <div className='block lg:hidden'>
            <a
              href={otherPath}
              lang={other}
              onClick={preserveFragment}
              className={`font-label text-2xl font-bold text-ink`}
              aria-label={d.nav.switchLanguage}
            >
              {d.nav.switchLanguageLabel}
            </a>
          </div>

          <button
            ref={menuButtonRef}
            type='button'
            aria-expanded={open}
            aria-haspopup='dialog'
            aria-controls='mobile-nav'
            onClick={() => setOpen((current) => !current)}
            className='relative z-1 mr-[-8px] ml-auto flex size-8 flex-[0_0_32px] items-center justify-center border-0 bg-none p-0 text-ink sm:mr-0 lg:hidden'
          >
            <span className='sr-only'>{d.nav.menu}</span>
            <span
              aria-hidden='true'
              className='relative block size-8 [&_i]:absolute [&_i]:left-1.25 [&_i]:block [&_i]:h-0.75 [&_i]:w-5.5 [&_i]:bg-ink [&_i]:opacity-100 [&_i:nth-child(1)]:top-2 [&_i:nth-child(2)]:top-4 [&_i:nth-child(3)]:top-6'
            >
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id='mobile-nav'
            role='dialog'
            aria-modal='true'
            aria-label={d.nav.menu}
            className='fixed inset-0 z-50 flex min-h-dvh flex-col overflow-y-auto bg-ink text-warm-light will-change-[opacity,transform] lg:hidden'
            initial={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.32,
              ease: entranceEasing,
            }}
          >
            <div className='site-header-mobile-header relative flex h-21 w-full flex-[0_0_84px] items-center justify-start p-[4px_0] sm:h-auto sm:flex-[0_0_120px] sm:justify-center sm:p-[8px_24px]'>
              <button
                type='button'
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className='absolute top-6.5 right-2 flex size-8 items-center justify-center border-0 bg-transparent p-0 text-warm-light sm:top-11 sm:right-4'
              >
                <span className='sr-only'>{d.nav.closeMenu}</span>
                <span
                  aria-hidden='true'
                  className='relative block size-8 [&_i]:absolute [&_i]:left-1.25 [&_i]:block [&_i]:h-0.75 [&_i]:w-5.5 [&_i]:rotate-0! [&_i]:bg-current sm:[&_i]:top-[14.5px] sm:[&_i]:left-1.75 sm:[&_i]:w-4.5 sm:[&_i:first-child]:rotate-45! sm:[&_i:last-child]:-rotate-45! [&_i:nth-child(1)]:top-2 [&_i:nth-child(2)]:top-4 sm:[&_i:nth-child(2)]:hidden [&_i:nth-child(3)]:top-6'
                >
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <Link
                href={`/${locale}`}
                className='absolute top-3 left-4 block h-15 w-[138.425201px] translate-x-0 sm:top-[20.976112px] sm:left-1/2 sm:h-[91.023888px] sm:w-52.5 sm:-translate-x-1/2'
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
              className='flex h-184 w-full flex-[0_0_736px] flex-col items-center gap-16 p-[100px_16px] sm:h-auto sm:flex-auto sm:gap-21 sm:p-[100px_24px]'
            >
              <div className='site-header-mobile-link-list flex w-full flex-col items-center gap-6 [&_a]:font-label [&_a]:text-[28px] [&_a]:leading-11.25 [&_a]:font-bold [&_a]:text-inherit [&_a]:no-underline'>
                {mobileNav.map(([label, href]) => (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
              <ReservationLink className='flex flex-[0_0_54px] items-center justify-center rounded-md bg-coral p-[8px_64px] font-label text-2xl leading-9.5 font-bold text-warm-light no-underline'>
                {d.nav.mobileReserve}
              </ReservationLink>
              <a
                href={otherPath}
                lang={other}
                onClick={preserveFragment}
                className={`text-xl text-warm-light underline underline-offset-4`}
              >
                {d.nav.switchLanguage}: {d.nav.switchLanguageLabel}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
