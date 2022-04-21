const train = require('../controller/train')
const express = require('express');
const router = express.Router();

router.get('/',train.getTrain);
router.get('/:id',train.getTrainById);
router.post('/',train.creatTrain);
router.put('/:id',train.updateTrain);
router.delete('/:id',train.deleteTrain);

module.exports=router;