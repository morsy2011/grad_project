const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const like = require('../controller/like');

router.post('/add_like/:userId/:likeId', auth, like.addLike);
router.get('/getLikes/:userId', auth, like.getLikes);
router.delete('/deleteLike/:id', auth, like.deleteLike);

module.exports = router;
