// const reader = require("../data/readData");
// const creator = require("../data/createData");
// const checker = require("../data/checkData");

// const createFilm = async (req,res) => {
//     try {
//         const filmData = req.body
      
//         const data = await creator.createFilm(filmData)
        
//         res.send(data)
//     } catch (error) {
//         res.send(error)
//     }
// }

// const showFilm = async (req,res) => {
//     try {
//         const data = await reader.readAllFilm()
        
//         res.send(data)
//     } catch (error) {
//         res.send(error)
//     }
// }

// module.exports = {
//     createFilm,
//     showFilm
// }
