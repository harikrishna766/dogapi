var mongo = require("mongoose");

var details = new mongo.Schema({
    imagePath: {
        type: String,
    },
    price: {
        type: String,
    },
    breed: {
        type: String,
    },
    PhoneNumber: {
      type: String,
  },
    address: {
        type: String,
    },


});

var buyProducts = mongo.model('buyprod', details);
module.exports = buyProducts;
