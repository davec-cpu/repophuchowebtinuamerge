const express = require('express')
const router = express.Router()
const watchfilmController = require('../controllers/watchFilmController')

router.post('/add', watchfilmController.addNewWatchFilmCtrl)
router.get('/get/:id', watchfilmController.getUserWatchHistoryCtrl)
router.post('/singledelete', watchfilmController.deleteAWatchFilmCtrl)
router.get('/deletehistory/:id', watchfilmController.deleteuserWatchHistoryCtrl)



module.exports = router