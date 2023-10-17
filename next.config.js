/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    // domains: ["res.cloudinary.com", "consultwar.renian.foundation"],
    // domains: ["cdn-images-1.medium.com"],
    loader: "akamai",
    path: "",
  },
};

// const withBundleAlyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

module.exports = nextConfig;
// module.exports = withBundleAlyzer({ nextConfig });
