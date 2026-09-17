import 'server-only';

export function getSiteUrl() {
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelProductionUrl ? `https://${vercelProductionUrl}` : undefined);
  if (!value) {
    if (process.env.NODE_ENV === 'production')
      throw new Error(
        'NEXT_PUBLIC_SITE_URL is required for production outside Vercel',
      );
    return new URL('http://localhost:3000');
  }
  const url = new URL(value);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.hostname === 'example.com' ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be the site origin, without a path, query or fragment',
    );
  }
  return url;
}
