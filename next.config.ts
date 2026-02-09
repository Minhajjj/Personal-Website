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
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "minhaj-9n",

  project: "my-portfolio",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
