const Actor = require("../models/Actor")
const Film = require("../models/Film")
const Comments = require("../models/Comments")
var moment = require('moment');

const addNewComment =  (req,res,next) => {

    const object =  req.body
    const idPhim = object.idPhim
    const idKhachHang = object.idKhachHang
    const binhLuan = object.binhLuan
    const ngayDangBinhLuan = object.ngayDangBinhLuan

     
    var CurrentDate = moment().format('YYYY-MM-DD h:mm:ss')
    console.log('Gio hien tai: ', CurrentDate)

   // let actor = new Actor()
   // const idFilm = 4
   // actor.setName = "Camila Mendes"  
  //  const kq = await actor.getIdByName()

    let comment = new Comments()
    comment.setIdUser = idKhachHang
    comment.setIdFilm = idPhim
    comment.setContent = binhLuan 
    comment.setPostDate = CurrentDate

    var str = 'id phim: ' + idPhim +', id khach hang: ' + idKhachHang
    + ', binh luan: '+binhLuan+', ngay dang: '+CurrentDate

    let add = comment.addNewComment()
    res.send(add)

    //res.send(str)
}

const getAllCommentsofOneFilm = async  (req, res, next)=>{
    const params = req.params
    let comments = new Comments()
    
    try {
        const idFilm = params.id
        comments.setIdFilm = idFilm
       // res.send(idFilm)
        const listofComs = await comments.getAllComOfOneFilm()
        console.log('ngay dang: ', listofComs)
        res.send(listofComs)
    } catch (error) {
        console.log('Gap phai loi: ', error)
    }
}

const updateCom = async (req, res, next) => {
    const object =  req.body

    const idPhim = object.idPhim
    const idKhachHang = object.idKhachHang
    const binhLuan = object.binhLuan
    const ngayDangBinhLuan = object.ngayDangBinhLuan

    var str = 'id phim: ' + idPhim +', id khach hang: ' + idKhachHang
    + ', binh luan: '+binhLuan

    console.log(str)

    let comment = new Comments()
    comment.setIdUser = idKhachHang
    comment.setIdFilm = idPhim
    comment.setContent = binhLuan 
    comment.setPostDate = ngayDangBinhLuan

    try {
        result = await comment.updateComment()
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}

const deleteCommtCtrl = async (req, res, next) => {
    const object =  req.body

    const idPhim = object.idPhim
    const idKhachHang = object.idKhachHang

    var str = 'id phim: ' + idPhim +', id khach hang: ' + idKhachHang
    

    console.log(str)

    let comment = new Comments()
    comment.setIdUser = idKhachHang
    comment.setIdFilm = idPhim
     

    try {
        result = await comment.deleteCommt()
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    addNewComment,
    getAllCommentsofOneFilm,
    updateCom,
    deleteCommtCtrl
}