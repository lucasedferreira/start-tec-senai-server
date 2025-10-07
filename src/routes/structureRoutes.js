const express = require('express');
const router = express.Router();
const structureController = require('../controllers/structureController');

/**
 * @route   GET /structure
 * @desc    Get all question blocks with questions and answer options
 * @access  Public
 */
router.get('/', structureController.getQuestionBlocks);

/**
 * @route   GET /structure/avatars
 * @desc    Get all avatars
 * @access  Public
 */
router.get('/avatars', structureController.getAllAvatars);

module.exports = router;
