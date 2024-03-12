require('express');
const publication = require('../Model/Publication');
const vehicle = require('../Model/Vehicle');

async function createPublication(req, res) {
    try {
        await publication.create({
            publicationId: req.body.publicationId,
            seller: req.body.seller,
            publicationDate: req.body.publicationDate,
            state: req.body.state,
            price: req.body.price
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
}


module.exports = {
    createPublication
}