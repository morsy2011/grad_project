const city = require('../controller/city');
const express= require('express');
const router=express.Router();
router.get('/',city.getCity);
router.get('/:id',city.getCityById);
router.post('/',city.creatCity);
router.put('/:id',city.editCity);
router.delete('/:id',city.deleteCity);
module.exports=router;

