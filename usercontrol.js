const { response } = require('express')
const usersModel = require('./usermodel')
var mongoose = require('mongoose')
var paginate =  require('mongoose-paginate')

const ObjectId = mongoose.Types.ObjectId

// const allUsers = async(req,res)=>{
//     usersModel.find()
//     .then(response =>{
//         res.json({message:'successfully',response})
//     })
//     .catch(error=>{
//    res.json({message:error})
//     })

    
// }



const allUsers = async (req, res) => {    
    try {
        const page = req.body.page ;
        console.log(page,"===================================page")
        const limit = req.body.size ;
        console.log(limit,"===================================limit")

        skipIndex = (page - 1) * limit;
        console.log(skipIndex,"===================================skip")

        let result = {};
        const totalCount = await usersModel.countDocuments();
        console.log(totalCount,"===================================total")

        if(totalCount <= limit) {
            skipIndex = 0
        }
        const usersData = await usersModel.find().skip(skipIndex).limit(limit).sort()
        console.log(usersData,'==========================usersdata')

        return res.send({status: 200, result: {totalCount, usersData, page, limit}});

    } catch (error) {
        return res.status(500).send(error);
        console.log(error,"=======================================")
    }
};



    
const store = async (req,res) => {
    const data =JSON.parse(req.body.user)
  if (!data.price) {
    res.json({message: 'Plesde', status: 400})
  }else{
  let us = new usersModel({
    imagePath:req.file.originalname,
    price:data.price,
    breed:data.breed,
})
    us.save()
    .then(response=>{
        res.json({
           message:response,
           status:200
        })
    })
    .catch(err => {
        console.log(err,"-=================-=-=")
        res.json({
            message:err
        })
    })

}

    
}

const update = (req,res) => {
     let id = req.params.id
     console.log(req.params.id)
    let updateData={
        name:req.body.name,
        cellnumber:req.body.cellnumber,
        branch:req.body.branch,
        city:req.body.city
    
    }
     usersModel.updateOne({_id:ObjectId(id)},{$set:updateData})
    .then(response=>{
        console.log(response)
        res.json({response,updateData})
    })
    .catch(err => {
        console.log(err)
        res.json({message:"error"})
    })
    


}

const getOneData=(req,res)=>{
   let id = req.params.id 
   console.log(req.params.id)
   usersModel.findById({_id:ObjectId(id)})
   .then(response=>{
    res.json({response})
   })
   .catch(error => {
    res.json({message:'error'})
   })
}

const deleteItem = (req,res )=>{
    console.log(req.params.id,"----------------------------------parmsid")
    let id = req.params.id
    usersModel.deleteOne({_id:ObjectId(id)})
    .then(response =>{
        res.json({message:"delete seccesfully", status:200})
        console.log(response)   
    })
    .catch(error => {
        res.json({message:"not delete",status:400})
    })
}

const getAllDogs = async (req,res)=>{
      
    try {
        let usersData = await usersModel.find()
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
      
      }}

module.exports={
    store,update,allUsers,getOneData,deleteItem,getAllDogs
}