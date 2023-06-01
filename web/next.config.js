// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

module.exports = withPWA({
    transpilePackages: ['@/core'],
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    server: {
        host: '0.0.0.0',
    },
});
