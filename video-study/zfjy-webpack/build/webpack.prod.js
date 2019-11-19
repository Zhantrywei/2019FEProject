const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  optimization: {
    // 优化项
    minimizer: [
      // 可以预置压缩方案
      new OptimizeCssAssetsPlugin(), // css压缩
      new TerserWebpackPlugin() // js压缩
    ]
  }
}
