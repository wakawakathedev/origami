const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // [issue] https://github.com/shadowwalker/next-pwa/issues/288
    buildExcludes: [/middleware-manifest.json$/]
  },
  reactStrictMode: true,
});
