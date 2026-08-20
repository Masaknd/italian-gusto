import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"; return ["/ja", "/en", "/ja/menu", "/en/menu", "/ja/reserve", "/en/reserve"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path.length === 3 ? 1 : .7 })); }
