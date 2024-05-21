const Portfolio = require('../models').Portfolio

class PortfolioService {

    static async getPortfolioByUserId(userId) {
        try {
            const portfolio = await Portfolio.findByPk(userId);
            return portfolio;
        } catch (error) {
            throw new Error(error);
        }
    }
    static async getAll() {
        try {
            const portfolios = await Portfolio.findAll();
            return portfolios;
        } catch (error) {
            throw new Error(error)
        }
    }
}


module.exports = PortfolioService;