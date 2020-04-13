const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const { authenticateUser } = require('../app/middelewares/authenticateUser')
//const contactsController = require('../app/controllers/contactsController')
const contactsController = require('../app/controllers/contactsController')


router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.delete("/logout", authenticateUser, usersController.logout);

router.post('/contacts', authenticateUser, contactsController.create)
router.get('/contacts', authenticateUser, contactsController.list)
router.get('/contacts/:id', authenticateUser, contactsController.show)
router.put('/contacts/:id', authenticateUser, contactsController.update)
router.delete('/contacts/:id', authenticateUser, contactsController.destroy)

module.exports=router