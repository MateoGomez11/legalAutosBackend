require('express');
const publication = require('../Model/Publication');

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
}//Finaliza la function

async function listPublication(req, res) {
    try {
        await publication.findAll({
            attributes: [
                'publicationId',
                'seller',
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
            publicationId: req.body.publicationId,
            seller: req.body.seller,
            publicationDate: req.body.publicationDate,
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