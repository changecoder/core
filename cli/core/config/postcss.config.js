const postcssPresetEnv = require('postcss-preset-env')
// https://github.com/csstools/postcss-preset-env 包含了autoPrefix, 支持css新特性
// const autoPrefix = require('autoprefixer')

module.exports = {
  plugins: [postcssPresetEnv()]
}