const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/add_course', auth, courseController.createCourse);
router.put('/edit_course', auth, courseController.updateCourse);
router.delete('/delete_course', auth, courseController.deleteCourse);
router.get('/show_all_courses',[auth, admin], courseController.getAllCourses);
router.get('/show_user_course', auth, courseController.getUserCourse);

module.exports = router;

