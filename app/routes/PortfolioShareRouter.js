const express = require('express')
const router = express.Router()
const PortfolioShareController = require('../controllers/PortfolioShareController')

router.get('/getAll', PortfolioShareController.getAll);
router.get('/getPortfolioSharesWithDetails', PortfolioShareController.getPortfolioSharesWithDetails);

module.exports = router;