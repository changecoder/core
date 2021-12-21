const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const WebpackDevServer = require('webpack-dev-server')

const { readConfig } = require('../src/utils/projectHelper')
const serverConfig = require('../src/config/server.config')
const defaultConfig = require('../src/webpack/dev.config')

exports.start = () => {
    process.env.RUN_ENV = 'DEVELOPMENT'

    const customConfig = readConfig('webpack.config.js')
    
    const webpackConfig = merge({}, defaultConfig, customConfig)

    const compiler = Webpack(webpackConfig)

    const devServerOptions = { ...serverConfig, open: true }

    console.log(webpackConfig)

    const server = new WebpackDevServer(devServerOptions, compiler)

    const runServer = async () => {
        console.log('Starting server...');
        await server.start();
    }
      
    runServer()
}