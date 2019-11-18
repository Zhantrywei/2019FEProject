const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = env => {
    console.log(env);
    let isDev = env.development;
    const base = {
        // mode: env.environment,
        entry: path.resolve(__dirname, "../src/index.js"),
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "../dist")
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html"),
                filename: "index.html",
                minify: !isDev && {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true
                }
            })
        ]
    };
    // return base;
    if (isDev) {
        return merge(base, dev); // 循环后边的配置到前边的去
    } else {
        return merge(base, prod);
    }
};
