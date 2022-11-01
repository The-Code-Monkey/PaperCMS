const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    esmExternals: true
  },
  compiler: {
    styledComponents: true
  }
}

export default nextConfig;
