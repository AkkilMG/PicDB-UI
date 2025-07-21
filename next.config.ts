import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json'
    })
    return config
  }

};

export default nextConfig;
