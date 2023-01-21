const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

const config = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  entry: [path.resolve(__dirname, "./build/transpiled/index.client.js")],
  output: {
    path: path.resolve(__dirname, "./build/compiled"),
    filename: "main.[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ReactServerWebpackPlugin({ isServer: false }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "build/transpiled/*.css",
          to: path.resolve(__dirname, "./build/compiled/[name].min.css"),
          toType: "template",
        },
      ],
    }),
    new WebpackManifestPlugin({
      fileName: "client-manifest.json",
      basePath: "build/compiled/",
      generate: (seed, files, entries) => {
        return entries;
      },
    }),
  ],
};

module.exports = config;
