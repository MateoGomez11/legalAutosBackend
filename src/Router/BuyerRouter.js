const express = require('express');
const buyerController = require('../Controller/BuyerController');
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware');

//rutas publicas
router.post('/loginBuyer', buyerController.loginBuyer);
router.post('/createbuyer', buyerController.createBuyer);

//rutas privadas
router.get('/listbuyers', verifyToken, buyerController.listBuyers);
router.put('/updatebuyer/:personId', verifyToken, buyerController.updateBuyer);
router.put('/changebuyerpassword/:personId/:personPassword', verifyToken, buyerController.changeBuyerPassword);
router.put('/disablebuyer/:personId', verifyToken, buyerController.disableBuyer);
router.put('/enablebuyer/:personId', verifyToken, buyerController.enableBuyer);
router.put('/addFundsbuyer/:personId/:personPassword', verifyToken, buyerController.addFundsBuyer);
router.get('/getBuyer/:personId', verifyToken, buyerController.getBuyer);

module.exports = router;