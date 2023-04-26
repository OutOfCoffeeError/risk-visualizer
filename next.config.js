/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{
      source:'/',
      destination: '/home',
      permanent: false
    }]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
