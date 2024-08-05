const express= require("express")

const {signUpUser, loginUser} =require("../controllers/users.js")

const usersrouter= express.Router()

usersrouter.post("/signUp", signUpUser)
usersrouter.post("/login", loginUser)

module.exports = usersrouter