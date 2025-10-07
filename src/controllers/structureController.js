const { QuestionBlock, Question, AnswerOption, Avatar } = require('../models');

/**
 * Get all question blocks with their questions and answer options
 * GET /structure
 */
exports.getQuestionBlocks = async (req, res) => {
    try {
        const blocks = await QuestionBlock.findAll({
            where: {
                is_active: true,
            },
            include: [{
                model: Question,
                as: 'questions',
                where: {
                    is_active: true,
                },
                required: false,
                include: [{
                    model: AnswerOption,
                    as: 'answerOptions',
                    attributes: ['id', 'text', 'weight_pcp', 'weight_ds', 'weight_ma', 'order'],
                }],
            }],
            order: [
                ['order', 'ASC'],
                [{ model: Question, as: 'questions' }, 'order', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: AnswerOption, as: 'answerOptions' }, 'order', 'ASC'],
            ],
        });

        res.status(200).json({
            success: true,
            data: blocks,
        });
    } catch (error) {
        console.error('Error fetching question blocks:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar blocos de questões',
            error: error.message,
        });
    }
};

/**
 * Get all avatars
 * GET /structure/avatars
 */
exports.getAllAvatars = async (req, res) => {
    try {
        const avatars = await Avatar.findAll({
            attributes: ['id', 'name', 'description', 'type', 'related_courses'],
            order: [
                ['type', 'ASC'],
                ['name', 'ASC'],
            ],
        });

        res.status(200).json({
            success: true,
            data: avatars,
        });
    } catch (error) {
        console.error('Error fetching all avatars:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar avatares',
            error: error.message,
        });
    }
};
