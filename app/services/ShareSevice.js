const Share = require('../models').Share

class ShareService {
    
    static async getShareById(shareId) {
        try {
            const share = await Share.findByPk(shareId);
            return share;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async getAll() {
        try {
            const shares = await Share.findAll();
            return shares;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ShareService;