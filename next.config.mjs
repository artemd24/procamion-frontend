/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-tel-input'],
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com'
      }
    ]
  }
}

export default nextConfig
