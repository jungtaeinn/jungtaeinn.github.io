/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/jungtaeinn.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/jungtaeinn.github.io/' : '',
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
