const path = require('path')
const fs = require('fs')

const cwd = process.cwd()

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath)
}

function readConfig(filePath) {
  const projectPath = getProjectPath(filePath)
  if (fs.existsSync(projectPath)) {
    return require(projectPath)
  } else {
    return {}
  }
}

const resolve = (moduleName) => require.resolve(moduleName)

module.exports = {
  getProjectPath,
  resolve,
  readConfig
}