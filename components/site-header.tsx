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
    const mobileMenu = window.matchMedia('(max-width: 768px)');
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
          ? 'z-40 h-[132px] border-0 max-[768.02px]:relative max-[768.02px]:h-[120px] max-[768.02px]:p-[8px_0] max-[480.02px]:h-[84px] max-[480.02px]:p-[4px_0]'
          : 'sticky top-0 z-30 border-b border-ink/10',
        isHomePage ? 'absolute inset-[0_0_auto]' : '',
        isInnerPage ? 'relative inset-auto' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'site-header-inner mx-auto flex w-full items-center justify-between bg-transparent',
          usesGustoHeader
            ? 'h-[132px] max-w-none p-[16px_48px]'
            : 'max-w-[var(--layout-container)] p-[16px_var(--layout-page-padding)]',
          usesGustoHeader
            ? 'max-[768.02px]:h-[104px] max-[768.02px]:p-[8px_16px] max-[480.02px]:h-[76px] max-[480.02px]:p-[8px_16px]'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Link
          href={`/${locale}`}
          className={[
            'block',
            usesGustoHeader
              ? 'h-[100px] w-[230.708664px] max-[768.02px]:relative max-[768.02px]:top-[-1px] max-[768.02px]:h-[90px] max-[768.02px]:w-[207.637802px] max-[480.02px]:top-0 max-[480.02px]:h-[60px] max-[480.02px]:w-[138.425201px]'
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
          className={`items-center gap-6 max-[768.02px]:hidden ${usesGustoHeader ? 'hidden' : 'flex'}`}
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
          className='relative z-[1] ml-auto hidden size-8 flex-[0_0_32px] items-center justify-center border-0 bg-none p-0 text-ink max-[768.02px]:flex max-[480.02px]:mr-[-8px]'
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
            className='fixed inset-0 z-50 hidden min-h-[100dvh] flex-col overflow-y-auto bg-ink text-warm-light will-change-[opacity,transform] max-[768.02px]:flex'
            initial={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : '100%' }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className='site-header-mobile-header relative flex w-full flex-[0_0_120px] items-center justify-center p-[8px_24px] max-[480.02px]:h-[84px] max-[480.02px]:basis-[84px] max-[480.02px]:justify-start max-[480.02px]:p-[4px_0]'>
              <button
                type='button'
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className='absolute top-[44px] right-4 flex size-8 items-center justify-center border-0 bg-transparent p-0 text-warm-light max-[480.02px]:top-[26px] max-[480.02px]:right-2'
              >
                <span className='sr-only'>{d.nav.closeMenu}</span>
                <span
                  aria-hidden='true'
                  className='relative block size-8 [&_i]:absolute [&_i]:top-[14.5px] [&_i]:left-[7px] [&_i]:block [&_i]:h-[3px] [&_i]:w-[18px] [&_i]:bg-current [&_i:nth-child(2)]:hidden [&_i:first-child]:rotate-45 [&_i:last-child]:-rotate-45 max-[480.02px]:[&_i]:left-[5px] max-[480.02px]:[&_i]:w-[22px] max-[480.02px]:[&_i]:rotate-0! max-[480.02px]:[&_i:nth-child(1)]:top-2 max-[480.02px]:[&_i:nth-child(2)]:top-4 max-[480.02px]:[&_i:nth-child(2)]:block max-[480.02px]:[&_i:nth-child(3)]:top-6'
                >
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <Link
                href={`/${locale}`}
                className='absolute top-[20.976112px] left-1/2 block h-[91.023888px] w-[210px] -translate-x-1/2 max-[480.02px]:top-3 max-[480.02px]:left-4 max-[480.02px]:h-[60px] max-[480.02px]:w-[138.425201px] max-[480.02px]:translate-x-0'
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
              className='flex w-full flex-col items-center gap-[84px] p-[100px_24px] max-[480.02px]:h-[736px] max-[480.02px]:flex-[0_0_736px] max-[480.02px]:gap-16 max-[480.02px]:p-[100px_16px]'
            >
              <div className='site-header-mobile-link-list flex flex-col items-center gap-12 [&_a]:font-label [&_a]:text-[28px] [&_a]:leading-[45px] [&_a]:font-bold [&_a]:text-inherit [&_a]:no-underline max-[480.02px]:w-[118px] max-[480.02px]:gap-7'>
                {mobileNav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <ReservationLink
                href={siteConfig.reservationUrl}
                className='flex h-[54px] w-full max-w-[360px] items-center justify-center bg-coral p-[8px_16px] font-label text-2xl leading-[38px] font-bold text-warm-light no-underline max-[480.02px]:w-[360px] max-[480.02px]:flex-[0_0_54px]'
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
