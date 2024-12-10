import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

// Initialize Next-Intl plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    styledComponents: true, // Enables support for styled-components
  },
  productionBrowserSourceMaps: true, // Enable source maps for production debugging

  experimental: {
    cssChunking: "loose", // Experimental CSS chunking
    optimizePackageImports: [
      'react-redux',       // Optimize Redux imports
      '@reduxjs/toolkit',  // Redux Toolkit optimization
      '@apollo/client',
      '@material-tailwind/react',
      'swiper',
      '@mui/material',
    ],
    staleTimes: {
      dynamic: 30, // Cache stale time for dynamic routes
      static: 180, // Cache stale time for static routes
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cartzio.vercel.app',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'magento-1305685-4934743.cloudwaysapps.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
      },
    ],
  },

  webpack: (config, { isServer }) => {
    // Example: Add custom chunk splitting
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 500000, // Example: limit chunk size to 200KB
      };
    }

    return config;
  },
};

// Enable bundle analyzer only when ANALYZE is true
const withBundleAnalyzerConfigured = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Export the combined configuration
export default withNextIntl(withBundleAnalyzerConfigured(nextConfig));
