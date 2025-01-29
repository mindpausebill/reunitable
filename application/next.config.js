/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['resend']
  },
  reactStrictMode: false
};

module.exports = nextConfig;
