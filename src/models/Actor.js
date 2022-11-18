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
    #avatar
    #idFilm
    constructor(name,birthday,country,avatar){
        this.#name = name
        this.#birthday = birthday
        this.#country = country
        this.#avatar = avatar
    }

    set setId(id){
        this.#id = id
    }

    get getId(){
        return this.#id;
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

    getIdByName(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT idDienVien FROM dien_vien WHERE tenDienVien = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        this.#id = rows[0].idDienVien
        resolve(rows[0].idDienVien)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    getActorsByIdFilm(){
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
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    createActorsInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim__dien_vien_dong VALUES(?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#idFilm],
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

    deleteActorsInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim__dien_vien_dong WHERE idPhim = ?"
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

    updateActorsInFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim__dien_vien_dong SET idDienVien = ? WHERE idPhim = ? "
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#idFilm],
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
    
    updateActor(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE dien_vien SET tenDienVien = ?, ngaySinh = ?, queQuan = ?, hinhAnh = ? WHERE idDIenVien = ? "
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#birthday, this.#country, this.#avatar, this.#id],
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

module.exports = Actor