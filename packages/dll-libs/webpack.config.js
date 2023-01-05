const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const config = {
  mode: "production",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  entry: {
    core: ["react", "react-dom"],
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(process.cwd(), "./build/dll"),
    library: "dll_[name]",
    publicPath: "./",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.join(process.cwd(), "build/dll/", "[name].json"),
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.core.json",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: `report.dll.html`,
      openAnalyzer: false,
    }),
  ],
};

module.exports = config;
