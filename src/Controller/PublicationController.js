require('express');
const publication = require('../Model/Publication');
const Vehicle = require('../Model/Vehicle');


async function createPublication(req, res) {
    try {
        const findVehicle = await Vehicle.findOne({
            where: { 
                vehicleId: req.body.vehicleId,
                vehicleState: 'avaliable'
            }
        });
        if(!findVehicle) {
            return res.status(400).json({
                message: 'Vehicle is not available for publication'
            });
        }

        const existingPublication = await publication.findOne({
            where: { 
                vehicleId: req.body.vehicleId
            }
        });
        if (existingPublication) {
            return res.status(400).json({
                message: 'El vehículo ya tiene una publicación asociada.'
            });
        }

        await publication.create({
            personId : req.body.personId,
            vehicleId: req.body.vehicleId,
            publicationDate: req.body.publicationDate,
            state: req.body.state,
            price: req.body.price
        }).then(function (data) {
            return res.status(200).json({
                data: data,
                message: 'Correctly created publication'
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })    
    } catch (e) {
        console.log(e);
    }
}

async function listPublication(req, res) {
    try {
        await publication.findAll({
            attributes: [
                'publicationId',
                'personId',
                'publicationDate',
                'state',
                'price'
            ],
            order: ['publicationId']
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
             
    } catch (e) {
        console.log(e);
    }
}//Finaliza function

async function updatePublication(req, res) {
    try {
        await publication.update({
            state: req.body.state,
            price: req.body.price
            
        }, {
            where: {publicationId: req.params.publicationId}
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    } catch (e) {
        console.log(e);
    }
}//Finaliza function

async function disablePublication(req, res) {
    try {
        await publication.destroy({
           where: {publicationId: req.params.publicationId}
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    } catch (e) {
        console.log(e);
    }
}//Finaliza function

async function enablePublication(req, res) {
    try {
        await publication.restore({
            where: {publicationId: req.params.publicationId}
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    } catch (e) {
        console.log(e);
    }
}//Finaliza function

module.exports = {
    createPublication,
    listPublication,
    updatePublication,
    disablePublication,
    enablePublication
}