const cafe = require('../controller/cafe')
const express = require('express');
const router = express.Router();

router.get('/',cafe.getCafe);
router.get('/:id',cafe.getCafeById);
router.post('/',cafe.creatCafe);
router.put('/:id',cafe.updateCafe);
router.delete('/:id',cafe.deletCafe);

module.exports=router;