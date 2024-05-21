const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Share = sequelize.define('Share', {
        share_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 3], // Symbol length must be 3 characters
                is: /^[A-Z]*$/, // Symbol can only be capital letters
            }
        },
        latest_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
    }, {
        timestamps: true
    });
    Share.associate = (models) => {
        Share.belongsToMany(models.Portfolio, {
            through: "PortfolioShare",
            foreignKey: 'share_id',
        });
    };

    return Share
};