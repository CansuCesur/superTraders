const express = require('express')
const router = express.Router()
const ShareController = require('../controllers/ShareController')

router.get('/getAll', ShareController.getAll);

module.exports = router;