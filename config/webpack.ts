/**
 * Webpack configuration
 */
export const webpackConfig = (config: any, { dev, isServer }: any) => {
  // Bundle analyzer (only in development)
  if (dev && process.env.ANALYZE === "true") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        openAnalyzer: true,
      })
    );
  }

  // Optimize bundle size for production
  if (!dev && !isServer) {
    config.optimization.splitChunks = {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          enforce: true,
        },
      },
    };
  }

  return config;
};
