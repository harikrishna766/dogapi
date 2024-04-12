const { default: mongoose } = require("mongoose")
var mongo = require("mongoose")
const paginate = require('mongoose-paginate')


var details = new mongo.Schema({
    imagePath: { 
        type: String, 
        required: true 
      }, 
      price: { 
        type: Number, 
        required: true 
      }, 
      breed: { 
        type: String, 
        required: true 
      } 
    
})
var dogDetails= mongo.model('dogDetails',details)

module.exports= dogDetails;

