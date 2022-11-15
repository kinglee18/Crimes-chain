/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['ipfs.chainsafe.io', 'infura-ipfs.io', 'ipfs.io'],
  },
}

module.exports = nextConfig
