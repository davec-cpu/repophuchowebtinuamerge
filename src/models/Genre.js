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

    set setName(name){
        this.#name = name
    }

    get getName(){
        return this.#name;
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    addNewComment(){
        return new Promise((res, rej) => {
            pool.getConnection( (err, connection) => {
                try {
                    const query = "INSERT INTO "
                } catch (error) {
                    
                }
            })
        })
    }

    createGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim__the_loai VALUES(?,?) "
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm,this.#name],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    updateGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim__the_loai SET theLoai = ? WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#idFilm],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    deleteGenresInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim__the_loai WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#idFilm],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
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