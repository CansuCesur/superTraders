const User = require('../models').User

class UserService {

    static async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
    static async getAll() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UserService;