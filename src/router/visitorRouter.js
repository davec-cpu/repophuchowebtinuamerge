const express = require('express')
const router = express.Router()
const visitorController = require('../controllers/visitorController')

router.use('/login', visitorController.login);
   

module.exports = router