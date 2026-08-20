"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global { interface Window { gtag?: (...args: unknown[]) => void } }
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  useEffect(() => { if (id) window.gtag?.("config", id, { page_path: pathname }); }, [id, pathname]);
  if (!id) return null;
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script></>;
}

export function trackReservationClick() { window.gtag?.("event", "reservation_cta_click"); }
