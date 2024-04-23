var express = require("express")
const multer  = require('multer')
const fileUploadConfig = require('./fileUpload')
const upload = multer({ storage: fileUploadConfig.storage })
var routers = express.Router()
var control = require("./usercontrol")
routers.post('/users',control.allUsers)
routers.post('/getallDog',control.getAllDogs)
routers.put('/update/:id',control.update)
 routers.post('/adddog',upload.single('image') ,control.store)
 routers.get('/oneitem/:id',control.getOneData)
 routers.delete('/delete/:id',control.deleteItem)
 routers.post('/singlerecord/:id',control.singleRecord)
 routers.post('/buyProduct' ,control.buyProducts)
 routers.post('/addCartProducts' ,control.addcart)
 routers.post('/allbuyProductdetails' ,control.buyAllData)
 routers.post('/alladdcartdetails' ,control.AddcartAllData)





 module.exports = routers 