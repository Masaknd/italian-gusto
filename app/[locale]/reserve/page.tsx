import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReservationLink } from "@/components/reservation-link";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/locales";
export async function generateMetadata({ params }: {
    params: Promise<{
        locale: string;
    }>;
}): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale))
        return {};
    const d = getDictionary(locale);
    return { title: d.seo.reserveTitle, alternates: { canonical: `/${locale}/reserve`, languages: { ja: "/ja/reserve", en: "/en/reserve" } } };
}
export default async function ReservePage({ params }: {
    params: Promise<{
        locale: string;
    }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale))
        notFound();
    const d = getDictionary(locale);
    return <main className="mx-auto flex min-h-[65vh] w-[min(100%,var(--layout-container))] max-w-2xl flex-col justify-center px-[var(--layout-page-padding)] py-20"><p className="font-label text-body-sm leading-[1.2] font-bold tracking-[0.25em] text-coral uppercase">GUSTO ITALIAN BAR</p><h1 className="mt-3 font-display text-[length:var(--font-size-title-xl)] leading-none font-normal tracking-[var(--tracking-title)] text-[var(--color-page-text)]">{d.reserve.title}</h1><p className="mt-6 leading-8 text-muted">{d.reserve.body}</p>{siteConfig.reservationUrl ? <ReservationLink href={siteConfig.reservationUrl} ariaLabel={d.reserve.external} className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-full bg-ink px-5 py-2.5 font-sans text-body-sm font-bold text-white no-underline transition-[background-color,transform] duration-150 ease-in-out hover:-translate-y-px hover:bg-[var(--color-action-primary-hover)]">{d.reserve.cta}</ReservationLink> : <p className="mt-8 rounded-card bg-surface-muted p-5">{d.reserve.unavailable} <a href={siteConfig.phoneHref} className="underline underline-offset-4">{siteConfig.phone}</a></p>}</main>;
}
