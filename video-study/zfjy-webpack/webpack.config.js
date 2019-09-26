let path = require("path");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "build.js",
        path: path.resolve("./build")
    },
    devServer: {
        contentBase: "./"
    },
    module: {},
    plugins: [],
    mode: "development",
    resolve: {}
};

// 1. webpack-dev-server