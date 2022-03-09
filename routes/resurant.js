const rest = require('../controller/resturant');
const express= require('express');
const router=express.Router();
router.get('/',rest.getRest);
router.get('/:id',rest.getRestById);
router.post('/',rest.postRest);
router.put('/:id',rest.putRest);
router.delete('/:id',rest.deleteRest);
module.exports=router;