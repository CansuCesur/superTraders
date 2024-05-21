const existenceCheck = require('../utils/ExistenceCheckUtil')
const validator = require('validator')

const validateTransactionRequest = async (req, res, next) => {
    const { userId, shareId, quantity } = req.body;
    //parameters validation check
    if (userId === undefined || userId === null || shareId === undefined || shareId === null || quantity === undefined || quantity === null) {
        return res.status(400).json({ error: 'Parameter is missing or undefined.' });
    }
    if (!validator.isInt(String(userId))) {
        return res.status(400).json({ error: 'Invalid userId. Must be integer' });
    }
    if (!validator.isInt(String(shareId))) {
        return res.status(400).json({ error: 'Invalid shareId. Must be integer' });
    }
    if (!validator.isInt(String(quantity))) {
        return res.status(400).json({ error: 'Invalid quantity. Must be integer' });
    }

    try {
        //existence check 
        await existenceCheck.checkUserExistence(userId);
        const share = await existenceCheck.checkShareExistence(shareId);
        const portfolio = await existenceCheck.checkPortfolioExistence(userId);
        // transfer to next step
        if (req.path === '/buy') {
            req.portfolioId = portfolio.portfolio_id;
            req.shareLatestPrice = share.latest_price;
        } else if (req.path === '/sell') {
            const portfolioShare = await existenceCheck.checkPortfolioShareExistence(portfolio.portfolio_id, shareId);
            req.portfolioId = portfolio.portfolio_id;
            req.portfolioShare = portfolioShare;
            req.shareLatestPrice = share.latest_price;
        }
        next();
    } catch (error) {
        if (error.message === 'User Not Found') {
            return res.status(404).json({ error: 'User Not Found' });
        } else if (error.message === 'Share Not Found') {
            return res.status(404).json({ error: 'Share Not Found' });
        } else if (error.message === 'Portfolio Not Found') {
            return res.status(404).json({ error: 'Portfolio Not Found' });
        } else if (error.message === 'This share not found in the portfolio') {
            return res.status(404).json({ error: 'This share not found in the portfolio' });
        } else {
            //For errors that occur except these controlled situations
            return res.status(500).json({ error: error.message });
        }
    }
};

module.exports = {
    validateTransactionRequest
}