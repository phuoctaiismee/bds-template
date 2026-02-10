import { YAAH } from '@/config/env';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/yaah-api/v1/:path*',
        destination: `${YAAH.API_URL}/api/:path*`,
      },
    ];
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '*.tn-cdn.net',
        protocol: 'https',
        port: '',
        pathname: '/**',
      },
    ],
    loader: 'custom',
    loaderFile: './imageLoader.ts',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1536, 1920, 2560],
  },
  experimental: {
    viewTransition: true,
    proxyTimeout: 10000,
    ...(process.env.NODE_ENV === 'production'
      ? {
          inlineCss: true,
        }
      : {}),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    rules: {
      '*.hbs': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
