const PortfolioService = require('../services/PortfolioService')

const getAll = async (req, res) => {
    try {
        const portfolios = await PortfolioService.getAll();
        res.status(200).send(portfolios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAll
};
