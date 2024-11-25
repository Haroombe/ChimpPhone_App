// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
      if (dev) {
        config.watchOptions = {
          poll: 1000, // Check for changes every second
          aggregateTimeout: 300, // Delay before rebuilding after the first change
        };
      }
      return config;
    },
  };
  
  export default nextConfig;