const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");

var express = require('express')
var fs = require('fs')
var app = express()

class Film{
    #id
    #name
    #genre
    #description
    #rating
    #trailer
    #view
    #releaseDay
    #path
    constructor(name,description,rating,trailer,view,releaseDay, path){
        this.#name= name
        this.#description= description
        this.#rating= rating
        this.#trailer= trailer
        this.#view= view
        this.#releaseDay= releaseDay
        this.#path = path
    }

    set setId(id) {
      this.#id = id;
    }
  
    get getId() {
      return this.#id;
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

    set setPath(path) {
      this.#path = path;
    }
  
    get getPath() {
      return this.#path;
    }

// Nhóm chức năng tìm kiếm, show dữ liệu

    getAllFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim"
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
      }catch (error) {
        connection.release()
      reject(error)
      console.log(error)
      }})})}

    getFilmById(){
     return new Promise((resolve, reject) => {
       pool.getConnection( (err,connection) =>{ 
     try {
     const query = "SELECT * FROM phim WHERE idPhim = ?"
     if (err) throw err
     connection.query(
     query,
     [this.#id],
     (err,rows) =>{
     if (err) throw err
     if(rows.length === 0) throw new NotFoundError() 
     resolve(rows[0])
    })
    connection.release()
     }catch (error) {
      connection.release()
      reject(error)
     console.log(error)
    }})})}

    getFilmByName(){
      return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim WHERE tenPhim LIKE" 
      + "'%" + this.#name + "%'" 
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
      }catch (error) {
        connection.release()
        reject(error)
      console.log(error)
      }})})}

    getFilmByViews(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
            const view = 500
            const query = "SELECT * FROM phim WHERE luotXem > ?"
            if (err) throw err
            connection.query(
              query,
              [view],
              (err,rows) =>{
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
            
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
          }})})}
    
      getFilmByRatings(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ if (err) throw err
          try {
            const top = 3
              const query = "SELECT * FROM phim WHERE idPhim IN (SELECT idPhim FROM khach_hang_danh_gia ORDER BY soSaoDanhGia DESC) LIMIT ?"
            connection.query(
              query,
              [top],
              (err,rows) => {
                if (err) throw err
                else resolve(rows)
              })
              connection.release()
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
            
          }})})}
    
      getNewFilm(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
         try {
        const number = 3;
        const query = "SELECT * FROM phim ORDER BY ngayChieu DESC LIMIT ?"
          if (err) throw err
         connection.query(
          query,
          [number],
          (err,rows) =>{
            if (err) throw err
            else resolve(rows)
          })
        connection.release()      
      } catch (error) {
        connection.release()
        reject(error)
        console.log(error)
      
      }})})
      }

      getFilmByGenres(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
        try {
        const length = this.#genre.length
        const query = "SELECT * FROM phim WHERE idPhim IN" +
        "(SELECT idPhim FROM phim__the_loai WHERE theLoai IN" +
          "(?) GROUP BY idPhim HAVING COUNT(*) = ?)"
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
        
        }catch (error) {
          connection.release()
          reject(error)
        console.log(error)
        }})})
      }

// *****************************************************************************************
      // Nhóm chức năng thêm

      createFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim VALUES(?,?,?,?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [null,this.#name,this.#description,this.#rating,this.#trailer,this.#view,this.#releaseDay],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        this.#id = rows.insertId 
        resolve(rows.insertId)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }

      // *****************************************************************************************
      // Nhóm chức năng Sửa

      updateFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim SET" +
                      "tenPhim = ?, moTa = ?, danhGia = ?, trailer = ?, luotXem = ?, ngayChieu = ?" +
                      "WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#description, this.#rating, this.#trailer, this.#view, this.#releaseDay, this.#id],
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


      // *****************************************************************************************
      // Nhóm chức năng Xoá
      deleteFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
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


      async playFilm(range, res){
        const videoSize = fs.statSync(this.#path).size
        const chunkSize = 1 * 1e+6
        const start = Number(range.replace(/\D/g, '')) // /_/g la global match, \D la 
        const end = Math.min(start + chunkSize, videoSize - 1)
        console.log('range: ', range)
        const contentLength = end - start + 1
        
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }
    
        console.log('headers: ', headers)
        res.writeHead(206, headers)
        
        const stream = fs.createReadStream(this.#path, {start, end})
        stream.pipe(res)
      }

      getFilmPath() {
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
          const query = "SELECT duongDan FROM `phim` WHERE `idPhim` = ?"
          if (err) throw err
          connection.query(
          query,
          [this.#id],
          (err,rows) =>{
          if (err) throw err
          if(rows.length === 0) throw new NotFoundError() 
        //  this.#trailer = rows[0].duongDan
          resolve(rows[0].duongDan)
          })
          connection.release()
          }catch (error) {
          reject(error)
          console.log(error)
          }})})
      }

}

module.exports = Film;