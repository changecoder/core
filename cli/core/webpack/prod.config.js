const { merge } = require('webpack-merge')

const { getProjectPath } = require('../utils/projectHelper')

const commonConfig = require('./config')
const externals = require('./externals')

const pkg = require(getProjectPath('package.json'))

const config = {
    entry: {
        [`${pkg.name}.min`]: './index'
    },
    mode: 'production',
    externals
}

module.exports = merge({}, commonConfig, config)