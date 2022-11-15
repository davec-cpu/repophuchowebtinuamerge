const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const { Visitor } = require("../models/UserObject/Visitor");

  const login = async (req,res,next) => {
    const account = req.body;
    let visitor = new Visitor();
    visitor.setUsername = account.username;
    visitor.setPassword = account.password;
    let username = visitor.getUsername;
    let password = visitor.getPassword;
    try {
       const existentUser = await visitor.signIn();
       if (!existentUser) throw new NotFoundError("sign in first")
       const pwd = await bcryptCompare(password, existentUser.matKhau)
       if (!pwd) throw new ValidationError("Wrong password")
       const jwt = await jwtSign(existentUser)
      if (!!jwt) res.send(jwt)
     } catch (error) {
      next(error);
     }
   }

   const register = async (req,res,next) => {
    const user = req.body;

    if (!user.username) throw new FieldRequiredError(`A username`);
    if (!user.password) throw new FieldRequiredError(`A password`);
    
    const userExists = await checker.checkUser(username, email);
    if (userExists.length !== 0)
      throw new AlreadyTakenError("try logging in");

    const newUser = await creator.createUser(user);

    const token = await jwtSign(newUser);

    res.send(token);
   }























module.exports = {
login,
}

