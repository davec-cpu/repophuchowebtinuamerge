const  Visitor  = require("./Visitor");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");
class User extends Visitor{
    #id
    #username;
    #password;
    #role
    #address;
    #birthday;
    #email;
    #fullname;
    #sex
    constructor(id,username,password,role,address,birthday,email,fullname,sex){
        super(username,password);
        this.#id = id;
        this.#role = role
        this.#address =address
        this.#birthday = birthday
        this.#email = email
        this.#fullname = fullname
        this.#sex = sex
    }

    set setId(id){
        this.#id = id
    }

    get getId(){
        return this.#id
    }

    set setRole(role){
        this.#role = role
    }

    get getRole(){
        return this.#role
    }

    set setAddress(address){
        this.#address = address
    }

    get getAddress(){
        return this.#address
    }

    set setBirthday(birthday){
        this.#birthday = birthday
    }

    get getBirthday(){
        return this.#birthday
    }

    set setEmail(email){
        this.#email = email
    }

    get getEmail(){
        return this.#email
    }

    set setFullname(fullname){
        this.#fullname = fullname
    }

    get getFullname(){
        return this.#fullname
    }

    set setSex(sex){
        this.#sex = sex
    }

    get getSex(){
        return this.#sex
    }

    signUp() {
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            try {
              const query =
                "Select idNguoiDung from nguoi_dung_co_tai_khoan where tenDangNhap = ?";
              if (err) throw err;
              connection.query(query, [this.#username], (err, rows) => {
                if (err) throw err;
                if (rows.length !== 0)
                  throw new AlreadyTakenError(
                    "Bạn đã có tài khoản rồi, cố mà đăng nhập đi. Tôi chưa làm được chức năng lấy lại mật khẩu đâu"
                  );
              });
    
              connection.query(
                "INSERT INTO nguoi_dung_co_tai_khoan VALUES (?,?,?,?,?,?,?,?,?)",
                [
                  null,
                  this.#username,
                  this.#password,
                  this.#role,
                  this.#address,
                  this.#birthday,
                  this.#email,
                  this.#fullname,
                  this.#sex
                ],
                (err, rows) => {
                  if (err) throw err;
                }
              );
              connection.query(
                "Select * from nguoi_dung_co_tai_khoan where tenDangNhap = ?",
                [this.#username],
                (err, rows) => {
                    if (err) throw err;
                    else resolve(rows[0])
                }
              )
              connection.release();
            } catch (error) {
              connection.release();
              reject(error);
            }
          });
        });
      }

      getUser(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM nguoi_dung_co_tai_khoan WHERE id = ?"
        if (err) throw err
        connection.query(
        query,
        [this.id],
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

      getUserInfo(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT diaChi,ngaySinh,email,tenDayDu,gioiTinh FROM nguoi_dung_co_tai_khoan WHERE idNguoiDung = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows[0])
        console.log(rows);
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    updateUserInfo(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE nguoi_dung_co_tai_khoan SET " + 
        "diaChi = ?, ngaySinh = ?, email = ?, tenDayDu = ?, gioiTinh = ? "+  
        "WHERE idNguoiDung = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#address, this.#birthday, this.#email, this.#fullname, this.#sex, this.#id],
        (err,rows) =>{
        if (err) throw err
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }
}

module.exports = User