const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const isProduction = process.env.NODE_ENV === "production";
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: [path.resolve(__dirname, "./build/transpiled/index.client.js")],
    output: {
        path: path.resolve(__dirname, "./build/compiled"),
        filename: "main.[contenthash].js",
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
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        new ReactServerWebpackPlugin({ isServer: false }),
    ],
};

module.exports = config;
