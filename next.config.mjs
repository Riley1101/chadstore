/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
