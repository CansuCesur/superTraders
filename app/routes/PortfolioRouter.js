const express = require('express')
const router = express.Router()
const PortfolioController = require('../controllers/PortfolioController')

router.get('/getAll', PortfolioController.getAll);

module.exports = router;