import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    '/ja',
    '/en',
    '/ja/about',
    '/en/about',
    '/ja/menu',
    '/en/menu',
    '/ja/privacy',
    '/en/privacy',
  ].map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path.length === 3 ? 1 : 0.7,
  }));
}
