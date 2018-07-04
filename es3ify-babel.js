const fs = require('fs-extra')
const transform = require('es3ify').transform
const path = require('path')
function transformJsFile (sourcePath) {
  const files = fs.readdirSync(sourcePath)
  files.forEach(fileItem => {
    const fileStat = fs.statSync(path.join(sourcePath, fileItem))
    if (fileStat.isDirectory()) {
      transformJsFile(path.join(sourcePath, fileItem))
    } else if (new RegExp('(.js)$').test(fileItem)) {
      fs.outputFileSync(
        path.join(sourcePath, fileItem),
        transform(fs.readFileSync(path.join(sourcePath, fileItem), 'utf8'))
      )
      console.log('es3ify success：',path.join(sourcePath, fileItem))
    }
  })
}
transformJsFile(path.join(process.cwd(), 'lib'))
