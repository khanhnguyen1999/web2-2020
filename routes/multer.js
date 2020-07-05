const User = require('../services/user')
const {Router} = require('express')
const {body,validationResult} = require('express-validator')
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const Email = require('../services/email')
const router = new Router();
const path = require('path');
const multer = require('multer');
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
router.get('/', (req, res) => res.render('pages/profile'));

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('pages/profile', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('pages/profile', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('pages/profile', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});
module.exports = router;