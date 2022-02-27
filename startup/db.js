const mongoose = require('mongoose');
const logger = require('../config/logger')

module.exports = function(){
  mongoose.connect('mongodb+srv://admin:project123@cluster0.mqiiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => logger.error('Error connected to MongoDB..',err));
}