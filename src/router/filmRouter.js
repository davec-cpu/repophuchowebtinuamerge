const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.post('/filter/genres', filmController.getFilmByGenres)
router.get('/search/name',filmController.getFilmByName)
router.get('/show',filmController.getAllFilm)
router.get('/search/id/:id', filmController.getFilmById)
router.use('/create', filmController.createFilm)


module.exports = router