const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const TransactionLog = sequelize.define('TransactionLog', {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        portfolio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        share_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transaction_type: {
            type: DataTypes.ENUM('BUY', 'SELL')
        },
        transaction_quantity: {
            type: DataTypes.INTEGER
        },
        transaction_price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        transaction_timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'TransactionLog',
    });

    return TransactionLog
}
