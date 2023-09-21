/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    NEXT_IMAGE_CLOUD_NAME: process.env.NEXT_IMAGE_CLOUD_NAME,
    NEXT_IMAGE_API_KEY: process.env.NEXT_IMAGE_API_KEY,
    NEXT_IMAGE_API_SECRET: process.env.NEXT_IMAGE_API_SECRET,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
};

module.exports = nextConfig;
