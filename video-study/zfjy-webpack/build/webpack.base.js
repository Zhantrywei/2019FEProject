const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = env => {
  console.log(env)
  let isDev = env.development
  const base = {
    // mode: env.environment,
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
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
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.styl$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 2 } },
            'postcss-loader',
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: [
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/main.css'
        }), // 如果是开发模式就不使用抽离模式
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html', // 打包后的html的命名，内存打包在dist中不显示文件，但是可以通过devserver访问
        minify: !isDev && {
          removeAttributeQuotes: true,
          collapseWhitespace: true
        }
      })
    ].filter(Boolean) //过滤false返回值
  }
  // return base;
  if (isDev) {
    return merge(base, dev) // 循环后边的配置到前边的去
  } else {
    return merge(base, prod)
  }
}
