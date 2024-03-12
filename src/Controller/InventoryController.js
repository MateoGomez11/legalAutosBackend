require('express');
const vehicle = require('../Model/Vehicle');

//create buyer
async function createVehicle(req, res) {
    try {
        await vehicle.create({
            vehiclePlate: req.body.vehiclePlate,
            vehicleBrand: req.body.vehicleBrand,
            vehicleLine: req.body.vehicleLine,
            vehicleType: req.body.vehicleType,
            vehicleYear: req.body.vehicleYear,
            vehicleTrasmision: req.body.vehicleTrasmision,
            vehicleCC: req.body.vehicleCC,
            vehicleColor: req.body.vehicleColor,
            vehicleSoat: req.body.vehicleSoat,
            vehicleTecno: req.body.vehicleTecno,
            vehicleState: req.body.vehicleState,
            vehicleDescription: req.body.vehicleDescription,
            vehicleBuyPrice: req.body.vehicleBuyPrice,
            vehicleSellPrice: req.body.vehicleSellPrice,
            buyDate: new Date(req.body.buyDate),
            sellDate: new Date(req.body.sellDate),
            cityId: req.body.cityId,
            personId: req.body.personId,
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    }
    catch (e) {
        console.log(e);
    }
}

async function listVehicles(req, res) {
    try {
        await vehicle.findAll({
            attributes: [
                'vehiclePlate',
                'vehicleBrand',
                'vehicleLine',
                'vehicleYear',
                'vehicleTrasmision',
                'vehicleBuyPrice'
            ],
            order: ['vehiclePlate']
        })
            .then(function (data) {
                return res.status(200).json({
                    data: data
                });
            }).catch(error => {
                return res.status(400).json({
                    error: error
                });
            })
    }
    catch (e) {
        console.log(e);
    }
}


module.exports = {
    createVehicle,
    listVehicles
}