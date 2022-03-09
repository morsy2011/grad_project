const express = require('express');
const router = express.Router();
const resetPassword = require('../../controller/auth/passwordReset');

router.post('/forgot_password', resetPassword.forgotPassword);
router.post('/:userId/:token', resetPassword.resetPassword);

module.exports = router;
