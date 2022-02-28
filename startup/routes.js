const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logging = require('../middleware/logger');
const courses = require('../routes/course');
const users = require('../routes/user');
const auth = require('../routes/auth');

module.exports = function(app){
  app.use(express.json());
  app.use(helmet());
  app.use('/api/courses', courses);
  app.use('/api/register', users);
  app.use('/api/login', auth);

  if (app.get('env') === 'development') {
    app.use(logging);
    app.use(morgan('tiny'));
  }
}