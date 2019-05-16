const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const postCssLoader = {
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        plugins: () => ([
            require("autoprefixer")
        ])
    }
};

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "src/client/index.jsx"),
    output: {
        publicPath: "http://localhost:9000/dist/",
        filename: "bundle.js",
        pathinfo: true
    },
    resolve: {
        extensions: [".jsx", ".js"],
        modules: ["node_modules", path.resolve("./src")],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    devtool: "source-map",
    plugins: [
        new ProgressBarPlugin({
            format: `${chalk.blue.bold("Building client bundle")} [:bar] ${chalk.green.bold(":percent")} (:elapsed seconds)`,
            renderThrottle: 100,
            summary: false,
            customSummary: (t) => global.console.log(chalk.blue.bold(`Built client in ${t}.`))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/client/index.html"),
            favicon: path.join(__dirname, "src/assets/favicon.ico")
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        host: "localhost",
        hot: true,
        hotOnly: true,
        inline: true,
        port: 9000,
        publicPath: "http://localhost:9000/dist/",
        watchContentBase: true
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: ["babel-loader", "eslint-loader"],
            include: path.join(__dirname, "src")
        },
        {
            test: /\.less$/,
            include: path.join(__dirname, "src"),
            use: ["style-loader", "css-loader", postCssLoader, "less-loader"]
        }]
    }
};
