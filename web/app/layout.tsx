import { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { AnalyticsBlock } from '@/web/entities/AnalyticsBlock';

import appleSplashScreens from './apple-splash-screens.json';
import Providers from './provider';

import '../styles/globals.scss';

const font = Inter({
    preload: true,
    weight: ['400', '500'],
    style: ['normal'],
    subsets: ['cyrillic', 'latin'],
});

const APP = {
    AUTHOR: 'Emil Yangirov',
    AUTHOR_TWITTER: '@emil_yangirov',
    NAME: 'FatLook',
    TITLE: 'FatLook – отчеты из FatSecret',
    DESCRIPTION: 'Приложение для построения удобных отчетов питания из FatSecret',
    THEME_COLOR: '#259b23',
    TILE_COLOR: '#ececf4',
    DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>FatLook – отчеты из FatSecret</title>

                <link rel="apple-touch-icon" href={`${APP.DOMAIN}/favicon/apple-touch-icon.png`} />

                <link rel="shortcut icon" href={`${APP.DOMAIN}/favicon.ico`} sizes="any" />
                <link rel="icon" type="image/png" sizes="32x32" href={`${APP.DOMAIN}/favicon/icon-32x32.png`} />
                <link rel="icon" type="image/png" sizes="16x16" href={`${APP.DOMAIN}/favicon/icon-16x16.png`} />

                <link rel="mask-icon" href={`${APP.DOMAIN}/icons/safari-pinned-tab.svg`} color={APP.TILE_COLOR} />

                <meta name="application-name" content={APP.NAME} />
                <meta name="description" content={APP.DESCRIPTION} />
                <meta name="author" content={APP.AUTHOR} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={APP.TITLE} />
                <meta property="og:site_name" content={APP.NAME} />
                <meta property="og:description" content={APP.DESCRIPTION} />
                <meta property="og:url" content={APP.DOMAIN} />
                <meta property="og:image" content={`${APP.DOMAIN}/media/preview.png`} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={APP.DOMAIN} />
                <meta name="twitter:title" content={APP.NAME} />
                <meta name="twitter:description" content={APP.DESCRIPTION} />
                <meta name="twitter:image" content={`${APP.DOMAIN}/icons/android-chrome-192x192.png`} />
                <meta name="twitter:creator" content={APP.AUTHOR_TWITTER} />

                <meta name="theme-color" content={APP.THEME_COLOR} />
                <meta name="color-scheme" content="dark light" />

                <meta name="msapplication-config" content={`${APP.DOMAIN}/favicon/browserconfig.xml`} />
                <meta name="msapplication-TileColor" content={APP.TILE_COLOR} />
                <meta name="msapplication-tap-highlight" content="no" />

                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="format-detection" content="telephone=no" />

                <meta name="apple-mobile-web-app-title" content={APP.NAME} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={APP.NAME} />
                <meta name="apple-touch-fullscreen" content="yes" />

                {appleSplashScreens.map(({ media, filename }, index) => (
                    <link
                        key={index}
                        rel="apple-touch-startup-image"
                        media={media}
                        href={`${APP.DOMAIN}/media/apple-splash-screens/${filename}`}
                    />
                ))}

                <link rel="yandex-tableau-widget" href={`${APP.DOMAIN}/tableau.json`} />
                <link rel="manifest" href={`${APP.DOMAIN}/manifest.json`} />
            </head>
            <body className={font.className}>
                <Providers>{children}</Providers>
                <AnalyticsBlock />
            </body>
        </html>
    );
}
