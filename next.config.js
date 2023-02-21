const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cache-Control",
    value: "public, max-age=9999999999, must-revalidate",
  },
];

module.exports = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
},
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home-page',
  //       permanent: true,
  //     },
  //   ]
  // },
};
