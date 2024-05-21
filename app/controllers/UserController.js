const UserService = require('../services/UserService')

const getAll = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAll
};
