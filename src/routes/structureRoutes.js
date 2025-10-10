const express = require('express');
const router = express.Router();
const structureController = require('../controllers/structureController');

/**
 * ============================================
 * BLOCOS DE QUESTÕES
 * ============================================
 */

/**
 * @route   GET /structure
 * @desc    Get all question blocks with questions and answer options
 * @access  Public
 */
router.get('/', structureController.getQuestionBlocks);

/**
 * @route   POST /structure/blocks
 * @desc    Create a new question block
 * @access  Admin
 */
router.post('/blocks', structureController.createQuestionBlock);

/**
 * @route   PUT /structure/blocks/:id
 * @desc    Update a question block
 * @access  Admin
 */
router.put('/blocks/:id', structureController.updateQuestionBlock);

/**
 * @route   DELETE /structure/blocks/:id
 * @desc    Delete a question block
 * @access  Admin
 */
router.delete('/blocks/:id', structureController.deleteQuestionBlock);


/**
 * ============================================
 * QUESTÕES
 * ============================================
 */

/**
 * @route   POST /structure/questions
 * @desc    Create a new question in a block
 * @access  Admin
 */
router.post('/questions', structureController.createQuestion);

/**
 * @route   PUT /structure/questions/:id
 * @desc    Update a question
 * @access  Admin
 */
router.put('/questions/:id', structureController.updateQuestion);

/**
 * @route   DELETE /structure/questions/:id
 * @desc    Delete a question
 * @access  Admin
 */
router.delete('/questions/:id', structureController.deleteQuestion);


/**
 * ============================================
 * ALTERNATIVAS
 * ============================================
 */

/**
 * @route   POST /structure/answers
 * @desc    Create a new answer option
 * @access  Admin
 */
router.post('/answers', structureController.createAnswerOption);

/**
 * @route   PUT /structure/answers/:id
 * @desc    Update an answer option
 * @access  Admin
 */
router.put('/answers/:id', structureController.updateAnswerOption);

/**
 * @route   DELETE /structure/answers/:id
 * @desc    Delete an answer option
 * @access  Admin
 */
router.delete('/answers/:id', structureController.deleteAnswerOption);


/**
 * ============================================
 * AVATARES
 * ============================================
 */

/**
 * @route   GET /structure/avatars
 * @desc    Get all avatars
 * @access  Public
 */
router.get('/avatars', structureController.getAllAvatars);

module.exports = router;
