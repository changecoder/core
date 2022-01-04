const { getProjectPath } = require('../utils/projectHelper')

module.exports = {
    host: 'localhost',
    port: 9001,
    hot: true,
    static: {
        directory: getProjectPath('static')
    },
    historyApiFallback: true
}