const { NotFoundError } = require("../helper/customError");
const { jwtVerify } = require("../helper/jwt");

const verifyToken = async  (req,res,next) => {

    try {
        const header = req.headers['authorization']
        if (!header) next(new NotFoundError('header-authorization'))
        const token = header.split(' ')[1]
        if (!token) throw new SyntaxError("Token missing or malformed")
        const userVerified = await jwtVerify(token);
        if (!userVerified) throw new Error("Invalid Token")
        next()
    } catch (error) {
        next(error)
    }
} 



module.exports= {verifyToken}

