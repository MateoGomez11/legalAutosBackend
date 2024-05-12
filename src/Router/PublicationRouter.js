const express = require('express');
const publicationController = require('../Controller/PublicationController');
const router = express.Router();

router.post('/createPublication', publicationController.createPublication);
router.get('/listPublications', publicationController.listPublication);
router.put('/updatePublication/:publicationId', publicationController.updatePublication);
router.put('/disablePublication/:publicationId', publicationController.disablePublication);
router.put('/enablePublication/:publicationId', publicationController.enablePublication);
router.get('/getPublication/:publicationId', publicationController.getPublication);
module.exports = router;