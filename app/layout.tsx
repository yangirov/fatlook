import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';

import { PwaModal } from '@/entities/PwaModal';
import { isDev } from '@/shared/utils';

import Providers from './provider';

import '@/styles/globals.scss';

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
    DOMAIN: process.env.DOMAIN,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>FatLook – отчеты из FatSecret</title>

                <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />

                <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/icon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/icon-16x16.png" />

                <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color={APP.TILE_COLOR} />

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

                <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
                <meta name="msapplication-TileColor" content={APP.TILE_COLOR} />
                <meta name="msapplication-tap-highlight" content="no" />

                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="format-detection" content="telephone=no" />

                <meta name="apple-mobile-web-app-title" content={APP.NAME} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={APP.NAME} />
                <meta name="apple-touch-fullscreen" content="yes" />

                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_14_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_14_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_11__iPhone_XR_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/12.9__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/10.9__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/10.5__iPad_Air_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/10.2__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                    href="media/apple-splash-screens/8.3__iPad_Mini_landscape.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_14_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_14_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_11__iPhone_XR_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/12.9__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/10.9__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/10.5__iPad_Air_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/10.2__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                />
                <link
                    rel="apple-touch-startup-image"
                    media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                    href="media/apple-splash-screens/8.3__iPad_Mini_portrait.png"
                />

                <link rel="yandex-tableau-widget" href="/tableau.json" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={font.className}>
                <PwaModal />
                <Providers>{children}</Providers>
                {!isDev && <Analytics />}
            </body>
        </html>
    );
}
