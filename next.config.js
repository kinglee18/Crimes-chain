/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['ipfs.chainsafe.io', 'infura-ipfs.io', 'ipfs.io'],
    loader: 'imgix',
    path: '',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
