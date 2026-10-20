/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    // Shown in the footer; fixed at build time so every visitor sees the deploy date.
    NEXT_PUBLIC_LAST_UPDATED: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for Three.js and react-three/fiber with static export
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },
}

export default nextConfig
