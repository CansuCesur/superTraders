const TransactionEnum = require('../enums/TransactionEnum')
const Share = require('../models').Share
const User = require('../models').User
const PortfolioShare = require('../models').PortfolioShare
const Portfolio = require('../models').Portfolio

class PortfolioShareService {

    static async getPortfolioShareByIds(portfolioId, shareId) {
        try {
            const portfolioShare = await PortfolioShare.findOne({
                where: {
                    portfolio_id: portfolioId,
                    share_id: shareId
                }
            });
            return portfolioShare;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getAll() {
        try {
            const portfolioShares = await PortfolioShare.findAll();
            return portfolioShares;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getPortfolioSharesWithDetails() {
        try {
            //get related attributes from associated tables
            const portfolioShares = await PortfolioShare.findAll({
                include: [{
                    model: Share,
                    attributes: ['symbol']
                }, {
                    model: Portfolio,
                    include: [{
                        model: User,
                        attributes: ['username']
                    }]
                }]
            });
            return portfolioShares.map(item => ({
                username: item.Portfolio.User.username,
                share_symbol: item.Share.symbol,
                quantity: item.quantity,
            }));
        } catch (error) {
            throw new Error(error);
        }
    }

    static async create(shareId, portfolioId, quantity) {
        try {
            const newPortfolioShare = await PortfolioShare.create({
                share_id: shareId,
                portfolio_id: portfolioId,
                quantity: quantity,
            });
            return newPortfolioShare;
        } catch (error) {
            throw new Error(error)
        }
    }
    static async delete(portfolioShare) {
        try {
            await portfolioShare.destroy(portfolioShare);
        } catch (error) {
            throw new Error(error)
        }
    }

    static async updateQuantity(portfolioShare, quantity, transactionType) {
        try {
            if (transactionType === TransactionEnum.BUY) {
                portfolioShare.quantity += quantity
            }
            else if (transactionType === TransactionEnum.SELL) {
                portfolioShare.quantity -= quantity
                if (portfolioShare.quantity < 0) {
                    throw new Error('You cannot make this sale, you do not have this quantity of this share.');
                }
                if (portfolioShare.quantity == 0) {
                     //There is no longer any connection between this portfolio and this share.
                    this.delete(portfolioShare)
                }
            }
            await portfolioShare.save();
        }
        catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = PortfolioShareService;