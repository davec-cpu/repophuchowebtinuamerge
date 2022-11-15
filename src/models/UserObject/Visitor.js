const { mysql } = require("../../config/configMysql");
const sql = require("mysql2");
const connection = sql.createConnection(mysql);

class Visitor {

  #username;
  #password;

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
      connection.connect( err =>{ if (err) throw err})
      connection.query(
        "Select * from nguoi_dung_co_tai_khoan where tenDangNhap = ?",
        [this.#username],
        (err,  rows) => {
          if (err) throw err;
          else{
             resolve(rows[0]);
          }
        }
      )
      connection.end()
    } catch (error) {
    console.log(error);
    reject(error)
    connection.end()
    }
  }) 
   }

  signUp = async () => {
    try {
      connection.connect( err =>{ if (err) throw err})
      connection.query(
        "Select idNguoiDung from nguoi_dung_co_tai_khoan where tenDangNhap = ?",
        [this.#username],
        (err,rows) => {
          if (err) throw err;
          else throw new AlreadyTakenError("Bạn đã có tài khoản rồi, cố mà đăng nhập đi. Tôi chưa làm được chức năng lấy lại mật khẩu đâu")
            
        }
        )
    } catch (error) {
     console.log(error); 
    }
  }

}
module.exports = { Visitor };
