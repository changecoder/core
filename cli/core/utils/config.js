const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultConfig = require('../webpack/dev.config')
const { readConfig, getProjectPath } = require('./projectHelper')

function getWebpackConfig() {
    const customWebpackConfig = readConfig('webpack.config.js')
    const customSiteConfig = readConfig('coder.config.js')

    if (customSiteConfig.template && customSiteConfig.template.url) {
        customWebpackConfig.plugins = customWebpackConfig.plugins || []
        customWebpackConfig.plugins.push(new HtmlWebpackPlugin({
            template: getProjectPath(customSiteConfig.template.url)
        }))
    }
    return merge({}, defaultConfig, customWebpackConfig)
}

module.exports = {
    getWebpackConfig
}