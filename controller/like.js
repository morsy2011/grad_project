const express = require('express');
const mongoose = require('mongoose');
const { Like } = require('../models/likes');

exports.addLike = async (req, res, next) => {

  let like = new Like({
    userId: req.params.userId,
    like: req.params.likeId
  })
  
  await like.save();
  res.send(like);
  next();
};

exports.getLikes = async (req, res, next) => {
  let like = await Like.find({userId : req.params.userId})
  .populate('city', 'name -_id')
  .populate('restaurant', 'name -_id')
  .populate('cafe', 'name -_id')
  .select('-userId -__v');

  res.send(like);
  next();
};

exports.deleteLike = async (req, res, next) => {
  let like = await Like.findByIdAndRemove(req.params.id);
  if (!like) return res.status(404).send('this item is not found');
  res.send('Done');
  next();
}