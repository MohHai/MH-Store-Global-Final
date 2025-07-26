const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'm.media-amazon.com',
      'cf.shopee.sg',
      'ae01.alicdn.com',
      'img.ltwebstatic.com',
      'tradal.com',
      'res.cloudinary.com'
    ],
  },
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    AMAZON_API_KEY: process.env.AMAZON_API_KEY,
  },
}

module.exports = nextConfig
