/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['sorthugaogfbqewtykix.supabase.co'],
  },
};

export default nextConfig;
