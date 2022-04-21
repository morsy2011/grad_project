const express = require('express');
const router = express.Router();
const hotelController = require('../controller/hotelController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/getHotels', hotelController.showAllHotels);
router.get('/getHotelById/:id',hotelController.getHotelById);
router.get('/city/:cityId',hotelController.getHotelByCityId);
router.post('/addHotel', hotelController.addHotel);
router.put('/editHotel/:id', auth, hotelController.editHotel);
router.delete('/deleteHotel/:id', [auth, admin], hotelController.deleteHotel);

module.exports = router;