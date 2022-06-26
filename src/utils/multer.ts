import * as multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter
})

export default upload