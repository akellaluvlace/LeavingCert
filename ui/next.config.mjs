/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify deployment
  output: 'export',
  
  // Set base path for demo subdirectory when deployed
  basePath: process.env.NODE_ENV === 'production' ? '/demo' : '',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for better static hosting
  trailingSlash: true,
  
  // Relax ESLint for production builds
  eslint: {
    // Only run ESLint on 'pages' and 'utils' directories during production builds
    dirs: ['pages', 'utils'],
    // Don't fail builds on ESLint errors
    ignoreDuringBuilds: true,
  },
  
  // Skip API routes for static export
  skipTrailingSlashRedirect: true,
  
  // Don't build API routes when doing static export  
  experimental: {
    outputFileTracingIgnores: [
      '**/api/**/*',
    ],
  },

  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  },
}

export default nextConfig