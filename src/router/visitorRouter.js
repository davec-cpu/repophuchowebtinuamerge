const express = require('express')
const router = express.Router()
const visitorController = require('../controllers/visitorController')

router.use('/visitor/login', visitorController.login);
router.use('/visitor/register', visitorController.register);
router.use('/homePage',visitorController.showHomePage)

   

module.exports = router