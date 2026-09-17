'use client';

import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/locales';

const consentKey = 'gusto-analytics-consent';
const consentEvent = 'gusto-analytics-consent-changed';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function setAnalyticsConsent(allowed: boolean) {
  window.localStorage.setItem(consentKey, allowed ? 'yes' : 'no');
  window.dispatchEvent(new Event(consentEvent));
}

export function Analytics({ locale }: { locale: Locale }) {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const copy = getDictionary(locale);
  const [consent, setConsent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    const sync = () => setConsent(window.localStorage.getItem(consentKey));
    sync();
    window.addEventListener(consentEvent, sync);
    return () => window.removeEventListener(consentEvent, sync);
  }, []);

  useEffect(() => {
    if (id) {
      const analyticsWindow = window as unknown as Window &
        Record<string, unknown>;
      analyticsWindow[`ga-disable-${id}`] = consent !== 'yes';
    }
    if (consent !== 'yes') {
      lastPageView.current = null;
      return;
    }
    if (!ready || !id || !window.gtag || lastPageView.current === pathname)
      return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
    });
    lastPageView.current = pathname;
  }, [consent, ready, id, pathname]);

  if (!id) return null;
  return (
    <>
      {consent === null && (
        <div
          className='fixed right-4 bottom-4 left-4 z-60 mx-auto max-w-lg rounded-md bg-ink p-5 text-warm-light shadow-lg'
          role='region'
          aria-label={copy.privacy.consentTitle}
        >
          <p className='mb-4'>
            {copy.privacy.consentBody}{' '}
            <Link href={`/${locale}/privacy`} className='underline'>
              {copy.footer.nav.privacy}
            </Link>
          </p>
          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={() => setAnalyticsConsent(false)}
              className='min-h-11 rounded-md border border-warm-light px-4'
            >
              {copy.privacy.reject}
            </button>
            <button
              type='button'
              onClick={() => setAnalyticsConsent(true)}
              className='min-h-11 rounded-md bg-coral px-4'
            >
              {copy.privacy.accept}
            </button>
          </div>
        </div>
      )}
      {consent === 'yes' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
            strategy='afterInteractive'
          />
          <Script
            id='ga4'
            strategy='afterInteractive'
            onReady={() => setReady(true)}
          >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{send_page_view:false});`}</Script>
        </>
      )}
    </>
  );
}

export function trackReservationClick() {
  window.gtag?.('event', 'reservation_cta_click');
}
