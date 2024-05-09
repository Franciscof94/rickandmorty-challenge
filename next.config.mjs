/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rickandmortyapi.com"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
