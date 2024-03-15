const express = require('express');
const publicationController = require('../Controller/PublicationController');
const router = express.Router();

router.post('/createPublication', publicationController.createPublication);
router.get('/listPublication', publicationController.listPublication);
router.put('/updatePublication', publicationController.updatePublication);
router.get('/disablePublication', publicationController.disablePublication);
router.put('/enablePublication', publicationController.enablePublication);
module.exports = router;