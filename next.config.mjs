/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/primaveralife',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
