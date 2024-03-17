const express = require('express');
const publicationController = require('../Controller/PublicationController');
const router = express.Router();

router.post('/createPublication', publicationController.createPublication);
router.get('/listPublications', publicationController.listPublication);
router.put('/updatePublication/:publicationId', publicationController.updatePublication);
router.get('/disablePublication/:publicationId', publicationController.disablePublication);
router.put('/enablePublication/:publicationId', publicationController.enablePublication);
module.exports = router;