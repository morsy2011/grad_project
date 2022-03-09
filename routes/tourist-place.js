const express = require('express');
const router = express.Router();
const touristController = require('../controller/touristController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/add_tourist_place', auth, touristController.addTourist);
router.put('/edit_tourist_place/:id', auth, touristController.editTourist);
router.delete('/delete_tourist_place/:id', [auth, admin], touristController.deleteTourist);
router.get('/show_all_tourist_places', touristController.showAllTourists);

module.exports = router;