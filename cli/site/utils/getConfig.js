const fs = require('fs')

module.exports = function(configFile) {
    const config = fs.existsSync(configFile) ? require(configFile) : {}
  
    config.theme = resolve.sync(config.theme, { basedir: process.cwd() })
  
    return Object.assign({}, {
        output: './_site',
        entryName: 'index',
        root: '/'
    }, config)
}