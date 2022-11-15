const visitorRouter = require('./visitorRouter')
const filmRouter = require('./filmRouter')
const profileRouter = require('./profileRouter')

function route(app) {
    app.use('/apis/',visitorRouter)   
    app.use('/apis/film/',filmRouter)
    app.use('/apis/profile/',profileRouter)
}

module.exports = route