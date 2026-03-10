import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    webpackBuildWorker: false,
  },

  webpack(config) {
    config.module.rules.unshift({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source'
    });

    return config;
  },
};

export default nextConfig;