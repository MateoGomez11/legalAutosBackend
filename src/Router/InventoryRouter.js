const express = require('express');
const inventoryController = require('../Controller/InventoryController');
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware');

router.post('/createVehicle', verifyToken, inventoryController.createVehicle);
router.get('/listVehicles', verifyToken,inventoryController.listVehicles);
router.get('/getVehicle/:vehicleId', verifyToken,inventoryController.getVehicle);

router.put('/updateVehicle/:vehicleId', verifyToken,inventoryController.updateVehicle);
router.put('/disableVehicle/:vehicleId', verifyToken,inventoryController.disableVehicle);
router.put('/enableVehicle/:vehicleId', verifyToken,inventoryController.enableVehicle);

router.get('/listvehiclesbyseller/:personId', verifyToken,inventoryController.listVehiclesBySeller);
router.get('/listsellerbyvehicle/:vehicleId', verifyToken,inventoryController.listSellerByVehicle);

router.post('/filterVehicles', verifyToken,inventoryController.filterVehicles);

module.exports = router;