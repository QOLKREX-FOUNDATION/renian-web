/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "consultwar.renian.foundation"],
    // loader: "akamai",
    // path: "",
  },
};

module.exports = nextConfig;
