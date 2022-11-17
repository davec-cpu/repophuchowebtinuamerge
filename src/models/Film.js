const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");
class Film{
    #idFilm
    #name
    #genre
    #description
    #rating
    #trailer
    #view
    #releaseDay
    constructor(name,genre,description,rating,trailer,view,releaseDay){
        this.#name= name
        this.#genre= genre
        this.#description= description
        this.#rating= rating
        this.#trailer= trailer
        this.#view= view
        this.#releaseDay= releaseDay
    }

    set setId(idFilm) {
      this.#idFilm = idFilm;
    }
  
    get getId() {
      return this.#idFilm;
    }

    set setName(name) {
      this.#name = name;
    }
  
    get getName() {
      return this.#name;
    }

    set setGenre(genre) {
      this.#genre = genre;
    }
  
    get getGenre() {
      return this.#genre;
    }

// Nhóm chức năng tìm kiếm, show dữ liệu

    getAllFilm(){
      return new Promise((resolve, reject) => {
      try {
      const query = "SELECT * FROM phim"
      pool.getConnection( (err,connection) =>{ 
      if (err) throw err
      connection.query(
      query,
      [],
      (err,rows) =>{
      if (err) throw err
      if(rows.length === 0) throw new NotFoundError() 
      resolve(rows)
      })
      connection.release()
      })
      }catch (error) {
      reject(error)
      console.log(error)
      }})
    }

    getFilmById(){
     return new Promise((resolve, reject) => {
     try {
      console.log(this.#idFilm);
     const query = "SELECT * FROM phim WHERE idPhim = ?"
     pool.getConnection( (err,connection) =>{ 
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
     })
     }catch (error) {
     reject(error)
     console.log(error)
     }})
    }

    getFilmByName(){
      return new Promise((resolve, reject) => {
      try {
      const query = "SELECT * FROM phim WHERE tenPhim LIKE" 
      + "'%" + this.#name + "%'" 
      pool.getConnection( (err,connection) =>{ 
      if (err) throw err
      connection.query(
      query,
      [],
      (err,rows) =>{
      if (err) throw err
      if(rows.length === 0) throw new NotFoundError() 
      resolve(rows)
      })
      connection.release()
      })
      }catch (error) {
      reject(error)
      console.log(error)
      }})
    }

    getFilmByViews(){
        return new Promise((resolve, reject) => {
          try {
            const view = 500
            const query = "SELECT * FROM phim WHERE luotXem > ?"
            pool.getConnection( (err,connection) =>{ 
            if (err) throw err
            connection.query(
              query,
              [view],
              (err,rows) =>{
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
            })
          } catch (error) {
            reject(error)
            console.log(error);
          }
        })
      }
    
      getFilmByRatings(){
        return new Promise((resolve, reject) => {
          try {
            const top = 3
            const query = "SELECT * FROM phim WHERE idPhim IN (SELECT idPhim FROM khach_hang_danh_gia ORDER BY soSaoDanhGia DESC) LIMIT ?"
            pool.getConnection( (err,connection) =>{ if (err) throw err
            connection.query(
              query,
              [top],
              (err,rows) => {
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
          })
          } catch (error) {
            reject(error)
            console.log(error);
            
          }
        })
      }
    
      getNewFilm(){
        return new Promise((resolve, reject) => {
         try {
        const number = 3;
        const query = "SELECT * FROM phim ORDER BY ngayChieu DESC LIMIT ?"
        pool.getConnection( (err,connection) =>{ 
          if (err) throw err
         connection.query(
          query,
          [number],
          (err,rows) =>{
            if (err) throw err
            else resolve(rows)
          })
        connection.release()      
        })
         } catch (error) {
             connection.destroy()
          reject(error)
        console.log(error)
        }})
      }

      getFilmByGenres(){
        return new Promise((resolve, reject) => {
        try {
        const length = this.#genre.length
        const query = "SELECT * FROM phim WHERE idPhim IN" +
        "(SELECT idPhim FROM phim__the_loai WHERE theLoai IN" +
          "(?) GROUP BY idPhim HAVING COUNT(*) = ?)"
        pool.getConnection( (err,connection) =>{ 
        if (err) throw err
        connection.query(
        query,
        [this.#genre,length],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError()

        resolve(rows)
        })
        connection.release()
        })
        }catch (error) {
        reject(error)
        console.log(error)
        }})
      }

}

module.exports = Film;