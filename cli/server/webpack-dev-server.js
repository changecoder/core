const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const serverConfig = require('../core/config/server.config')
const { getWebpackConfig } = require('../core/utils/config')

const start = () => {
    process.env.RUN_ENV = 'DEVELOPMENT'
    
    const webpackConfig = getWebpackConfig()

    const compiler = Webpack(webpackConfig)

    const devServerOptions = { ...serverConfig, open: true }

    const server = new WebpackDevServer(devServerOptions, compiler)

    const runServer = async () => {
        console.log('Starting server...');
        await server.start();
    }
      
    runServer()
}

module.exports = start