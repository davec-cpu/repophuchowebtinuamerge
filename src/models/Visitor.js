const pool = require("../config/configMysql");

const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
class Visitor {
  #username;
  #password;


  constructor(username, password) {
    this.#username = username;
    this.#password = password;
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

  signIn() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        try {
          const query =
            "Select * from nguoi_dung_co_tai_khoan where tenDangNhap = ?";
          if (err) throw err;
          connection.query(query, [this.#username], (err, rows) => {
            if (err) throw err;
            if (rows.length === 0)
              throw new NotFoundError("Không có tài khoản");
            else resolve(rows[0]);
          });
          connection.release();
        } catch (error) {
          // connection.release();
          reject(error);
        }
      });
    });
  }


}
module.exports = Visitor 
