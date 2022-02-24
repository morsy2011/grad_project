const Joi = require('joi');
const {Course, validate} = require('../models/course');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.post('/', auth, async (req, res) =>{

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = new Course( {
        name: req.body.name,
        price: req.body.price

    });
    await course.save();
    res.send(course);
});

router.put('/:id', async (req, res) =>{

  const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const course = await Course.findByIdAndUpdate(req.params.id, {name: req.body.name, new: true});
    if (!course) return res.status(404).send('The course with the given ID is not found');
    res.send(course);

});

router.delete('/:id', [auth, admin], async (req, res) =>{

    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) return res.status(404).send('The course with the given ID is not found');

    res.send(course);
});

router.get('/', async (req, res) => {
  const course = await Course.find().sort('name');
    res.send(course);
    });

router.get('/:id', async (req, res) =>{
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('The course with the given ID is not found');
    res.send(course);
});


module.exports = router;