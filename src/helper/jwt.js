const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSign = async (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "30h" });
};

const jwtVerify = async (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN);
};  

module.exports = {
  jwtSign,
  jwtVerify,
};
