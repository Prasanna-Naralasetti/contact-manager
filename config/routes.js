const express=require('express')
const router=express.Router()
const registerController=require('../app/controllers/registerController')
const loginController = require('../app/controllers/registerController')


router.post('/register', registerController.register)
router.post('/login',loginController.login)

module.exports=router