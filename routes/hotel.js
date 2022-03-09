const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/add_hotel', auth, hotelController.addHotel);
router.put('/edit_hotel/:id', auth, hotelController.editHotel);
router.delete('/delete_hotel/:id', [auth, admin], hotelController.deleteHotel);
router.get('/show_all_hotels', hotelController.showAllHotels);

module.exports = router;