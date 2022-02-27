const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.post('/', userController.sinUp);
router.get('/', userController.showUsers);

module.exports = router;