const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.post('/filter/genres', filmController.getFilmByGenres)


module.exports = router