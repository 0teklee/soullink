/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    CLOUD_IMAGE_APP_NAME: process.env.CLOUD_IMAGE_APP_NAME,
    CLOUD_IMAGE_APP_KEY: process.env.CLOUD_IMAGE_APP_KEY,
    CLOUD_IMAGE_APP_SECRET: process.env.CLOUD_IMAGE_APP_SECRET,
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
};

module.exports = nextConfig;
