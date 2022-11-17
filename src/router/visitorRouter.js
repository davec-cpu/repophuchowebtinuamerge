const express = require('express')
const router = express.Router()
const visitorController = require('../controllers/visitorController')

router.use('/login', visitorController.login);
router.use('/register', visitorController.register);
router.get('/homePage',visitorController.showHomePage)

   

module.exports = router