const model = require("./loginModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

const register =async (req, res, next) => {
  let checkEmail = await model.findOne({email:req.body.email})
  let checkPhone = await model.findOne({phoneNumber:req.body.phoneNumber})

  console.log(checkEmail,'================checkEmail')
  if(checkEmail){
    res.status(401).json({message:'EmailId is exists',status: 401})
  }
  else if (checkPhone){
    res.status(401).json({message:'Phone Number is exists',status: 401})
  }
else{
  bcrypt.hash(req.body.password, 10, function (err, hashcode) {
    if (err) {
      res.json({ message: "eror", status: 400 });
    }
    let user = new model({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashcode,
      roleId:'0',
      roleType:"user"
    });
    user
      .save()
      .then((response) => {
        res.json({ message: "add success", response ,status: 200});
      })
      .catch((error) => {
        console.log(error, "............");
        res.json({ message: "error" });
      });
  });
}
};

const login = async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  await model
    .findOne({ email: email })
    .then((result) => {
      console.log(result, " ---------------resultpassword");
      if (result) {
        bcrypt.compare(password, result.password, function (error, response) {
          if (error) {
            res.json({ message: "error compare", status: 400 });
          } else if (response) {
            console.log(result, " ---------------resultpassword1");

            console.log(response, "..........................bcrypt");
            token = jwt.sign({ name: result.name, mail: result.email }, "secretValue", {
              expiresIn: "5m",
            });
            let userData ={
              name:result.name,
              email: result.email,
              roleId:result.roleId,
              roleType:result.roleType
            }
            console.log(token, 'token');
            res.status(200).json({ message: "login success",
             status: 200,
             userData, 
             token });
          
           
          } else {
            res.json({ status: 401, message: "password id not valid" });
          }
        });
      } else {
        res.json({ status: 400, message: "not valid email,password" });
      }
    })
    .catch((err) => {
      res.json({ message:"error" });
    });
};

const forGotPassword = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      res.json({ message: "eror-------------------------------------" });
    }
    console.log(hash, "........");
    let user = {
      password: hash,
    };
    console.log(email);
    console.log(user.password, "...........................userpassword");

    console.log(hash, "---------------------------------------------find");
    model
      .updateOne({ email }, { $set: { password: user.password } })
      .then((response) => {
        res.json({ message: "sucess update password", response });
        console.log(response, "===============================response");
      })
      .catch((error) => {
        res.json({ message: "error================================" });
      });
  });
};

const getUsers = async (req,res)=>{
  try {
  let usersData = await model.find()
  if (usersData){
    res.status(200).json({message:"Successfully Get User Data",usersData})
  }
  else{
    res.status(400).json({message:"No Data Found",usersData})

  }
}
catch (error) {
  console.log(error,'------------------error')
  res.status(500).json({error})

}

};

const getOneData=(req,res)=>{
  let id = req.params.id 
  console.log(req.params.id)
  model.findById({_id:ObjectId(id)})
  .then(response=>{
   res.json({response})
  })
  .catch(error => {
   res.json({message:'error'})
  })
}
module.exports = { register, login, forGotPassword,getUsers ,getOneData};
