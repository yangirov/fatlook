import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import { isDev } from '@/shared/utils';

import Providers from './provider';

import '@/styles/globals.scss';

const font = Inter({
    preload: true,
    weight: ['400', '500'],
    style: ['normal'],
    subsets: ['cyrillic', 'latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
                />

                <title>FatLook – отчеты из FatSecret</title>
                <meta name="description" content="Приложение для построения удобных отчетов питания из FatSecret" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="FatLook – отчеты из FatSecret" />
                <meta
                    property="og:description"
                    content="Приложение для построения удобных отчетов питания из FatSecret"
                />
                <meta property="og:url" content={process.env.DOMAIN} />
                <meta property="og:image" content={`${process.env.DOMAIN}/media/preview.png`} />

                <link rel="shortcut icon" href={`${process.env.DOMAIN}/favicon/favicon.ico`} sizes="any" />
                <link rel="icon" type="image/svg+xml" href={`${process.env.DOMAIN}/favicon/logo.svg`} />
                <link rel="apple-touch-icon" href={`${process.env.DOMAIN}/favicon/icon-512x512.png`} />

                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                <link rel="apple-touch-startup-image" href={`${process.env.DOMAIN}/media/splashscreen.png`} />

                <meta name="theme-color" content="#259b23" />
                <meta name="color-scheme" content="dark light" />

                <link rel="manifest" href={`${process.env.DOMAIN}/manifest.json`} />
            </head>
            <body className={font.className}>
                <Providers>{children}</Providers>
                {!isDev && <Analytics />}
            </body>
        </html>
    );
}
