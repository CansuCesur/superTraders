const express = require('express')
const router = express.Router()
const validator = require('../middleware/RequestValidator')
const transactionController = require('../controllers/TransactionController')

router.get('/getAll', transactionController.getAllTransactionLog);
router.post('/buy', validator.validateTransactionRequest, transactionController.buy);
router.post('/sell', validator.validateTransactionRequest, transactionController.sell);

module.exports = router;