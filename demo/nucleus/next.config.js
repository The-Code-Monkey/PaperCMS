/**
 * @type {import('next').NextConfig}
 */
import removeImports from 'next-remove-imports';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ['sorthugaogfbqewtykix.supabase.co'],
  },
  transpilePackages: ['@nucleus-cms/components']
};

export default removeImports()(nextConfig);
