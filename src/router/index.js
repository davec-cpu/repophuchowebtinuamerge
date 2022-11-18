const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const userRouter = require('./userRouter')
const actorRouter = require('./actorRouter')

function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/user/',userRouter)
    app.use('/apis/actor/',actorRouter)
}

module.exports = route