import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReservationLink } from "@/components/reservation-link";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/locales";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; if (!isLocale(locale)) return {}; const d = getDictionary(locale); return { title: d.seo.reserveTitle, alternates: { canonical: `/${locale}/reserve`, languages: { ja: "/ja/reserve", en: "/en/reserve" } } }; }
export default async function ReservePage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); const d = getDictionary(locale); return <main className="content-shell flex min-h-[65vh] max-w-2xl flex-col justify-center py-20"><p className="page-eyebrow">GUSTO ITALIAN BAR</p><h1 className="page-heading mt-3">{d.reserve.title}</h1><p className="mt-6 leading-8 text-muted">{d.reserve.body}</p>{siteConfig.reservationUrl ? <ReservationLink href={siteConfig.reservationUrl} ariaLabel={d.reserve.external} className="action-primary mt-8 w-fit">{d.reserve.cta}</ReservationLink> : <p className="mt-8 rounded-card bg-surface-muted p-5">{d.reserve.unavailable} <a href={siteConfig.phoneHref} className="underline underline-offset-4">{siteConfig.phone}</a></p>}</main>; }
