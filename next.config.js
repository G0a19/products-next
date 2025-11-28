/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withSass = require("sass");
const path = require("path");

const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = (phase) => {
  return {
    images: {
      domains: ["127.0.0.1", "fakestoreapi.com"],
    },
    env: {
      siteName: "Products Next",
      revalidate: "1800",
      frontUrl: "http://localhost:3000",
      siteName: "Products Next",
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles"), path.join(__dirname, "components")],
    },
    async rewrites() {
      return [
        {
          source: "/robots.txt",
          destination: "/api/robots",
        },
      ];
    },
    webpack: (config) => {
      let oneOfRules = config.module.rules.find((x) => x.oneOf).oneOf;

      // remove the webpack rule to error on global css/scss
      oneOfRules = oneOfRules.filter((x) => x.issuer || !x.use || x.use.loader !== "error-loader");

      // modify the webpack rule targeting only *.module.scss to target only *.scss
      const newScssRule = oneOfRules.find((x) => x.test && x.test.toString() === /\.module\.(scss|sass)$/.toString());
      newScssRule.test = /\.(scss|sass)$/;
      newScssRule.sideEffects = true;

      if (newScssRule.use[0].options.modules) {
        newScssRule.use[0].options.modules = false;
      }

      if (newScssRule.use[1].options.modules) {
        newScssRule.use[1].options.modules = false;
      }

      config.module.rules.splice(
        config.module.rules.findIndex((x) => x.oneOf),
        1,
        {
          oneOf: oneOfRules,
        }
      );

      if (config.resolve)
        config.resolve.fallback = {
          fs: false,
        };

      return config;
    },
  };
};

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer = require("next-bundle-analyzer")(/* options come there */);
  nextConfig = withNextBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
