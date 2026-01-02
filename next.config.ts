import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Configure remote patterns for external images if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for the image optimization API
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@tanstack/react-query',
    ],
  },

  // Enable compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Power the pages with React strict mode
  reactStrictMode: true,

  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
