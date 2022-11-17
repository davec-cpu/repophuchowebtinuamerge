const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const userRouter = require('./userRouter')

function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/user/',userRouter)
}

module.exports = route