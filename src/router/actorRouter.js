const express = require('express')
const router = express.Router()
const actorController = require('../controllers/actorController')
const { verifyToken } = require('../middleware/authentication')

router.use('/show',actorController.getIdByName)

module.exports = router