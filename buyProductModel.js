// var mongo = require("mongoose")


// var details = new mongo.Schema({
//     imagePath: { 
//         type: String, 
//         required: true 
//       }, 
//       price: { 
//         type: String, 
//         required: true 

//       }, 
//       breed: { 
//         type: String, 
//         required: true 
//       } ,

//     address:{
//         type : String, 
//         require : true
//      },

//      phoneNumber: {
//         type: String,
//         require: true

//     },

//     buyingAmount:{
//       type: String,
//     }
   
    
// })
// var buyingProducts= mongo.model('buyproducts',details)
// module.exports= buyingProducts;

var mongo = require("mongoose");

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
    },
    PhoneNumber: {
      type: String,
      unique: true 
  },
    address: {
        type: String,
        required: true
    },
    buyingAmount:{
        type: String,
        unique: true 


    },

});

var buyingProducts = mongo.model('buyproducts', details);
module.exports = buyingProducts;
