const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logging = require('../middleware/logger');
const courses = require('../routes/course');
const clubs = require('../routes/club');
const hotels = require('../routes/hotel');
const touristPlaces = require('../routes/tourist-place')
const users = require('../routes/auth/user');
const auth = require('../routes/auth/auth');
const city = require("../routes/city");
const resturant = require('../routes/resurant');
const cafe = require('../routes/cafe');
const resetPassword = require('../routes/auth/resetPassword');


module.exports = function(app){
  app.use(express.json());
  app.use(helmet());
  app.use('/api/courses', courses);
  app.use('/api/clubs', clubs);
  app.use('/api/hotels', hotels);
  app.use('/api/touristPlaces', touristPlaces);
  app.use('/api/user/register', users);
  app.use('/api/user/login', auth);
  app.use("/api/city",city);
  app.use("/api/resturant",resturant);
  app.use('/api/cafe',cafe);
  app.use("/api", resetPassword);

  if (app.get('env') === 'development') {
    app.use(logging);
    app.use(morgan('tiny'));
  }
}