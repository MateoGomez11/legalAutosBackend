require('./dataBase/sync.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 1338;
const cors = require('cors');
const bodyParser = require('body-parser');

// routers 
const buyerRouter = require ('./Router/BuyerRouter');
const sellerRouter = require ('./Router/SellerRouter');
const publicationRouter = require('./Router/PublicationRouter.js');
const inventoryRouter = require('./Router/InventoryRouter.js');
const membershipRouter = require('./Router/MembershipRouter.js');
const cityRouter = require('./Router/cityRouter.js');
const departmentRouter = require('./Router/departmentRouter.js');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors({
  origin: 'http://localhost:3000'
}));


app.use(cors({
    origin: 'http://localhost:3000'
  }));
  
app.listen(port, ()=> {
    console.log("The application is running on port: " + port);
});

// api
app.use('/api', buyerRouter);
app.use('/api', sellerRouter);
app.use('/api', inventoryRouter);
app.use('/api', publicationRouter);
app.use('/api', membershipRouter);
app.use('/api', cityRouter);
app.use('/api', departmentRouter);