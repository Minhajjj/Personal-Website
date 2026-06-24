import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Transpile GSAP for proper ESM handling in production
  transpilePackages: ["gsap"],

  // Ensure proper module resolution for GSAP
  webpack: (config, { isServer }) => {
    // Fix GSAP imports in production
    config.resolve.alias = {
      ...config.resolve.alias,
      "gsap/ScrollTrigger": "gsap/dist/ScrollTrigger",
      gsap: "gsap/dist/gsap",
    };

    // Ensure GSAP is treated as external on server (prevents SSR issues)
    if (isServer) {
      config.externals = [...(config.externals || []), "gsap"];
    }

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: "minhaj-9n",
  project: "my-portfolio",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: true,
  },
});
