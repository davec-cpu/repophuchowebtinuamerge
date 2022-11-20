const WatchFilms = require('../models/WatchFilms')
var moment = require('moment')

const addNewWatchFilmCtrl =  (req,res,next) => {
//this.#idFilm, this.#idUser, this.#idEp, this.#watchingDate, this.#watchingTime
    const object =  req.body
    const idFilm = object.idPhim
    const idUser = object.idKhachHang
    const idEp = object.idTap
    

     
    var currDate = moment().format('YYYY-MM-DD')
    var currTime = moment().format('h:mm:ss')
    console.log('Ngay hien tai: ' + currDate + 'Gio hien tai: '+ currTime)

 

    let watchfilm = new WatchFilms()
    watchfilm.setIdUser = idUser
    watchfilm.setIdFilm = idFilm
    watchfilm.setIdEp = idEp 
    watchfilm.setWatchingDate = currDate
    watchfilm.setWatchingTime = currTime

    var str = 'id phim: ' + idFilm +', id khach hang: ' + idUser
    + ', binh luan: '+idEp
    
   const result =  watchfilm.addNewWatchingFilm()
   res.send(result)
}

const getUserWatchHistoryCtrl = async  (req, res, next)=>{
    const params = req.params
    let watchfilm = new WatchFilms()
    
    try {
        const idUser = params.id
        watchfilm.setIdUser = idUser
      
        const userHis = await watchfilm.getUserHistory()
        console.log('ngay dang: ', userHis)
        res.send(userHis)
    } catch (error) {
        console.log('Gap phai loi: ', error)
    }
}

const deleteAWatchFilmCtrl = async  (req, res, next)=>{
     
    
    try {
        const object =  req.body
        const idFilm = object.idPhim
        const idUser = object.idKhachHang
        const idEp = object.idTap

        let watchfilm = new WatchFilms()

        watchfilm.setIdUser = idUser
        watchfilm.setIdFilm = idFilm
        watchfilm.setIdEp = idEp 
      

        const userHis = await watchfilm.deleteWatchFilm()
         
        res.send(userHis)
    } catch (error) {
        console.log('Gap phai loi: ', error)
    }
}

const deleteuserWatchHistoryCtrl  = async  (req, res, next)=>{
    const params = req.params.id
    let watchfilm = new WatchFilms()
    
    try {
         
        watchfilm.setIdUser = params
          
      

        const userHis = await watchfilm.deleteuserWatchHistory()
         
        res.send(userHis)
    } catch (error) {
        console.log('Gap phai loi: ', error)
    }
}

module.exports = {
    addNewWatchFilmCtrl,
    getUserWatchHistoryCtrl,
    deleteAWatchFilmCtrl,
    deleteuserWatchHistoryCtrl
}