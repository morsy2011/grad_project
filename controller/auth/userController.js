const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');  
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../../models/user/user');

exports.sinUp =  async (req, res, next) =>{
  const { error } = validateUser(req.body);
  if(error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  });

  let user = await User.findOne({ "local.email": req.body.email}).exec();
  if(user) return res.status(400).send('User already registered.');

  user = new User({
    methods: 'local',
    local: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  });
  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(user.local.password, salt);
  user.local.password = hashPassword;
  await user.save();

  const token = user.generateAuthToken();
  user.local.token = token;
  await user.save();
  userBack = {
    "id": user.id,
    "name": user.local.name,
    "email": user.local.email,
    "token": user.local.token
  }
  res.status(200).header('x-auth-token', token).json({
    "message": "Registration done successfully",
    "data": userBack
  });
  
  next();
};

exports.googleAuth = async (req, res, next) => {
  const user = await User.findOne(req.params.user)
  console.log('user', user);
  const token = user.generateAuthToken();
  user.google.token = token;
  await user.save();
  userBack = {
    "id": user.id,
    "name": user.google.name,
    "email": user.google.email,
    "token": user.google.token
  }
  res.status(200).header('x-auth-token', token).json({
    "message": "SignIn with google done successfully",
    "data": userBack
  });
  next();
}



