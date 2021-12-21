const { merge } = require('webpack-merge')
const commonConfig = require('./config')
const { getProjectPath } = require('../utils/projectHelper')

const pkg = require(getProjectPath('package.json'))

const config = {
    entry: {
        [pkg.name]: './index'
    },
    mode: 'development'
}

module.exports = merge({}, commonConfig, config)