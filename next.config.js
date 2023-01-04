/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['secfdgdrcjidshyuawfs.supabase.co'],
  },
};

export default nextConfig;
