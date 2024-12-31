/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  // Vercel caching 설정
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = removeImports({ ...nextConfig });
