const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const userRouter = require('./userRouter')
const actorRouter = require('./actorRouter')
const commentRouter = require('./commentRouter')
const watchFIlmRouter  = require('./watchFilmRouter')


function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/user/',userRouter)
    app.use('/apis/actor/',actorRouter)
    app.use('/apis/comment/',commentRouter)
    app.use('/apis/watchfilm/',watchFIlmRouter)
}

module.exports = route