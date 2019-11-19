# webpack study

## init

1. yarn init
2. yarn add webpack webpack-cli -D
3. webpack - commonjs & es6(esmodule)

## 0 config

1. npx -> current folder/node_modules/.bin
2. npx webpack -> find current folder/src/index.js -> to build current folder/dist/main.js (default mode is production)
3. npx webpack --mode development|production
4. npm run or yarn build/dev -> package.json -> script config build/dev

    ```json
    "scripts": {
        "build": "webpack --mode production",
        "dev": "webpack --mode development"
    },
    ```

## webpack.config.js

1. default config file is current folder/webpack.config.js

    ```js
    const path = require("path");
    module.exports = {
        entry: path.resolve(__dirname, "./src/index.js"),
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist")
        }
    };
    ```

## split configuration

1. package.json: --env send a argument about global variable to a config file about webpack and --config appoint the config file

    ```json
    "scripts": {
        "build": "webpack --env.development --config ./build/webpack.base.js",
        "dev": "webpack --env.production --config ./build/webpack.base.js"
    },
    ```

2. merge plugin

    ```bash
    yarn add webpack-merge -D
    ```

    ```js
    // webpack.base.js
    const dev = require("./webpack.dev");
    const prod = require("./webpack.prod");
    const path = require("path");
    const merge = require("webpack-merge");
    module.exports = env => {
        console.log(env);
        let isDev = env.development;
        const base = {
            // mode: env.environment,
            entry: path.resolve(__dirname, "../src/index.js"),
            output: {
                filename: "bundle.js",
                path: path.resolve(__dirname, "../dist")
            }
        };
        // return base;
        if (isDev) {
            return merge(base, dev);
        } else {
            return merge(base, prod);
        }
    };
    ```

3. webpack-dev-server: build in RAM but webpack build in ROM and generate files and default port is 8080, if you open http://localhost:8080/bundle.js, you can see the dev file but the folder doesn't contain this file

    ```bash
    yarn add webpack-dev-server -D
    ```

    ```json
        // package.json
        "scripts": {
            "build": "webpack --env.production --config ./build/webpack.base.js",
            "dev:build": "webpack --env.development --config ./build/webpack.base.js",
            "dev": "webpack-dev-server --env.development --config ./build/webpack.base.js"
        },
    ```

    ```js
    // webpack.dev.js
    const path = require("path");
    module.exports = {
        mode: "development",
        devServer: {
            port: 3000,
            compress: true, // 开启gzip
            contentBase: path.resolve(__dirname, "../dist")
        }
    };
    ```

4. html-webpack-plugin: a html template to build and include bundle.js

    ```bash
    yarn add html-webpack-plugin -D
    ```

    1. new public/index.html as a template html file
    2. config webpack.base.js

    ```js
    // webpack.base.js
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "test.html",
            minify: !isDev && {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            }
        })
    ];
    ```

5. clean-webpack-plugin: clean dist build file and rebuild

    ```bash
    yarn add clean-webpack-plugin -D
    ```

    ```js
    // webpack.base.js
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
    ];
    ```

## loader configuration
1. css/scss/less/stylus
   1. without loader : [error] You may need an appropriate loader to handle this file type
   2. loader order: down-up, right-left
   3. css: css-loader & style-loader
        ```bash
            yarn add css-loader style-loader -D
        ```
        ```js
            // webpack.base.js
            module: {
               rules: [
                 {
                   test: /\.css$/,
                   use: ['style-loader', 'css-loader']
                 }
                 // {
                 //   test: /\.css$/,
                 //   use: 'style-loader'
                 // },
                 // {
                 //   test: /\.css$/,
                 //   use: 'css-loader'
                 // }
               ]
            }
        ```
   4. scss: node-sass & sass-loader - https://sass-lang.com/ & https://www.sass.hk/
        ```bash
            yarn add node-sass sass-loader -D
        ```
        ```js
            // webpack.base.js
             module: {
               rules: [
                 {
                   test: /\.css$/,
                   use: [
                     'style-loader',
                     {
                       loader: 'css-loader',
                       options: {
                         importLoaders: 1 // 如果通过import引入了其他文件，这里的数字指的是后边的一个loader，不推荐css里边再引入scss
                       }
                     },
                     'sass-loader'
                   ]
                 },
                 // {
                 //   test: /\.css$/,
                 //   use: 'style-loader'
                 // },
                 // {
                 //   test: /\.css$/,
                 //   use: 'css-loader'
                 // }
                 {
                   test: /\.scss$/,
                   use: ['style-loader', 'css-loader', 'sass-loader']
                 }
               ]
             },
        ```
   5. less: less & less-loader - http://lesscss.org/ & http://lesscss.cn/
        ```bash
            yarn add less less-loader -D
        ```
        ```js
            // webpack.base.js        
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ```
   6. stylus: stylus & stylus-loader - http://stylus-lang.com/ & https://stylus.bootcss.com/
        ```bash
            yarn add stylus stylus-loader -D
        ```
        ```js
            // webpack.base.js        
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ```
   7. postcss: postcss-loader & autoprefixer - compatible some css3 in different browser
        ```bash
            yarn add postcss-loader autoprefixer -D
        ```
        ```js
            // webpack.base.js   
            {
             test: /\.css$/,
             use: [
               'style-loader',
               {
                 loader: 'css-loader',
                 options: {
                   importLoaders: 2 // 如果通过import引入了其他文件，这里的数字指的是后边的两个loader，不推荐css里边再引入scss
                 }
               },
               'postcss-loader',
               'sass-loader'
             ]
            },
            // postcss.config.js
            module.exports = {
              plugins: [require('autoprefixer')]
            }
            // package.json - recommend
            "browserslist": [
             "cover 99.5%"
            ]

        ```
   8. mini-css-extract-plugin: build mode production to load sync with js - 把css提取出来一个css文件
        ```bash
            yarn add mini-css-extract-plugin -D
        ```
        ```js
            // webpack.base.js   
            {
             test: /\.css$/,
             use: [
               isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
               {
                 loader: 'css-loader',
                 options: {
                   importLoaders: 2 // 如果通过import引入了其他文件，这里的数字指的是后边的两个loader，不推荐css里边再引入scss
                 }
               },
               'postcss-loader',
               'sass-loader'
             ]
            },
            plugins: [
               !isDev &&
                 new MiniCssExtractPlugin({
                   filename: 'css/main.css'    //生成css的命名
                 })]
              // 如果是生产环境就分隔生成css文件
        ```
2. img & icon
3. js
4. react & vue