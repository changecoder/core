const path = require('path')

const { getProjectPath } = require('../utils/projectHelper')

const pkg = require(getProjectPath('package.json'))

const rules = require('./rules')
const plugins = require('./plugins')

module.exports = {
    output: {
        path: getProjectPath('./static/'),
        filename: '[name].js',
        library: pkg.name,
        libraryTarget: 'umd'
    },

    resolve: {
        modules: ['node_modules', path.join(__dirname, '../../node_modules')],
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx'
        ],
        alias: {
          [pkg.name]: process.cwd(),
        }
    },

    module: {
        rules
    },

    plugins
}