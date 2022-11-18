const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");


class Request{
    #id;
    #type;
    #idUser;
    #amount;
    #content;
    
    constructor (type, idUser, amount, )
}