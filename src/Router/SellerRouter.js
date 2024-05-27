const express = require('express');
const sellerController = require('../Controller/SellerController');
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware');

// Rutas publicas
router.post('/loginSeller', sellerController.loginSeller);
router.post('/createseller', sellerController.createSeller);

// Rutas privadas
router.get('/listsellers', verifyToken, sellerController.listSellers);
router.put('/updateseller/:personId/:personPassword', verifyToken, sellerController.updateSeller);
router.put('/changesellerpassword/:personId/:personPassword', verifyToken, sellerController.changeSellerPassword);
router.put('/disableseller/:personId', verifyToken, sellerController.disableSeller);
router.put('/enableseller/:personId', verifyToken, sellerController.enableSeller);
router.put('/addFundsSeller/:personId/:personPassword', verifyToken, sellerController.addFundsSeller);

module.exports = router;