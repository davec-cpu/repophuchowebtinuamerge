const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middleware/authentication')

router.use('/show/:id',userController.getUserInfo)
router.use('/update/:id',userController.updateUserInfo)
    

module.exports = router