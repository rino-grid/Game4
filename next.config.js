/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment platforms like Netlify
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure trailing slash for better compatibility
  trailingSlash: true,
  
  // Ensure proper asset handling
  assetPrefix: '',
}

module.exports = nextConfig