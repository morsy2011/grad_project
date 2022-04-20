const passport = require('passport');
const express = require('express');
const router = express.Router();
const userController = require('../../controller/auth/userController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const passportConfig = require('../../config/passport');

router.post('/', userController.sinUp);
router.post('/oauth/google',
  passport.authenticate('googleToken', {session: false}), userController.googleAuth);
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

module.exports = router;