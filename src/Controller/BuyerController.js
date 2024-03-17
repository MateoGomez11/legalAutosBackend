require('express');
const person = require('../Model/Person');


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
            personType: 'Buyer'
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
                personType: 'Buyer'
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
async function updateBuyer(req, res) {
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
                personType: 'Buyer'
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


async function changeBuyerPassword(req, res) {
    try {
        await person.update({
            where: {
                personType: 'Buyer'
            },
            personPassword: req.body.personPassword
        }, {
            where: {
                personId: req.params.personId,
                personPassword: req.params.personPassword
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

async function disableBuyer(req, res) {
    try {
        await person.destroy({
            where: {
                personId: req.params.personId,
                personType: 'Buyer'
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
                personId: req.params.personId,
                personType: 'Buyer'
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
