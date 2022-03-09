const Joi = require("joi");
const { Course, validate } = require("../models/course");
const _ = require('lodash');
const express = require("express");
const mongoose = require("mongoose");

exports.createCourse = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({
    name: req.body.name,
    price: req.body.price,
    auth: req.header('x-auth-token')
  });
  await course.save();
  res.send(_.pick(course, ['_id', 'name', 'price']));
  next();
};

exports.updateCourse = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = await Course
  .findOneAndUpdate({auth: req.header('x-auth-token')}, {
    name: req.body.name,
    price: req.body.price,
    new: true,
  })
  .select('-auth');

  if (!course)
    return res.status(404).send("This course is not found");
  res.send(course);
  next();
};

exports.deleteCourse = async (req, res, next) => {
  const course = await Course
  .findOneAndRemove({auth: req.header('x-auth-token')})
  .select('-auth');

  if (!course)
    return res.status(404).send("This course is not found");
  res.send(course);
  next();
};

exports.getUserCourse = async (req, res, next) => {
  const course = await Course
  .find({auth: req.header('x-auth-token')})
  .sort("name")
  .select('-auth');

  if (!course)
    return res.status(404).send("This course is not found");
  res.send(course);
  next();
};

exports.getAllCourses = async (req, res, next) => {
  const courses = await Course
  .find()
  .sort('name')
  .select('-auth');
  res.send(courses);
  next();
};
