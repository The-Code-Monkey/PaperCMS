/**
 * @type {import('next').NextConfig}
 */
import removeImports from 'next-remove-imports';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['sorthugaogfbqewtykix.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{
          key: 'cache-control',
          value: 'no-cache, no-store, must-revalidate'
        }]
      }
      ]
  }
};

export default removeImports()(nextConfig);
