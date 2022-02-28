const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', userController.sinUp);
router.get('/', [auth, admin], userController.showUsers);

module.exports = router;