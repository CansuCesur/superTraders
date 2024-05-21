module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userData = [
      {
        username: 'Cansu Cesur Köse',
        email: 'cansucesur96@gmail.com',
        password: 'passwordcansu',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Seray Güderel',
        email: 'serayguderel@gmail.com',
        password: 'passwordseray',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Selcan Çepni',
        email: 'selcancepni@gmail.com',
        password: 'passwordselcan',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Buse Evren',
        email: 'buseevren@gmail.com',
        password: 'passwordbuse',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Ebru Eryılmaz',
        email: 'ebrueryılmaz@hotmail.com',
        password: 'passwordebru',
        phone: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const insertedUsers = await queryInterface.bulkInsert('Users', userData, { returning: true });

    const shares = [
      {
        symbol: 'EXM',
        latest_price: 100.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        symbol: 'CCK',
        latest_price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        symbol: 'ABC',
        latest_price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        symbol: 'DEF',
        latest_price: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    const insertedShares = await queryInterface.bulkInsert('Shares', shares, { returning: true });

    const portfolios = insertedUsers.map(user => ({
      user_id: user.user_id,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    const insertedPortfolios = await queryInterface.bulkInsert('Portfolios', portfolios, { returning: true });

    const portfolioShares = [];
    const transactionLogs = [];

    insertedPortfolios.forEach(portfolio => {
      insertedShares.forEach(share => {
        const quantity = Math.floor(Math.random() * 100) + 1;
        portfolioShares.push({
          portfolio_id: portfolio.portfolio_id,
          share_id: share.share_id,
          quantity: quantity,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        transactionLogs.push({
          portfolio_id: portfolio.portfolio_id,
          share_id: share.share_id,
          transaction_type: 'BUY',
          transaction_quantity: quantity,
          transaction_price: share.latest_price,
          transaction_timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });
    await queryInterface.bulkInsert('PortfolioShares', portfolioShares);
    await queryInterface.bulkInsert('TransactionLog', transactionLogs,);
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TransactionLog', null);
    await queryInterface.bulkDelete('PortfolioShares', null);
    await queryInterface.bulkDelete('Portfolios', null);
    await queryInterface.bulkDelete('Shares', null);
    await queryInterface.bulkDelete('Users', null);

  }
};