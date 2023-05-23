/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/timeinservice/:path*',
        destination: `${process.env.NEXT_PUBLIC_MEDIA_URL_PROXY ?? ''}/media/timeinservice/:path*`
      }
    ]
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_SECURE_SITE: process.env.NEXT_PUBLIC_SECURE_SITE,
    NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE: process.env.NEXT_PUBLIC_DISPLAY_MY_SCHEDULE_PAGE
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  }
}
