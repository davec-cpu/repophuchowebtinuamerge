const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");
class Film{
    #name
    constructor(name,genre,description,rating,trailer,view,releaseDay){
        this.#name = name;
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
}

module.exports = Film;