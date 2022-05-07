const express = require('express');
const router = express.Router();
const resetPassword = require('../../controller/auth/resetPassword');

router.post('/verify_code/reset_password', resetPassword.verifyCodeAndResetPass);

module.exports = router;
