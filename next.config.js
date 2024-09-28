/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = removeImports({ ...nextConfig });
