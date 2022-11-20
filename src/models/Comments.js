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

class Comments{
    #idComment
    #content
    #postDate
    #idFilm
    #idUser

    constructor(idComment, content, postDate, idFilm, idUser){
    this.#idComment = idComment
    this.#postDate = postDate
    this.#content = content
    this.#idFilm = idFilm
    this.#idUser = idUser
    }

    set setIdComment(idComment){
        this.#idComment = idComment
    }

    get getIdComment(){
        return this.#idComment;
    }

    get getPostDate(){
        return this.#postDate;
    }

    set setPostDate(postDate){
        this.#postDate = postDate
    }

    set setContent(content){
        this.#content = content
    }

    get getContent(){
        return this.#content;
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

    addNewComment(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "INSERT INTO `phim__binh_luan`(`idPhim`, `idKhachHang`, `binhLuan`, `ngayDangBinhLuan`)" 
                    +"VALUES (?,?,?,?)"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idFilm, this.#idUser, this.#content, this.#postDate],
                        (err, row) => {
                            if(err) throw err
                            if(row.length === 0) throw new NotFoundError()
                            resolve(row)
                        }
                    )
                    con.release()
                } catch (error) {
                    reject(error)
                    console.log('Loi xay ra khi them binh luan')
                }
            })
        })
    }

    getAllComOfOneFilm(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "SELECT `idPhim`, `idKhachHang`, `binhLuan`, `ngayDangBinhLuan` FROM `phim__binh_luan` WHERE " 
                    +"`idPhim` = ?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idFilm],
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

    updateComment(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "UPDATE `phim__binh_luan` SET "+
                    "`binhLuan`=?,`ngayDangBinhLuan`=? WHERE `idPhim` = ? AND `idKhachHang`=?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#content, this.#postDate, this.#idFilm, this.#idUser],
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

    deleteCommt(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                try {
                    const query = "DELETE FROM `phim__binh_luan`  WHERE `idPhim` = ? AND `idKhachHang`=?"
                    if(err) throw err
                    con.query(
                        query,
                        [this.#idFilm, this.#idUser],
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

module.exports = Comments