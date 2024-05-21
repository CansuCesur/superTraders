const TransactionLog = require('../models').TransactionLog

class TransactionLogService {

  static async create(portfolioId, shareId, transactionType, transactionQuantity, transactionPrice) {
    try {
      const newTransaction = await TransactionLog.create({
        portfolio_id: portfolioId,
        share_id: shareId,
        transaction_type: transactionType,
        transaction_quantity: transactionQuantity,
        transaction_price: transactionPrice
      });
      return newTransaction
    } catch (error) {
      throw new Error(error)
    }
  }
  static async getAll() {
    try {
      const transactionLogs = await TransactionLog.findAll();
      return transactionLogs;
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = TransactionLogService;