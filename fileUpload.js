const multer = require('multer');

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req,'---------------------------------',file)
     cb(null, 'images/')
  },
   filename: function (req, file, cb) {
   cb(null, file.originalname)  }
});

module.exports = {
   storage: storage};