const express = require('express');
const router = express.Router();
const courseController = require('../Controller/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, courseController.createCourse);
router.put('/:id', auth, courseController.updateCourse);
router.delete('/:id', [auth, admin], courseController.deleteCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

module.exports = router;

