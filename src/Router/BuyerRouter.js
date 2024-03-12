const express = require('express');
const buyerController = require('../Controller/BuyerController');
const router = express.Router();

router.post('/createbuyer', buyerController.createBuyer);
router.get('/listbuyers', buyerController.listBuyers);
router.put('/updatebuyer', buyerController.updateBuyer);
router.put('/changeBuyerPassword', buyerController.changeBuyerPassword);
router.put('/disableBuyer', buyerController.disableBuyer);
router.put('/enableBuyer', buyerController.enableBuyer);

module.exports = router;
