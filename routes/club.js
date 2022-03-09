const express = require('express');
const router = express.Router();
const clubController = require('../controller/clubController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/add_club', auth, clubController.addClub);
router.put('/edit_club/:id', auth, clubController.editClub);
router.delete('/delete_club/:id', [auth, admin], clubController.deleteClub);
router.get('/show_all_clubs', clubController.showAllClubs);

module.exports = router;