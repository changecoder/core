const rimraf = require('rimraf')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const { readConfig, getProjectPath } = require('../utils/projectHelper')
const defaultConfig = require('../webpack/prod.config')

const build = async (done) => {
    rimraf.sync(getProjectPath('static'))

    process.env.RUN_ENV = 'PRODUCTION'

    const customConfig = readConfig('webpack.config.js')

    const webpackConfig = merge({}, defaultConfig, customConfig)

    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        return
      }
  
      const info = stats.toJson()
  
      if (stats.hasErrors()) {
        console.error(info.errors)
      }
  
      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }
  
      const buildInfo = stats.toString({
        colors: true,
        children: true,
        chunks: false,
        modules: false,
        chunkModules: false,
        hash: false,
        version: false,
      })
  
      console.log(buildInfo)
  
      done(0)
    })
}

module.exports = build