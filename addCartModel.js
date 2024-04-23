const string = require("@hapi/joi/lib/types/string");
const { default: mongoose } = require("mongoose")
var mongo = require("mongoose")


var details = new mongo.Schema({

    imagePath: { 
        type: String, 
        required: true 
      }, 
      price: { 
        type: String, 
        required: true 

      }, 
      breed: { 
        type: String, 
        required: true 
      } ,
      status: { 
        type: String, 
      } 
    
})
var addcart= mongo.model('addcartDetails',details)

module.exports= addcart;

