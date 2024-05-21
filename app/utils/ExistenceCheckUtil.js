const UserService = require('../services/UserService')
const PortfolioService = require('../services/PortfolioService')
const PortfolioShareService = require('../services/PortfolioShareService')
const ShareService = require('../services/ShareSevice')

const checkUserExistence = async (userId) => {
    const user = await UserService.getUserById(userId);
    if (!user || user == null) {
        throw new Error('User Not Found');
    }
    return user;
};

const checkShareExistence = async (shareId) => {
    const share = await ShareService.getShareById(shareId);
    if (!share || share == null) {
        throw new Error('Share Not Found');
    }
    return share;
};

const checkPortfolioExistence = async (userId) => {
    const portfolio = await PortfolioService.getPortfolioByUserId(userId);
    if (!portfolio || portfolio == null) {
        throw new Error('Portfolio Not Found');
    }
    return portfolio;
};

const checkPortfolioShareExistence = async (portfolioId, shareId) => {
    const portfolioShare = await PortfolioShareService.getPortfolioShareByIds(portfolioId, shareId)
    if (!portfolioShare || portfolioShare == null) {
        throw new Error('This share not found in the portfolio');
    }
    return portfolioShare;
};

module.exports = {
    checkUserExistence,
    checkShareExistence,
    checkPortfolioExistence,
    checkPortfolioShareExistence
};