const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const users = require('./routes/users');
const auth = require('./routes/auth');
const logger = require('./config/logger')
const port = process.env.PORT ||5000;

mongoose.connect('mongodb+srv://morsy:morsy2011@cluster0.eaohx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => logger.error('Error connected to MongoDB..',err));

app.use(express.json());
app.use('/api/courses', courses);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.listen(port, ()=> console.log(`Listening on port ${port}`));