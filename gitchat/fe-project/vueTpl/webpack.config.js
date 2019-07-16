const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const postcssPlugin = {
    loader: "postcss-loader",
    options: {
        plugins: [require("postcss-preset-env")()]
    }
};

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", postcssPlugin]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    postcssPlugin,
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            title: "项目模板"
        })
    ]
};
