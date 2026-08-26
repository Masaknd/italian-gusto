'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';
import { siteConfig } from '@/lib/site-config';
import { ReservationLink } from './reservation-link';
export function SiteHeader({ locale }: {
    locale: Locale;
}) {
    const pathname = usePathname();
    const isMenuPage = pathname === `/${locale}/menu`;
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
        const mobileMenu = window.matchMedia('(max-width: 768px)');
        const closeOutsideMobile = (event: MediaQueryListEvent) => {
            if (!event.matches)
                setOpen(false);
        };
        mobileMenu.addEventListener('change', closeOutsideMobile);
        return () => mobileMenu.removeEventListener('change', closeOutsideMobile);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const previousOverflow = document.body.style.overflow;
        const focusableSelector = 'a[href], button:not([disabled])';
        const focusable = Array.from(menuRef.current?.querySelectorAll(focusableSelector) ?? []).filter((node): node is HTMLElement => node instanceof HTMLElement);
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
            if (event.key !== 'Tab' || !first || !last)
                return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
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
    return (<header className={`site-header sticky top-0 z-[30] border-0 bg-none bg-transparent bg-none backdrop-filter-none shadow-none [body:has(.gusto-home)_&]:absolute [body:has(.gusto-home)_&]:inset-[0_0_auto] [body:has(.gusto-home)_&]:z-[40] [body:has(.gusto-home)_&]:h-[132px] [body:has(.gusto-home)_&]:border-0 [body:has(.gusto-home)_&]:bg-none [body:has(.gusto-home)_&]:bg-transparent [body:has(.gusto-home)_&]:bg-none [body:has(.gusto-home)_&]:backdrop-filter-none [body:has(.gusto-home)_&]:shadow-none max-[768.02px]:[body:has(.gusto-home)_&]:h-[120px]! max-[768.02px]:[body:has(.gusto-home)_&]:p-[8px_0]! min-[481px]:max-[768.02px]:[body:has(.gusto-home)_&]:relative! max-[480.02px]:[body:has(.gusto-home)_&]:h-[84px]! max-[480.02px]:[body:has(.gusto-home)_&]:p-[4px_0]! max-[480.02px]:[body:has(.gusto-home)_&]:relative!${isMenuPage ? ' site-header--menu' : ''}`}>
      <div className={"site-header-inner items-center flex justify-between mx-auto max-w-[var(--layout-container)] p-[16px_var(--layout-page-padding)] w-full bg-none bg-transparent bg-none [body:has(.gusto-home)_&]:h-[132px] [body:has(.gusto-home)_&]:max-w-none [body:has(.gusto-home)_&]:p-[16px_48px] min-[769px]:[body:has(.gusto-home)_&_>_nav]:hidden! max-[768.02px]:[body:has(.gusto-home)_&]:h-[104px]! max-[768.02px]:[body:has(.gusto-home)_&]:p-[8px_16px]! max-[480.02px]:[body:has(.gusto-home)_&]:h-[76px]! max-[480.02px]:[body:has(.gusto-home)_&]:p-[8px_16px]!"}>
        <Link href={`/${locale}`} className={"site-header-logo [body:has(.gusto-home)_header_&]:block [body:has(.gusto-home)_header_&]:w-[230.708664px] [body:has(.gusto-home)_header_&]:h-[100px] [body:has(.gusto-home)_header_&_img]:block [body:has(.gusto-home)_header_&_img]:w-full [body:has(.gusto-home)_header_&_img]:h-full max-[768.02px]:[body:has(.gusto-home)_header_&]:h-[90px]! max-[768.02px]:[body:has(.gusto-home)_header_&]:relative! max-[768.02px]:[body:has(.gusto-home)_header_&]:top-[-1px]! max-[768.02px]:[body:has(.gusto-home)_header_&]:w-[207.637802px]! max-[768.02px]:[body:has(.gusto-home)_header_&_img]:h-[90px]! max-[768.02px]:[body:has(.gusto-home)_header_&_img]:w-[207.637802px]! max-[480.02px]:[body:has(.gusto-home)_header_&]:h-[60px]! max-[480.02px]:[body:has(.gusto-home)_header_&]:top-0! max-[480.02px]:[body:has(.gusto-home)_header_&]:w-[138.425201px]! max-[480.02px]:[body:has(.gusto-home)_header_&_img]:h-[60px]! max-[480.02px]:[body:has(.gusto-home)_header_&_img]:w-[138.425201px]!"} onClick={() => setOpen(false)}>
          <Image src='/images/logo-w2@2x.png' alt='Gusto Italian Bar' width={692} height={300} priority/>
        </Link>
        <nav aria-label='Primary navigation' className={"site-header-desktop-nav flex max-[768.02px]:hidden! items-center gap-6"}>
          {desktopNav.map(([label, href]) => (<Link key={href} href={href} className="text-body-sm transition-colors hover:text-coral">
              {label}
            </Link>))}
          <Link href={`/${other}`} lang={other} className="text-body-sm underline underline-offset-4">
            {other.toUpperCase()}
          </Link>
          <ReservationLink href={siteConfig.reservationUrl} className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-2.5 font-sans text-body-sm font-bold text-white no-underline transition-[background-color,transform] duration-150 ease-in-out hover:-translate-y-px hover:bg-[var(--color-action-primary-hover)]">
            {d.nav.reserve}
          </ReservationLink>
        </nav>
        <button ref={menuButtonRef} type='button' aria-expanded={open} aria-haspopup='dialog' aria-controls='mobile-nav' onClick={() => setOpen((current) => !current)} className={"site-header-menu-button [body:has(.gusto-home)_&]:text-[var(--color-brand-ink)] min-[769px]:[body:has(.gusto-home)_&]:hidden! items-center bg-none border-0 text-[inherit] hidden flex-[0_0_32px] h-[32px] justify-center ml-auto p-0 relative z-[1] w-[32px] max-[768.02px]:flex! max-[480.02px]:[body:has(.gusto-home)_&]:mr-[-8px]!"}>
          <span className="sr-only">{d.nav.menu}</span>
          <span aria-hidden='true' className={"site-header-menu-icon block h-[32px] relative w-[32px] [&_i]:bg-[var(--color-brand-ink)] [&_i]:block [&_i]:h-[3px] [&_i]:left-[5px] [&_i]:opacity-[1] [&_i]:absolute [&_i]:w-[22px] [&_i:nth-child(1)]:top-[8px] [&_i:nth-child(2)]:top-[16px] [&_i:nth-child(3)]:top-[24px]"}>
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (<motion.div ref={menuRef} id='mobile-nav' role='dialog' aria-modal='true' aria-label={d.nav.menu} className={"site-header-mobile-nav hidden max-[768.02px]:bg-[var(--color-brand-ink)]! max-[768.02px]:text-[var(--color-brand-warm-light)]! max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:inset-0! max-[768.02px]:min-h-[100dvh]! max-[768.02px]:overflow-y-auto! max-[768.02px]:fixed! max-[768.02px]:will-change-[opacity,_transform]! max-[768.02px]:z-[50]! max-[480.02px]:inset-0!"} initial={{ opacity: 0, x: reduceMotion ? 0 : '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduceMotion ? 0 : '100%' }} transition={{
                duration: reduceMotion ? 0.15 : 0.32,
                ease: [0.22, 1, 0.36, 1],
            }}>
            <div className={"site-header-mobile-header max-[768.02px]:items-center! max-[768.02px]:flex! max-[768.02px]:flex-[0_0_120px]! max-[768.02px]:justify-center! max-[768.02px]:p-[8px_24px]! max-[768.02px]:relative! max-[768.02px]:w-full! max-[480.02px]:basis-[84px]! max-[480.02px]:h-[84px]! max-[480.02px]:justify-start! max-[480.02px]:p-[4px_0]!"}>
              <button type='button' onClick={() => {
                setOpen(false);
                menuButtonRef.current?.focus();
            }} className={"site-header-mobile-close max-[768.02px]:items-center! max-[768.02px]:bg-transparent! max-[768.02px]:border-0! max-[768.02px]:text-[var(--color-brand-warm-light)]! max-[768.02px]:flex! max-[768.02px]:h-[32px]! max-[768.02px]:justify-center! max-[768.02px]:p-0! max-[768.02px]:absolute! max-[768.02px]:right-[16px]! max-[768.02px]:top-[44px]! max-[768.02px]:w-[32px]! max-[480.02px]:right-[8px]! max-[480.02px]:top-[26px]!"}>
                <span className="sr-only">{d.nav.closeMenu}</span>
                <span aria-hidden='true' className={"site-header-mobile-close-icon max-[768.02px]:block! max-[768.02px]:h-[32px]! max-[768.02px]:relative! max-[768.02px]:w-[32px]! max-[768.02px]:[&_i]:bg-[currentColor]! max-[768.02px]:[&_i]:block! max-[768.02px]:[&_i]:h-[3px]! max-[768.02px]:[&_i]:left-[7px]! max-[768.02px]:[&_i]:absolute! max-[768.02px]:[&_i]:top-[14.5px]! max-[768.02px]:[&_i]:w-[18px]! max-[768.02px]:[&_i:nth-child(2)]:hidden! max-[768.02px]:[&_i:first-child]:rotate-[45deg]! max-[768.02px]:[&_i:last-child]:rotate-[-45deg]! max-[480.02px]:[&_i]:left-[5px]! max-[480.02px]:[&_i]:rotate-0! max-[480.02px]:[&_i:first-child]:rotate-0! max-[480.02px]:[&_i:last-child]:rotate-0! max-[480.02px]:[&_i]:w-[22px]! max-[480.02px]:[&_i:nth-child(1)]:top-[8px]! max-[480.02px]:[&_i:nth-child(2)]:block! max-[480.02px]:[&_i:nth-child(2)]:top-[16px]! max-[480.02px]:[&_i:nth-child(3)]:top-[24px]!"}>
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <Link href={`/${locale}`} className={"site-header-mobile-logo max-[768.02px]:block! max-[768.02px]:h-[91.023888px]! max-[768.02px]:left-[50%]! max-[768.02px]:absolute! max-[768.02px]:top-[20.976112px]! max-[768.02px]:translate-x-[-50%]! max-[768.02px]:w-[210px]! max-[768.02px]:[&_img]:block! max-[768.02px]:[&_img]:h-full! max-[768.02px]:[&_img]:w-full! max-[480.02px]:h-[60px]! max-[480.02px]:left-[16px]! max-[480.02px]:top-[12px]! max-[480.02px]:translate-x-0! max-[480.02px]:w-[138.425201px]!"} onClick={() => setOpen(false)}>
                <Image src='/images/logo-w2@2x.png' alt='Gusto Italian Bar' width={692} height={300}/>
              </Link>
            </div>
            <nav aria-label={d.nav.menu} className={"site-header-mobile-links max-[768.02px]:items-center! max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:gap-[84px]! max-[768.02px]:p-[100px_24px]! max-[768.02px]:w-full! max-[480.02px]:flex-[0_0_736px]! max-[480.02px]:gap-[64px]! max-[480.02px]:h-[736px]! max-[480.02px]:p-[100px_16px_100px]!"}>
              <div className={"site-header-mobile-link-list max-[768.02px]:items-center! max-[768.02px]:flex! max-[768.02px]:flex-col! max-[768.02px]:gap-[48px]! max-[768.02px]:[&_a]:text-[inherit]! max-[768.02px]:[&_a]:font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif]! max-[768.02px]:[&_a]:text-[28px]! max-[768.02px]:[&_a]:font-bold! max-[768.02px]:[&_a]:leading-[45px]! max-[768.02px]:[&_a]:no-underline! max-[480.02px]:gap-[28px]! max-[480.02px]:w-[118px]!"}>
                {mobileNav.map(([label, href]) => (<Link key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>))}
              </div>
              <ReservationLink href={siteConfig.reservationUrl} className={"site-header-mobile-reservation max-[768.02px]:items-center! max-[768.02px]:bg-[var(--color-brand-coral)]! max-[768.02px]:text-[var(--color-brand-warm-light)]! max-[768.02px]:flex! max-[768.02px]:font-[family-name:var(--font-kalam),_var(--font-noto-sans-jp),_sans-serif]! max-[768.02px]:text-[24px]! max-[768.02px]:font-bold! max-[768.02px]:h-[54px]! max-[768.02px]:justify-center! max-[768.02px]:leading-[38px]! max-[768.02px]:max-w-[360px]! max-[768.02px]:p-[8px_16px]! max-[768.02px]:no-underline! max-[768.02px]:w-full! max-[480.02px]:flex-[0_0_54px]! max-[480.02px]:w-[360px]!"}>
                {d.nav.mobileReserve}
              </ReservationLink>
            </nav>
          </motion.div>)}
      </AnimatePresence>
    </header>);
}
