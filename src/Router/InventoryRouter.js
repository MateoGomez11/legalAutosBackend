const express = require('express');
const inventoryController = require('../Controller/InventoryController');
const router = express.Router();

router.post('/createVehicle', inventoryController.createVehicle);
router.get('/listVehicles', inventoryController.listVehicles);
router.put('/updateVehicle/:vehicleId', inventoryController.updateVehicle);
router.put('/disableVehicle/:vehicleId', inventoryController.disableVehicle);
module.exports = router;