const express = require('express');
const inventoryController = require('../Controller/InventoryController');
const router = express.Router();

router.post('/createVehicle', inventoryController.createVehicle);
router.get('/listVehicles', inventoryController.listVehicles);

router.put('/enableVehicle/:vehicleId', inventoryController.enableVehicle);
module.exports = router;