const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  email:{
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  password:{
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024
  },
  isAdmin: Boolean,
  
});


userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, 'jwtPrivateKey');
  return token;
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  }); 
  return schema.validate(user);
};

function validateAuth(req){
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  }); 
  return schema.validate(req);
}

exports.validateUser = validateUser;
exports.validateAuth = validateAuth;
exports.User = User; 