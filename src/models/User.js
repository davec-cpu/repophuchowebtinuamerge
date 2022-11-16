const { Visitor } = require("./Visitor");

class User extends Visitor{
    #idUser
    constructor(idUser,username,password,role,address,birthday,email,fullname){
        super(username,password,role,address,birthday,email,fullname);
        this.#idUser = idUser;
    }

    set setIdUser(idUser){
        this.#idUser = idUser
    }

    get getIdUser(){
        return this.#idUser
    }

    
}

module.exports = {User}