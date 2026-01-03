import multer from 'multer' // multer package to handle file uploads
import DataParser from 'datauri/parser.js'
import path from 'path'

// set up the storage of uploaded files
const storage = multer.memoryStorage()
const upload = multer({ storage })

const parser = new DataParser()

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()

  return parser.format(fileExtension, file.buffer).content
}

export default upload
