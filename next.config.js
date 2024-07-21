/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
};

module.exports = removeImports({...nextConfig});
