const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const logging = require('./middleware/logger');
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');
const logger = require('./config/logger')
const port = process.env.PORT ||5000;

mongoose.connect('mongodb+srv://admin:project123@cluster0.mqiiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => logger.error('Error connected to MongoDB..',err));

app.use(express.json());
app.use(helmet());
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);

if (app.get('env') === 'development') {
  app.use(logging);
  app.use(morgan('tiny'));
}

app.listen(port, ()=> console.log(`Listening on port ${port}`));