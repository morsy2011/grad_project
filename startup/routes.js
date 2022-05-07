const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logging = require('../middleware/logger');
const users = require('../routes/auth/user');
const auth = require('../routes/auth/auth');
const resetPassword = require('../routes/auth/resetPassword');
const courses = require('../routes/course');
const clubs = require('../routes/club');
const hotels = require('../routes/hotel');
const touristPlaces = require('../routes/tourist-place')
const city = require("../routes/city");
const restaurant = require('../routes/restaurant');
const cafe = require('../routes/cafe');
const train=require('../routes/train');
const bus=require('../routes/bus');
const like = require('../routes/like');
const wishlist= require('../routes/wishlist');
const home = require('../routes/home');

module.exports = function(app){
  app.use(express.json());
  app.use(helmet());
  app.use('/api/courses', courses);
  app.use('/api/users', users);
  app.use('/api/user/register', users);
  app.use('/api/user/login', auth);
  app.use("/api", resetPassword);
  app.use("/api/city",city);
  app.use('/api/clubs', clubs);
  app.use('/api/hotels', hotels);
  app.use('/api/touristPlaces', touristPlaces);
  app.use("/api/restaurant",restaurant);
  app.use("/api/train",train);
  app.use("/api/bus",bus);
  app.use('/api/cafe',cafe);
  app.use("/api/likes", like);
  app.use("/api/user",wishlist);
  app.use("/api/home",home);

  if (app.get('env') === 'development') {
    app.use(logging);
    app.use(morgan('tiny'));
  }
}