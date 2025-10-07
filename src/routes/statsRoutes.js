const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

/**
 * @route   GET /stats/global
 * @desc    Get global statistics
 * @access  Public
 */
router.get('/global', statsController.getGlobalStats);

/**
 * @route   GET /stats/avatars
 * @desc    Get avatar distribution statistics
 * @access  Public
 */
router.get('/avatars', statsController.getAvatarStats);

/**
 * @route   GET /stats/courses
 * @desc    Get dominant course distribution statistics
 * @access  Public
 */
router.get('/courses', statsController.getCourseStats);

module.exports = router;
