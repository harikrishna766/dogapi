var express = require("express")
const multer  = require('multer')
const fileUploadConfig = require('./fileUpload')
const upload = multer({ storage: fileUploadConfig.storage })
var routers = express.Router()
var control = require("./usercontrol")
routers.post('/users',control.allUsers)
routers.put('/update/:id',control.update)
 routers.post('/adddog',upload.single('file') ,control.store)
 routers.get('/oneitem/:id',control.getOneData)
 routers.delete('/delete/:id',control.deleteItem)

 module.exports = routers 