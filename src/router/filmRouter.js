const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')
const { verifyToken } = require('../middleware/authentication')


module.exports = router