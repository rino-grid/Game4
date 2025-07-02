/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: For Steam authentication, we need runtime features
  // Static export is disabled to allow API routes
  // output: 'export',
  
  // Keep image optimization disabled for broader compatibility
  images: {
    unoptimized: true
  },
  
  // Configure trailing slash for better compatibility
  trailingSlash: true,
  
  // Ensure proper asset handling
  assetPrefix: '',
}

module.exports = nextConfig