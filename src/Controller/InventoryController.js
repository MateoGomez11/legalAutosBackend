require('express');
const vehicle = require('../Model/Vehicle');
const { Sequelize, Op } = require('sequelize');

//enable vehicle
async function enableVehicle(req, res) {
    try {
        await vehicle.restore({
            where: { vehicleId: req.params.vehicleId }
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
            personId: req.body.personId
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
}//crear vehiculos

async function listVehicles(req, res) {
    try {
        await vehicle.findAll({
            attributes: [
                'vehicleId',
                'vehiclePlate', //
                'vehicleBrand',
                'vehicleLine',
                'vehicleYear',
                'vehicleTrasmision',
                'vehicleBuyPrice',
                'vehicleSellPrice',
                'vehicleState',
                'cityId',
                'personId',
                [Sequelize.literal(`to_char("buyDate", 'YYYY-MM-DD')`), 'buyDate'],
                [Sequelize.literal(`to_char("sellDate", 'YYYY-MM-DD')`), 'sellDate'],
                'vehicleCC',
                'vehicleColor',
                'vehicleSoat',
                'vehicleTecno',
                'vehicleDescription',
                'vehicleType',

            ],
            order: ['vehiclePlate'],

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
}//listar vehiculos

async function getVehicle(req, res) {
    try {
        await vehicle.findOne({
            where: { vehicleId: req.params.vehicleId },
            attributes: [
                'vehicleId',
                'vehiclePlate', 
                'vehicleBrand',
                'vehicleLine',
                'vehicleYear',
                'vehicleTrasmision',
                'vehicleBuyPrice',
                'vehicleSellPrice',
                'vehicleState',
                'cityId',
                'personId',
                [Sequelize.literal(`to_char("buyDate", 'YYYY-MM-DD')`), 'buyDate'],
                [Sequelize.literal(`to_char("sellDate", 'YYYY-MM-DD')`), 'sellDate'],
                'vehicleCC',
                'vehicleColor',
                'vehicleSoat',
                'vehicleTecno',
                'vehicleDescription',
                'vehicleType'
            ]
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        });
    } catch (e) {
        console.log(e);
    }
}//getVehicle

async function updateVehicle(req, res) {
    try {
        await vehicle.update({
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
            personId: req.body.personId
        }, {
            where: {
                vehicleId: req.params.vehicleId
            }
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
}//actualizar vehiculo

async function disableVehicle(req, res) {
    try {
        await vehicle.destroy({
            where: {
                vehicleId: req.params.vehicleId
            }
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
async function listVehiclesBySeller(req, res) {
    try {
        await vehicle.findAll({
            where: {
                personId: req.params.personId
            },
            attributes: [
                'vehicleId'
            ]
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        });
    } catch (e) {
        console.log(e);
    }
}
async function listSellerByVehicle(req, res) {
    try {
        await vehicle.findAll({
            where: {
                vehicleId: req.params.vehicleId
            },
            attributes: [
                'personId',
            ]
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        });
    } catch (e) {
        console.log(e);
    }
}

async function filterVehicles(req, res) {
    try {
        const { brand, line, type, year, trasmision, CC, color } = req.body;
        const whereClause = {};
        if (brand) {
            whereClause.vehicleBrand = { [Op.iLike]: `%${brand}%` };
        }
        if (line) {
            whereClause.vehicleLine = { [Op.iLike]: `%${line}%` };
        }
        if (type) {
            whereClause.vehicleType = { [Op.iLike]: `%${type}%` };
        }
        if (year) {
            whereClause.vehicleYear = year;
        }
        if (trasmision) {
            whereClause.vehicleTrasmision = trasmision;
        }
        if (CC) {
            whereClause.vehicleCC = CC;
        }
        if (color) {
            whereClause.vehicleColor = color;
        }

        // Realizar la consulta utilizando las condiciones de búsqueda dinámicas
        const vehicles = await vehicle.findAll({
            where: whereClause,
            attributes: [
                'vehiclePlate',
                'vehicleBrand',
                'vehicleLine',
                'vehicleYear',
                'vehicleTrasmision',
                'vehicleBuyPrice',
                'vehicleState',
                //--------------


            ]
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        });
    } catch (e) {
        console.log(e);
    }
}




module.exports = {
    createVehicle,
    listVehicles,
    enableVehicle,
    updateVehicle,
    disableVehicle,
    listVehiclesBySeller,
    listSellerByVehicle,
    filterVehicles,
    getVehicle,
}