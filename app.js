var express = require("express")
var config = require("./configset")
const cors =  require("cors")
const connectDB = require('./db');
const usersRoute = require('./rout')
const bobyparse = require('body-parser')
const loginRouter = require('./loginRouter')


connectDB()
var app = express();
app.use(cors())
app.use(bobyparse.urlencoded({extended:true}))
app.use(bobyparse.json())
app.use('/photos', express.static('images'));
app.use("/api/v1/user", usersRoute)
app.use("/api/v1/login",loginRouter)
app.get('/',(req,res)=>{
    res.send("Hello")
})
app.listen(config.port,()=>{
    console.log (`run on server::::::`,config.baseUrl)
})