import fs from 'fs/promises'

const FileSystem = (filepath, data) => {
  fs.writeFile(filepath, data, 'utf8')
    .then(() => {
      console.log('File written successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}

export default FileSystem
