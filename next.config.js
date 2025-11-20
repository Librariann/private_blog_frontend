/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gopfkmlgdpxbqjxftuin.supabase.co",
      },
      {
        protocol: "https",
        hostname: "librarian-blog-images.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  transpilePackages: ["@uiw/react-md-editor", "@uiw/react-markdown-preview"],
  // Vercel caching Settings
  headers: async () => {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};

module.exports = removeImports({ ...nextConfig });
