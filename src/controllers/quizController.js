const { QuizSession, UserResponse, Avatar, AnswerOption } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Start a new quiz session
 * POST /quiz/start
 */
exports.startQuiz = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { student_name, device_type } = req.body;

        const quizSession = await QuizSession.create({
            student_name,
            device_type: device_type || 'desktop',
            started_at: new Date(),
        });

        res.status(201).json({
            success: true,
            data: {
                session_id: quizSession.id,
                student_name: quizSession.student_name,
                started_at: quizSession.started_at,
            },
        });
    } catch (error) {
        console.error('Error starting quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao iniciar o quiz',
            error: error.message,
        });
    }
};

/**
 * Record user response(s) to question(s)
 * POST /quiz/response
 */
exports.recordResponse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { session_id, responses } = req.body;

        // Verify session exists
        const session = await QuizSession.findByPk(session_id);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Sessão não encontrada',
            });
        }

        // Check if session is already finished
        if (session.finished_at) {
            return res.status(400).json({
                success: false,
                message: 'Esta sessão já foi finalizada',
            });
        }

        // Handle single response or array of responses
        const responsesArray = Array.isArray(responses) ? responses : [responses];

        const createdResponses = [];

        for (const response of responsesArray) {
            const { question_id, answer_option_id } = response;

            // Verify answer option exists
            const answerOption = await AnswerOption.findByPk(answer_option_id);
            if (!answerOption) {
                return res.status(404).json({
                    success: false,
                    message: `Opção de resposta ${answer_option_id} não encontrada`,
                });
            }

            // Create or update response (using upsert to handle duplicates)
            const [userResponse, created] = await UserResponse.upsert({
                quiz_session_id: session_id,
                question_id,
                answer_option_id,
            }, {
                returning: true,
            });

            createdResponses.push({
                id: userResponse.id,
                question_id: userResponse.question_id,
                answer_option_id: userResponse.answer_option_id,
                created: created,
            });
        }

        res.status(201).json({
            success: true,
            data: createdResponses,
        });
    } catch (error) {
        console.error('Error recording response:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao registrar resposta',
            error: error.message,
        });
    }
};

/**
 * Finish quiz session and save final scores and avatar
 * POST /quiz/finish
 */
exports.finishQuiz = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { session_id, scores, avatar_id } = req.body;

        // Verify session exists
        const session = await QuizSession.findByPk(session_id);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Sessão não encontrada',
            });
        }

        // Check if already finished
        if (session.finished_at) {
            return res.status(400).json({
                success: false,
                message: 'Esta sessão já foi finalizada',
            });
        }

        // Verify avatar exists
        if (avatar_id) {
            const avatar = await Avatar.findByPk(avatar_id);
            if (!avatar) {
                return res.status(404).json({
                    success: false,
                    message: 'Avatar não encontrado',
                });
            }
        }

        // Calculate duration
        const finishedAt = new Date();
        const durationSeconds = Math.floor((finishedAt - session.started_at) / 1000);

        // Update session
        await session.update({
            finished_at: finishedAt,
            scores,
            avatar_id,
            duration_seconds: durationSeconds,
        });

        // Fetch complete session data
        const updatedSession = await QuizSession.findByPk(session_id, {
            include: [{
                model: Avatar,
                as: 'avatar',
            }],
        });

        res.status(200).json({
            success: true,
            data: {
                session_id: updatedSession.id,
                student_name: updatedSession.student_name,
                started_at: updatedSession.started_at,
                finished_at: updatedSession.finished_at,
                duration_seconds: updatedSession.duration_seconds,
                scores: updatedSession.scores,
                avatar: updatedSession.avatar,
            },
        });
    } catch (error) {
        console.error('Error finishing quiz:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao finalizar o quiz',
            error: error.message,
        });
    }
};
