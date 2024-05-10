require('express');
const membership = require('../Model/Membership');
const person = require('../Model/Person');
const moment = require('moment');
async function createMembership(req, res) {
    try {
        const seller = await person.findOne({
            where: {
                personId: req.params.personId,
                personType: 'Seller'
            }
        });

        if (!seller) {
            return res.status(400).json({
                error: "Seller not found"
            });
        }

        const findMembership = await membership.findOne({
            where: {
                personId: req.params.personId,
                membershipState: true
            }
        });
        if (findMembership) {
            return res.status(400).json({
                error: "The seller already has an active membership"
            });
        }
        
        const membershipPrice = 60000; 
        if (seller.wallet < membershipPrice) {
            return res.status(400).json({
                error: "Insufficient funds in the seller's wallet"
            });
        }

        const membershipDate = new Date();

        const newMembership = await membership.create({
            membershipState: true,
            membershipDate: membershipDate,
            membershipExpiration: moment().add(1, 'month').toDate(), 
            membershipPrice: membershipPrice,
            personId: req.params.personId
        });

        const newWalletAmount = seller.wallet - membershipPrice;
        await seller.update({
            wallet: newWalletAmount
        });

        return res.status(200).json({
            message: "Membership created successfully",
            data: newMembership
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error.message
        });
    }
}






async function listMemberships(req, res) {
    try{
        await membership.findAll({
            attributes: [
            'membershipState',
            'membershipDate',
            'membershipExpiration',
            'membershipPrice',
            'personId'
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
    createMembership,
    listMemberships
}