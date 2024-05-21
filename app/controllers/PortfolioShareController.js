const PortfolioShareService = require('../services/PortfolioShareService')

const getAll = async (req, res) => {
    try {
        const portfolioShares = await PortfolioShareService.getAll();
        res.status(200).send(portfolioShares);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getPortfolioSharesWithDetails = async (req, res) => {
    try {
        const portfolioShares = await PortfolioShareService.getPortfolioSharesWithDetails();
        res.status(200).send(portfolioShares);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAll, getPortfolioSharesWithDetails
};
