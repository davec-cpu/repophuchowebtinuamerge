const Actor  = require("../models/Actor");
const Film = require("../models/Film");
const Genre = require("../models/Genre");


const getAllFilm = async (req,res,next) => {
    let film = new Film()
    try {
        const films = await film.getAllFilm()
        const data = await Promise.all (films.map( async (film) => {
            let actor = new Actor()
            let genre = new Genre()
            actor.setIdFilm = film.idPhim
            genre.setIdFilm =  film.idPhim
            const actors =  await actor.getActorByIdFilm()
            film.dienVien = actors
            const genres =  await genre.getGenreByIdFilm()
            film.theLoai = genres
            // console.log(film);
            return film
        }))
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmById = async (req,res,next) => {
    let film = new Film()
    
    const params = req.params
    try {
    const idFilm = params.id
    film.setId = idFilm
    actor.setIdFilm = idFilm
    const films = await film.getFilmById()
    const actors = await actor.getActorByIdFilm()
    films.dienVien = actors
   
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

const createFilm = async (req,res,next) => {
    const  {
        tenPhim,
        moTa,
        danhGia,
        trailer,
        luotXem,
        ngayChieu,
        dienVien,
        theLoai
    } = req.body

    const film = new Film(tenPhim,moTa,danhGia,trailer,luotXem,ngayChieu)
    await film.createFilm()
    const idFilm = film.getId
    

}

module.exports = {
    getFilmByGenres,
    getFilmByName,
    getAllFilm,
    getFilmById
}
