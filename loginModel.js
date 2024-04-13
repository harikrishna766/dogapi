var mongo = require("mongoose")


var details = new mongo.Schema({
    name:{
        type : String, 
        require : true,
     },

     phoneNumber: {
        type: String,
        require: true,
        unique: true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String
    },
    roleId:{
        type:String,
        require:true,

    },
    roleType:{
        type:String,
        require:true,
    }

    
})
var userlogin= mongo.model('userlogin',details)
module.exports= userlogin;

