// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

module.exports = withPWA({
    transpilePackages: ['@fatlook/core', '@fatlook/backend'],
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    env: {
        host: '0.0.0.0',
    },
});
