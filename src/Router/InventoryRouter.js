const express = require('express');
const inventoryController = require('../Controller/InventoryController');
const router = express.Router();

router.post('/createVehicle', inventoryController.createVehicle);
router.get('/listVehicles', inventoryController.listVehicles);
router.put('/updateVehicle/:vehicleId', inventoryController.updateVehicle);
router.put('/disableVehicle/:vehicleId', inventoryController.disableVehicle);
router.put('/enableVehicle/:vehicleId', inventoryController.enableVehicle);
router.get('/listvehiclesbyseller/:personId', inventoryController.listVehiclesBySeller);
router.get('/listsellerbyvehicle/:vehicleId', inventoryController.listSellerByVehicle);
router.post('/filterVehicles', inventoryController.filterVehicles);
router.get('/getVehicle/:vehicleId', inventoryController.getVehicle);

module.exports = router;