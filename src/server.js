require('./dataBase/sync.js');
const connection = require('./dataBase/connection');
const express = require('express');

const app = express();
const port = process.env.PORT || 1338;

// routers 
const buyerRouter = require ('./Router/BuyerRouter');
const sellerRouter = require ('./Router/SellerRouter');
const publicationRouter = require('./Router/PublicationRouter.js');
const inventoryRouter = require('./Router/InventoryRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(port, ()=> {
    console.log("The application is running on port: " + port);
});

// api
app.use('/api', buyerRouter);
app.use('/api', sellerRouter);
app.use('/api', inventoryRouter);
app.use('/api', publicationRouter);