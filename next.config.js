/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.chainsafe.io', 'infura-ipfs.io', 'ipfs.io'],
  },
}

module.exports = nextConfig
