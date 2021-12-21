const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const { getProjectPath } = require('../utils/projectHelper')

const pkg = require(getProjectPath('package.json'))

const rules = require('./rules')
const plugins = require('./plugins')

module.exports = {
    devtool: 'source-map',

    output: {
        path: getProjectPath('./static/'),
        filename: '[name].js',
        library: pkg.name,
        libraryTarget: 'umd'
    },

    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            warnings: false,
          },
        }),
      ],
    },

    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: [
          '.web.tsx',
          '.web.ts',
          '.web.jsx',
          '.web.js',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
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