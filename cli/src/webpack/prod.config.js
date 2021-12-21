const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

const { merge } = require('webpack-merge')

const { getProjectPath } = require('../utils/projectHelper')

const commonConfig = require('./config')

const pkg = require(getProjectPath('package.json'))

const config = {
    entry: {
        [`${pkg.name}.min`]: './index'
    },
    mode: 'production',
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
}

module.exports = merge({}, commonConfig, config)