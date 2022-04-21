const bus = require('../Controller/bus')
const express = require('express');
const router = express.Router();

router.get('/',bus.getBus);
router.get('/:id',bus.getBusById);
router.post('/',bus.creatBus);
router.put('/:id',bus.updateBus);
router.delete('/:id',bus.deleteBus);

module.exports=router;