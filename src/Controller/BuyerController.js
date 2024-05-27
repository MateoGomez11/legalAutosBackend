require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const person = require('../Model/Person');
const { jwtPassword } = require('../config/config');


async function createBuyer(req, res) {
    try {
        const hashPassword = await bcrypt.hash(req.body.personPassword, 10);
        await person.create({
            personId: req.body.personId,
            personName: req.body.personName,
            personLastName: req.body.personLastName,
            personAge: req.body.personAge,
            personEmail: req.body.personEmail,
            personAddress: req.body.personAddress,
            personPassword: hashPassword,
            cityId: req.body.cityId,
            wallet: 0,
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

async function loginBuyer(req, res) {
    try {
        const buyerData = await person.findOne({ where: { personId: req.body.personId } })
        console.log(buyerData)
        if (!buyerData) {
            return res.status(401).json({ message: 'Buyer not found' })
        }

        const validPassword = await bcrypt.compare(req.body.personPassword, buyerData.personPassword)
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        console.log(buyerData)
        const token = jwt.sign(
            {personId : buyerData.personId, personType: buyerData.personType},
            jwtPassword,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ token })
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
                'cityId',
                'wallet'
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

async function getBuyer(req, res) {
    try {
        await person.findOne({
            where: { personId: req.params.personId },
            attributes: [
                'personName',
                'personLastName',
                'personAge',
                'personEmail',
                'personAddress',
                'cityId',
                'wallet'
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
            cityId: req.body.cityId,
            personPassword: req.body.personPassword
        }, {
            where: {
                personId: req.params.personId,

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

async function addFundsBuyer(req, res) {
    try {
        const buyer = await person.findOne({
            where: {
                personId: req.params.personId,
                personPassword: req.params.personPassword,
                personType: 'Buyer'
            }
        });

        if (!buyer) {
            return res.status(400).json({
                error: "Buyer not found"
            });
        }

        const currentWallet = buyer.wallet;
        const fundsToAdd = parseFloat(req.body.wallet);
        const newWalletAmount = currentWallet + fundsToAdd;

        await buyer.update({
            wallet: newWalletAmount
        }).then(function (data) {
            return res.status(200).json({
                wallet: newWalletAmount,
                message: 'Updated successfully'
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
    enableBuyer,
    addFundsBuyer,
    getBuyer,
    loginBuyer
}
