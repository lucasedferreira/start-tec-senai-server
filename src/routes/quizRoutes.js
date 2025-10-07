const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { body } = require('express-validator');

/**
 * @route   POST /quiz/start
 * @desc    Start a new quiz session
 * @access  Public
 */
router.post(
    '/start',
    [
        body('student_name')
            .trim()
            .notEmpty()
            .withMessage('Nome do estudante é obrigatório')
            .isLength({ min: 2, max: 100 })
            .withMessage('Nome deve ter entre 2 e 100 caracteres'),
        body('device_type')
            .optional()
            .isIn(['mobile', 'desktop', 'tablet'])
            .withMessage('Tipo de dispositivo inválido'),
    ],
    quizController.startQuiz
);

/**
 * @route   POST /quiz/response
 * @desc    Record user response(s)
 * @access  Public
 */
router.post(
    '/response',
    [
        body('session_id')
            .notEmpty()
            .withMessage('ID da sessão é obrigatório')
            .isUUID()
            .withMessage('ID da sessão deve ser um UUID válido'),
        body('responses')
            .notEmpty()
            .withMessage('Respostas são obrigatórias'),
    ],
    quizController.recordResponse
);

/**
 * @route   POST /quiz/finish
 * @desc    Finish quiz session
 * @access  Public
 */
router.post(
    '/finish',
    [
        body('session_id')
            .notEmpty()
            .withMessage('ID da sessão é obrigatório')
            .isUUID()
            .withMessage('ID da sessão deve ser um UUID válido'),
        body('scores')
            .notEmpty()
            .withMessage('Pontuações são obrigatórias')
            .isObject()
            .withMessage('Pontuações devem ser um objeto'),
        body('avatar_id')
            .optional()
            .isInt()
            .withMessage('ID do avatar deve ser um número inteiro'),
    ],
    quizController.finishQuiz
);

module.exports = router;
