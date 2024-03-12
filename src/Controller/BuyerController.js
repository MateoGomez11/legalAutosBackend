require('express');
const person = require('../Model/Person');

//create buyer
async function createBuyer(req, res) {
    try {
        await person.create({
            buyerId: req.body.personID,
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
