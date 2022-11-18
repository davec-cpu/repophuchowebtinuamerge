const User = require("../models/User");


const getAllUser = async (req,res,next) => {
    try {
        let user = new User()
        const usersInfo = await user.getAllUserInfo()
        res.send(usersInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const getUserInfo = async (req,res,next) => {
    const params = req.params
    try {
        let user = new User()
        const idUser = params.id
        user.setId = idUser
        const userInfo = await user.getUserInfo()
        res.send(userInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateUserInfo = async (req,res,next) => {
    const idUser = req.params.id
    const info = req.body
    try {
        let user = new User();
        user.setId = idUser
        user.setAddress = info.address
        user.setBirthday = info.birthday 
        user.setEmail = info.email 
        user.setFullname = info.fullname  
        user.setSex = info.sex
        await user.updateUserInfo()
        const data = await user.getUserInfo()
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



module.exports = {
    getUserInfo,
    updateUserInfo
}