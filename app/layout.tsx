import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';

import '@/styles/globals.css';

const robotoFont = Roboto({
    weight: ['400', '500'],
    style: ['normal'],
    subsets: ['cyrillic', 'latin']
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />

                <title>FatLook – отчеты из FatSecret</title>
                <meta name="description" content="Приложение для построения удобных отчетов питания из FatSecret" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="FatLook – отчеты из FatSecret" />
                <meta property="og:description" content="Приложение для построения удобных отчетов питания из FatSecret" />
                <meta property="og:url" content={process.env.DOMAIN} />
                <meta property="og:image" content={`${process.env.DOMAIN}/media/preview.png`} />

                <link rel="shortcut icon" href="./favicon/favicon.ico" sizes="any" />
                <link rel="icon" type="image/svg+xml" href="./favicon/logo.svg" />
                <link rel="apple-touch-icon" href="./favicon/icon-512x512.png" />

                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

                <link rel="apple-touch-startup-image" href="./media/splashscreen.png" />

                <meta name="theme-color" content="#259b23" />
                <meta name="color-scheme" content="dark light" />

                <link rel="manifest" href="./manifest.json" />
            </head>
            <body className={robotoFont.className}>{children}</body>
        </html>
    );
}
