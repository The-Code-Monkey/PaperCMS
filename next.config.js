/**
 * @type {import('next').NextConfig}
 */
import removeImports from 'next-remove-imports';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['secfdgdrcjidshyuawfs.supabase.co'],
  },
};

export default removeImports()(nextConfig);
