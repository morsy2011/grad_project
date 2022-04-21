const express = require('express');
const router = express.Router();
const touristController = require('../controller/touristController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/getTouristPlaces', touristController.showAllTourists);
router.get('/getTouristPlaceById/:id',touristController.getTouristById);
router.get('/city/:cityId',touristController.getTouristByCityId);
router.post('/addTouristPlace', touristController.addTourist);
router.put('/editTouristPlace/:id', auth, touristController.editTourist);
router.delete('/deleteTouristPlace/:id', [auth, admin], touristController.deleteTourist);

module.exports = router;