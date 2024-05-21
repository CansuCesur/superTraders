const PortfolioShareService = require('../services/PortfolioShareService')
const TransactionLogService = require('../services/TransactionLogService')
const TransactionEnum = require('../enums/TransactionEnum')

const buy = async (req, res) => {
    try {
        const { shareId, quantity } = req.body;
        const { portfolioId, shareLatestPrice } = req;
        const portfolioShare = await PortfolioShareService.getPortfolioShareByIds(portfolioId, shareId);
        //If a portfolio has been created but no share buy has been made yet
        if (!portfolioShare) {
            portfolioShare = await PortfolioShareService.create(shareId, portfolioId, quantity, shareLatestPrice);
        } else {
            await PortfolioShareService.updateQuantity(portfolioShare, quantity, TransactionEnum.BUY);
        }
        const transactionLog = await TransactionLogService.create(portfolioId, shareId, TransactionEnum.BUY, quantity, shareLatestPrice);
        res.status(200).send(transactionLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const sell = async (req, res) => {
    try {
        const { shareId, quantity } = req.body;
        const { portfolioId, portfolioShare, shareLatestPrice } = req;
        await PortfolioShareService.updateQuantity(portfolioShare, quantity, TransactionEnum.SELL);
        const transactionLog = await TransactionLogService.create(portfolioId, shareId, TransactionEnum.SELL, quantity, shareLatestPrice);
        res.status(200).send(transactionLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllTransactionLog = async (req, res) => {
    try {
        const transactionLogs = await TransactionLogService.getAll();
        res.status(200).send(transactionLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    buy, sell, getAllTransactionLog
};