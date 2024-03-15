require('./dataBase/sync.js');
const connection = require('./dataBase/connection');
const express = require('express');
const inventoryRouter = require('./Router/InventoryRouter.js');

const app = express();
const port = process.env.PORT || 1338;

// routers 
const buyerRouter = require('./Router/BuyerRouter');
const publicationRouter = require('./Router/PublicationRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen(port, ()=> {
    console.log("The application is running on port: " + port);
});

// api
app.use('/api', buyerRouter);
app.use('/api', inventoryRouter);
app.use('/api', publicationRouter);