const Actor = require("../models/Actor")
const Film = require("../models/Film")

const getIdByName = async (req,res,next) => {
    let actor = new Actor()
    const idFilm = 4
    actor.setName = "Camila Mendes"  
    const kq = await actor.getIdByName()
    console.log(kq);
}



module.exports = {
    getIdByName
}