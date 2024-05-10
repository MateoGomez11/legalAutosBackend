const express = require('express');
const citycontroller = require('../Controller/CityController');
const router = express.Router();

router.get('/listcities/:departmentId', citycontroller.listCities);

module.exports = router;