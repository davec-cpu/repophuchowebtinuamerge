const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

class Genre{
    #idFilm
    #name
    constructor(idFilm,name){
    this.#idFilm = idFilm
    this.#name = name
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    getGenreByIdFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT theLoai from phim__the_loai where idPhim = ?" 
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

}

module.exports = Genre