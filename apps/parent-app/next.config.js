const webpack = require("webpack");
const manifest = require("dll-libs/manifest");
const withBundleAnalyzer = require("@next/bundle-analyzer");


 module.exports = {
  reactStrictMode: true,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const dllReferencePlugin = new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: manifest,
    });

    if (!isServer) {
      config.plugins.push(dllReferencePlugin);
      // copy core.dll into .next/static/chunks/core.dll.js
    }
    return config;
  },
};
