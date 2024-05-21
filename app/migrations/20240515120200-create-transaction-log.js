'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TransactionLogs', {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Portfolios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      share_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Shares',
          key: 'share_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      transaction_type: {
        type: Sequelize.ENUM('BUY', 'SELL')
      },
      transaction_quantity: {
        type: Sequelize.INTEGER
      },
      transaction_price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      transaction_timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TransactionLogs');
  }
};
