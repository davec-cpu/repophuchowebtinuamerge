const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const { verifyToken } = require('../middleware/authentication')

 
var app = express()
var bodyParser = require('body-parser')
var urlencoded = app.use(bodyParser.urlencoded({extended: false}))
var jsonparser = app.use(bodyParser.json())

router.post('/add',  commentController.addNewComment)
router.get('/getallofone/:id',commentController.getAllCommentsofOneFilm)
router.post('/updateacomt',commentController.updateCom)
router.post('/deleteacomt',commentController.deleteCommtCtrl)

module.exports = router