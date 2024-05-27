const express = require('express');
const publicationController = require('../Controller/PublicationController');
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware');

router.post('/createPublication',verifyToken, publicationController.createPublication);

router.get('/listPublications', verifyToken, publicationController.listPublication);

router.put('/updatePublication/:publicationId', verifyToken, publicationController.updatePublication);

router.put('/disablePublication/:publicationId', verifyToken, publicationController.disablePublication);

router.put('/enablePublication/:publicationId', verifyToken, publicationController.enablePublication);

router.get('/getPublication/:publicationId', verifyToken, publicationController.getPublication);


module.exports = router;