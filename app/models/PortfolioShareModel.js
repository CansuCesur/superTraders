const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const PortfolioShare = sequelize.define('PortfolioShare', {

    portfolio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    share_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true
  });

  PortfolioShare.associate = (models) => {
    PortfolioShare.belongsTo(models.Share, {
      foreignKey: 'share_id'
    });
    PortfolioShare.belongsTo(models.Portfolio, {
      foreignKey: 'portfolio_id'
    });
  };

  return PortfolioShare;
};