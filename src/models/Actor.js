const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

class Actor{
    #id
    #name
    #birthday
    #country
    #idFilm
    constructor(name,birthday,country){
        this.#name = name
        this.#birthday = birthday
        this.#country = country
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    getActorByIdFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT tenDienVien from dien_vien where idDienVien IN" 
                    + "(SELECT idDienVien from phim__dien_vien_dong WHERE idPhim = ?)"
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

module.exports = Actor