require('express');
const person = require('../Model/Person');

//create seller
async function createSeller(req, res) {
    try {
        await person.create({
            personId: req.body.personId,
            personName: req.body.personName,
            personLastName: req.body.personLastName,
            personAge: req.body.personAge,
            personEmail: req.body.personEmail,
            personAddress: req.body.personAddress,
            personPassword: req.body.personPassword,
            cityId: req.body.cityId,
            personType: 'Seller'
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

async function listSellers(req, res) {
    try {
        await person.findAll({
            where: {
                personType: 'Seller'
            },
            attributes: [
                'personId',
                'personName',
                'personLastName',
                'personAge',
                'personEmail',
                'personAddress',
                'cityId'
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

// corregir desde aqui
async function updateSeller(req, res) {
    try {
        const updated = await person.update({
            personName: req.body.personName,
            personLastName: req.body.personLastName,
            personAge: req.body.personAge,
            personEmail: req.body.personEmail,
            personAddress: req.body.personAddress,
            cityId: req.body.cityId
        }, {
            where: {
                personId: req.params.personId,
                personPassword: req.params.personPassword,
                personType: 'Seller'
            }
        });

        if (updated[0] === 0) {
            return res.status(400).json({
                error: "ID or password incorrect"
            });
        } else {
            return res.status(200).json({
                message: 'Updated successfully',
                data: updated
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


async function changeSellerPassword(req, res) {
    try {
        await person.update({
            personPassword: req.body.personPassword
        }, {
            where: {
                personId: req.params.personId,
                personPassword: req.params.personPassword,
                personType: 'Seller'
            }
        }).then(function (data) {
            return res.status(200).json({
                message: 'Password changed',
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

async function disableSeller(req, res) {
    try {
        await person.destroy({
            where: {
                personId: req.params.personId,
                personType: 'Seller'
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

async function enableSeller(req, res) {
    try {
        await person.restore({
            where: {
                personId: req.params.personId,
                personType: 'Seller'
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

async function listSellerByVehicle(req, res){
    try {
        const vehicleId = req.params.vehicleId;

        // Consulta para encontrar todos los vendedores asociados con el vehículo por su ID
        const sellers = await person.findAll({
            where: {
                vehicleId: vehicleId
            },
            attributes: [
                'personId',
                'personName',
                // Agrega otras columnas que desees devolver
            ]
        });

        return res.status(200).json({
            data: sellers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}



module.exports = {
    createSeller,
    listSellers,
    updateSeller,
    changeSellerPassword,
    disableSeller,
    enableSeller,
    listSellerByVehicle
}
