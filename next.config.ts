import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Isolate the deterministic browser fixture server from normal development.
  distDir: process.env.GUSTO_TEST_DIST_DIR || '.next',
  async redirects() {
    return [{ source: '/', destination: '/ja', permanent: false }];
  },
  cacheComponents: true,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
