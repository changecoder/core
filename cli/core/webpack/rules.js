const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const babelConfig = require('../config/.babelrc')
const postcssConfig = require('../config/postcss.config')
const { resolve } = require('../utils/projectHelper')

module.exports = [
    // JS,JSX
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: resolve('babel-loader'),
        options: babelConfig
    },
    // TS. TSX
    {
        test: /\.tsx?$/,
        use: [
          {
            loader: resolve('babel-loader'),
            options: babelConfig
          },
          {
            loader: resolve('ts-loader'),
            options: {
              transpileOnly: true // 只做语言转换，而不做类型检查
            }
          }
        ]
    },
    // CSS
    {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ...postcssConfig,
              sourceMap: true
            }
          }
        ]
    },
    // Less
    {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: postcssConfig,
              sourceMap: true
            }
          },
          {
            loader: resolve('less-loader'),
            options: {
              lessOptions: {
                javascriptEnabled: true
              },
              sourceMap: true
            }
          }
        ]
    }
]