/**
 * CRA development proxy — routes /api/* requests server-side to avoid CORS.
 * This file is automatically picked up by react-scripts in development only.
 * In production (Netlify), the netlify.toml redirect handles /api/credly-badges.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/credly-badges',
    createProxyMiddleware({
      target: 'https://www.credly.com',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        // Extract username param and rewrite to Credly's URL format
        const username = req.query.username || 'edward-granados';
        return `/users/${username}/badges.json`;
      },
      on: {
        proxyReq: (proxyReq) => {
          // Set headers to look like a real browser request
          proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (portfolio-site)');
          proxyReq.setHeader('Accept', 'application/json');
        },
      },
    })
  );
};
