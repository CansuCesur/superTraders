const express = require('express')
const bodyParser = require('body-parser')
const transactionRouter = require('./app/routes/TransactionRouter')
const shareRouter = require('./app/routes/ShareRouter')
const portfolioShareRouter = require('./app/routes/PortfolioShareRouter')
const userRouter = require('./app/routes/UserRouter')
const portfolioRouter = require('./app/routes/PortfolioRouter')
const seedUsers = require('./seed')

const app = express();
const PORT = 3000;

server = app.listen(PORT, () => {
  console.log("Server started");
});

//routing
app.use('/api/transaction', transactionRouter)
app.use('/api/share', shareRouter)
app.use('/api/portfolioShare', portfolioShareRouter)
app.use('/api/user', userRouter)
app.use('/api/portfolio', portfolioRouter)

//db connection with sequalize
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Connected to the database");
    //seeding process
    const queryInterface = db.sequelize.getQueryInterface();
    return seedUsers.up(queryInterface, db.sequelize);
  })
  .then(() => {
    console.log("Seeding process completed");
  })
  .catch((err) => {
    console.error("An error occurred", err);
  });