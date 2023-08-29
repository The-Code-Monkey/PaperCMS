/**
 * @type {import('next').NextConfig}
 */
import removeImports from 'next-remove-imports';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { serverActions: true },
  images: {
    domains: ['sorthugaogfbqewtykix.supabase.co'],
  }
};

export default removeImports()(nextConfig);
