const Film = require("../models/Film");

const getFilmByGenres = async (req,res,next) => {
    const object = req.body;
    const genres = object.genres;
    let film = new Film()
    film.setGenre(genres)

}






module.exports = {
    getFilmByGenres
}
