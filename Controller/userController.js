const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');

exports.sinUp =  async (req, res, next) =>{
  const { error } = validateUser(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email}).exec();
  if(user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  next();
};

exports.showUsers = async (req, res, next) => {
  const user = await User.find().sort('name').select('-password');
  res.send(user);
  next();
};

