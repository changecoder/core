const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp');
const nunjucks = require('nunjucks')

const { getProjectPath } = require('../src/utils/projectHelper')
const getConfig = require('./utils/getConfig')

nunjucks.configure({ autoescape: false })

const tmpDirPath = path.join(__dirname, '..', 'tmp')

mkdirp.sync(tmpDirPath)

exports.start = (program) => {
    const configFile = getProjectPath(program.config || 'changecoder.config.js')

    const config = getConfig(configFile)
}