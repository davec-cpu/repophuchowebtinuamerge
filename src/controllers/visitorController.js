const {
  ValidationError,
  FieldRequiredError,
  NotFoundError,
} = require("../helper/customError");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const { Visitor } = require("../models/Visitor")
const Film = require("../models/Film")

  const login = async (req,res,next) => {
    const account = req.body;
    let visitor = new Visitor();
    visitor.setUsername = account.username;
    visitor.setPassword = account.password;
    const username = visitor.getUsername;
    const password = visitor.getPassword;
    try {
       const existentUser = await visitor.signIn();
       if (!existentUser) throw new NotFoundError("sign in first")
       const pwd = await bcryptCompare(password, existentUser.matKhau)
       if (!pwd) throw new ValidationError("Wrong password")
      const jwt = await jwtSign({username})
      if (jwt) res.send(jwt)
     } catch (error) {
      next(error);
     }
   }

   const register = async (req,res,next) => {
    const {username,password,role,address,birthday,email,fullname} = req.body;
  try { 
  if (!username) throw new FieldRequiredError(`A username`);
    if (!password) throw new FieldRequiredError(`A password`);
    if (!role) throw new FieldRequiredError(`A role`);
    if (!address) throw new FieldRequiredError(`A address`);
    if (!email) throw new FieldRequiredError(`A email`);
   
    const hashPassword = await bcryptHash(password);

    let visitor = new Visitor(username,hashPassword,role,address,birthday,email,fullname);

    const newUser = await visitor.signUp()

    if(newUser){
      const jwt = await jwtSign({username})
      res.send(jwt)
    } 
  }catch (error){
  next(error)
  }
}

const showHomePage =async (req,res,next) =>{
  let film = new Film();
  try {
  const hotFilm = await film.getFilmByViews()
  const appreciatedFilm = await film.getFilmByRatings()
  const newFilm = await film.getNewFilm();
  const dataFilm = {
      hotFilm,
      appreciatedFilm,
      newFilm
  }
  res.send(dataFilm)
  } catch (error) {
      next(error)
  }
}


module.exports = {
login,
register,
showHomePage
}

