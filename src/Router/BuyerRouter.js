const express = require('express');
const buyerController = require('../Controller/BuyerController');
const router = express.Router();

router.post('/createbuyer', buyerController.createBuyer);
router.get('/listbuyers', buyerController.listBuyers);
router.put('/updatebuyer/:personId/:personPassword', buyerController.updateBuyer);
router.put('/changebuyerpassword/:personId/:personPassword', buyerController.changeBuyerPassword);
router.put('/disablebuyer/:personId', buyerController.disableBuyer);
router.put('/enablebuyer/:personId', buyerController.enableBuyer);
router.put('/addFundsbuyer/:personId/:personPassword', buyerController.addFundsBuyer);
module.exports = router;
