const ShareService = require('../services/ShareSevice')

const getAll = async (req, res) => {
    try {
        const shares = await ShareService.getAll();
        res.status(200).send(shares);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAll
};
