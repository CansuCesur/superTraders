const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Portfolio = sequelize.define('Portfolio', {
        portfolio_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        timestamps: true
    });

    Portfolio.associate = (models) => {
        Portfolio.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            }
        });
        Portfolio.belongsToMany(models.Share, {
            through: "PortfolioShare",
            foreignKey: 'portfolio_id',
            autoIncrement: true
        });
    };

    return Portfolio
};