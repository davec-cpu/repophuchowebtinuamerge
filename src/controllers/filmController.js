const Film = require("../models/Film");


const getAllFilm = async (req,res,next) => {
    let film = new Film()
    try {
        const films = await film.getAllFilm()
        res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmById = async (req,res,next) => {
    let film = new Film()
    const params = req.params
    try {
    film.setId = params.id
    const films = await film.getFilmById()
    res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmByGenres = async (req,res,next) => {
    const object = req.body;
    const genres = object.genres;
    let film = new Film()
    film.setGenre = genres
    try {
    const films = await  film.getFilmByGenres()
    res.send(films)
    } catch (error) {
    res.status(400).send(error.message)
    }
}


const getFilmByName = async (req,res,next) => {
    const searchingWord = req.query.search    
    const film = new Film();
    film.setName = searchingWord
    try {
        const films = await film.getFilmByName()
        res.send(films)
    } catch (error) {
        next(error)
    }

}


module.exports = {
    getFilmByGenres,
    getFilmByName,
    getAllFilm,
    getFilmById
}
