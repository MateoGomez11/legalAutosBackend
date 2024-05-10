const express = require('express');
const sellerController = require('../Controller/SellerController');
const router = express.Router();

router.post('/createseller', sellerController.createSeller);
router.get('/listsellers', sellerController.listSellers);
router.put('/updateseller/:personId/:personPassword', sellerController.updateSeller);
router.put('/changesellerpassword/:personId/:personPassword', sellerController.changeSellerPassword);
router.put('/disableseller/:personId', sellerController.disableSeller);
router.put('/enableseller/:personId', sellerController.enableSeller);
router.put('/addFundsSeller/:personId/:personPassword', sellerController.addFundsSeller);


module.exports = router;