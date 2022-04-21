const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/getClubs', clubController.showAllClubs);
router.get('/getClubById/:id',clubController.getClubById);
router.get('/city/:cityId',clubController.getClubByCityId);
router.post('/addClub', clubController.addClub);
router.put('/editClub/:id', auth, clubController.editClub);
router.delete('/deleteClub/:id', [auth, admin], clubController.deleteClub);

module.exports = router;