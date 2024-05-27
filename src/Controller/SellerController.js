require('express');
const bcrypt = require('bcrypt');
const person = require('../Model/Person');
const jwt = require('jsonwebtoken');
const { jwtPassword } = require('../config/config');



//create seller
async function createSeller(req, res) {
    try {
        const hashPassword = await bcrypt.hash(req.body.personPassword, 10)
        await person.create({
            personId: req.body.personId,
            personName: req.body.personName,
            personLastName: req.body.personLastName,
            personAge: req.body.personAge,
            personEmail: req.body.personEmail,
            personAddress: req.body.personAddress,
            personPassword: hashPassword,
            cityId: req.body.cityId,
            wallet: req.body.wallet,
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

// Login Seller
async function loginSeller(req, res) {

    try {
        const sellerData = await person.findOne({ where: { personId: req.body.personId } })

        if (!sellerData)
            return res.status(401).json({ message: 'user not found' })

        const validPassword = await bcrypt.compare(req.body.personPassword, sellerData.personPassword)
        if (!validPassword)
            return res.status(401).json({ message: 'invalid password' })

        const token = jwt.sign(
            { personId: sellerData.personId, personType: sellerData.personType },
            jwtPassword,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ message: token })

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
async function updateSeller(req, res) {
    try {
        const updated = await person.update({
            personName: req.body.personName,
            personLastName: req.body.personLastName,
            personAge: req.body.personAge,
            personEmail: req.body.personEmail,
            personAddress: req.body.personAddress,
            cityId: req.body.cityId,
            wallet: req.body.wallet

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
async function addFundsSeller(req, res) {
    try {
        const seller = await person.findOne({
            where: {
                personId: req.params.personId,
                personPassword: req.params.personPassword,
                personType: 'Seller'
            }
        });

        if (!seller) {
            return res.status(400).json({
                error: "Seller not found"
            });
        }

        const currentWallet = seller.wallet;
        const fundsToAdd = parseFloat(req.body.wallet);
        const newWalletAmount = currentWallet + fundsToAdd;

        await seller.update({
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
    createSeller,
    listSellers,
    updateSeller,
    changeSellerPassword,
    disableSeller,
    enableSeller,
    addFundsSeller,
    loginSeller
}
