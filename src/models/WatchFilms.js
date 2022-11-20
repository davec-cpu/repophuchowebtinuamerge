const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
const pool = require("../config/configMysql");
const e = require("express");
const Film = require("./Film");
const User = require("./User");

class WatchFilms{
    #idFilm
    #idUser
    #idEp
    #watchingDate
    #watchingTime

    constructor(idFilm, idUser, idEp, watchingDate, watchingTime){
        this.#idFilm = idFilm
        this.#idUser = idUser
        this.#idEp = idEp
        this.#watchingDate = watchingDate
        this.#watchingTime = watchingTime
    }

    set setIdFilm(idFilm){
        this.#idFilm = idFilm
    }

    get getIdFilm(){
        return this.#idFilm;
    }

    set setIdUser(idUser){
        this.#idUser = idUser
    }

    get getIdUser(){
        return this.#idUser;
    }
    set setIdEp(idEp){
        this.#idEp = idEp
    }

    get getIdEp(){
        return this.#idEp;
    }
    set setWatchingDate(watchingDate){
        this.#watchingDate = watchingDate
    }

    get getWatchingDate(){
        return this.#watchingDate;
    }

    set setWatchingTime(watchingTime){
        this.#watchingTime = watchingTime
    }

    get getWatchingTime(){
        return this.#watchingTime;
    }


    addNewWatchingFilm(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "INSERT INTO `phim__xem_phim`(`idPhim`, `idKhachHang`, `idTap`, `ngayXemPhim`, `gioXemPhim`) " 
                    +"VALUES (?,?,?,?,?)"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idFilm, this.#idUser, this.#idEp, this.#watchingDate, this.#watchingTime],
                        (err, row) => {
                            if(err) throw err
                            if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log('Loi xay ra khi them lich su xem phim')
                }
            })
        })
    }

    getUserHistory(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "SELECT * FROM `phim__xem_phim` WHERE idKhachHang = ? " 
                     
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idUser],
                        (err, row) => {
                            if(err) throw err
                          //  if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                            
                        }
                    )
                    con.release()
                } catch (error) {
                    con.release()
                    reject(error)
                    console.log(error)
                }
            })
        })
    }

    deleteWatchFilm(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "DELETE FROM `phim__xem_phim` WHERE idKhachHang =? AND idPhim = ? AND idTap = ?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idUser, this.#idFilm, this.#idEp],
                        (err, row) => {
                            if(err) throw err
                            if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log(error)
                }
            })
        })
    }


    deleteuserWatchHistory(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "DELETE FROM `phim__xem_phim` WHERE idKhachHang =?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idUser],
                        (err, row) => {
                            if(err) throw err
                            if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log(error)
                }
            })
        })
    }
}

module.exports = WatchFilms