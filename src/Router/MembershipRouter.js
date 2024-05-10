const express = require('express');
const membershipController = require('../Controller/MembershipController');
const router = express.Router();

router.post('/createMembership/:personId', membershipController.createMembership);
router.get('/listMemberships', membershipController.listMemberships);
module.exports = router;