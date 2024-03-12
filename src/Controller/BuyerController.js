require('express');
const person = require('../Model/Person');

//create buyer
async function createBuyer(req, res) {
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
            personType: 'buyer'
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

async function listBuyers(req, res) {
    try {
        await person.findAll({
            where: {
                personType: 'buyer' 
            },
            attributes: [
                'personId',
                'personName',
                'personLastName',
                'personAge',
                'personEmail',
                'personAddress',
                'cityId'
            ],
            order: [
                ['personName', 'ASC'] 
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
        console.error(e);
        res.status(500).send('Error en el servidor');
    }
}

// corregir desde aqui
async function updateBuyer(req, res) {
    try {
        await person.update({
            buyerName: req.body.buyerName,
            buyerLastName: req.body.buyerLastName,
            buyerAge: req.body.buyerAge,
            buyerEmail: req.body.buyerEmail,
            buyerAddress: req.body.buyerAddress,
            cityId: req.body.cityId
        }, {
            where: { buyerId: req.params.personId }
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

async function changeBuyerPassword(req, res) {
    try {
        await person.update({
            buyerPassword: req.body.buyerPassword
        }, {
            where: {
                buyerId: req.params.personId,
                buyerPassword: reqparams.buyerPassword
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

async function disableBuyer(req, res) {
    try {
        await person.destroy({
            where: {
                buyerId: req.params.personId
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

async function enableBuyer(req, res) {
    try {
        await person.restore({
            where: {
                buyerId: req.params.personId
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

module.exports = {
    createBuyer,
    listBuyers,
    updateBuyer,
    changeBuyerPassword,
    disableBuyer,
    enableBuyer
}
