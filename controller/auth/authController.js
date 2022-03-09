const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, validateAuth } = require('../../models/user/user');

exports.login = async (req, res, next) => {
  const { error } = validateAuth(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Invalid email or password.')

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
  next();
};
