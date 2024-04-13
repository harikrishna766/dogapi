const control = require("./loginControl")
const express = require("express")
const loginRouter = express.Router()
loginRouter.post('/register',control.register)
loginRouter.post("/login",control.login)
loginRouter.get("/userData",control.getUsers)
loginRouter.get('/oneitem/:id',control.getOneData)
loginRouter.put("/forgot",control.forGotPassword)
module.exports = loginRouter