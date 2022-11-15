const pool = require("../config/configMysql");
const { mysql } = require("../config/configMysql");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
class Visitor {
  #username
  #password
  #role
  #address
  #birthday
  #email
  #fullname

  constructor(username,password,role,address,birthday,email,fullname){
    this.#username = username;
    this.#password = password;
    this.#role = role;
    this.#address = address;
    this.#birthday = birthday;
    this.#email = email;
    this.#fullname = fullname;
  }

  set setUsername(username) {
    this.#username = username;
  }

  set setPassword(password) {
    this.#password = password;
  }

  get getUsername() {
    return this.#username;
  }

  get getPassword() {
    return this.#password;
  }

   signIn(){
   return new Promise((resolve, reject) => {
    try {
      const query = "Select * from nguoi_dung_co_tai_khoan where tenDangNhap = ?"
      pool.getConnection( (err,connection) =>{ 
        if (err) throw err
      connection.query(
        query,
        [this.#username],
        (err,  rows) => {
          if (err) throw err;
          if(rows.length === 0) throw new NotFoundError("Không có tài khoản")
          else   resolve(rows[0]);
        }
      )
      connection.release();
    })
 
    } catch (error) {
    reject(error)
    }
    
  }) 
   }

  signUp() {
    return new Promise((resolve, reject) => {
    try {
      const query = "Select idNguoiDung from nguoi_dung_co_tai_khoan where tenDangNhap = ?"
      pool.getConnection( (err,connection) =>{ 
        if (err) throw err
      connection.query(
        query,
        [this.#username],
        (err,rows) => {
          if (err) throw err;
          if(rows.length !== 0) throw new AlreadyTakenError(
            "Bạn đã có tài khoản rồi, cố mà đăng nhập đi. Tôi chưa làm được chức năng lấy lại mật khẩu đâu")
        })

      connection.query(
        "INSERT INTO nguoi_dung_co_tai_khoan VALUES (?,?,?,?,?,?,?,?)",
        [null,this.#username,this.#password,this.#role,this.#address,this.#birthday,this.#email,this.#fullname],
        (err,rows) => {
          if (err) throw err;
          else console.log(rows.insertId);
        })
        connection.release();
      })
        
    } catch (error) {
    
     reject (error)
    }
  })
  }
}
module.exports =  {Visitor} ;
