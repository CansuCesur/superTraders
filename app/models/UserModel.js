const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: true
    });

    User.associate = (models) => {
        User.hasOne(models.Portfolio, {
            foreignKey: {
                name: 'user_id',
            }
        });
    };

    return User
};
