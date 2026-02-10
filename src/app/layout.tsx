import RootLayout from '@/components/layouts/root';
import { DEVTOOL } from '@/config/env';
import { DEFAULT_METADATA } from '@/config/metadata';
import { cn } from '@/lib/twMerge';
import ClientBootstrap from '@/modules/bootstrap/components/client-bootstrap';
import AppAblyProvider from '@/providers/ably';
import { ModalProvider } from '@/providers/modal';
import NotificationProvider from '@/providers/notification';
import RqProvider from '@/providers/react-query';
import { ToastProvider } from '@/providers/toast';
import '@/styles/swiper.scss';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['vietnamese'],
  variable: '--font-plus-jakarta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('site');
  return {
    ...DEFAULT_METADATA,
    title: {
      default: `Aetheria | ${t('title')}`,
      template: `%s | ${t('title')}`,
    },
  };
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  minimumScale: 1,
  maximumScale: 1,
  interactiveWidget: 'resizes-content',
  colorScheme: 'dark',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn('bg-background antialiased select-none', plusJakarta.variable, geistMono.variable)}
    >
      <body>
        <NextTopLoader color='var(--primary)' showSpinner={false} />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextIntlClientProvider>
            <RqProvider>
              <RootLayout>
                <ModalProvider>
                  <ToastProvider>
                    <SessionProvider>
                      <ClientBootstrap />
                      <AppAblyProvider>
                        <NotificationProvider>{children}</NotificationProvider>
                      </AppAblyProvider>
                    </SessionProvider>
                  </ToastProvider>
                </ModalProvider>
              </RootLayout>
            </RqProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>

        {DEVTOOL.ENABLED && (
          <div
            dangerouslySetInnerHTML={{
              __html: `<script src="https://cdn.jsdelivr.net/npm/eruda"></script><script>eruda.init();</script>`,
            }}
          />
        )}
      </body>
    </html>
  );
}
