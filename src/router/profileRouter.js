const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const { verifyToken } = require('../middleware/authentication')

    
    

module.exports = router