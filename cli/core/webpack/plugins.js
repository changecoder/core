const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new WebpackBar({
        name: 'ChangeCoder CLI',
        color: '#2f54eb'
    })
]