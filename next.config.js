/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "yteokpmtspckdjjmdozx.supabase.co", // ✅ ini domain yang valid!
    ],
  },
};

module.exports = nextConfig;
