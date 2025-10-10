// controllers/structureController.js
const { QuestionBlock, Question, AnswerOption, Avatar } = require('../models');

/* ============================================================================
 * BLOCO DE QUESTÕES
 * ============================================================================
 */

/**
 * GET /structure/blocks
 * Retorna todos os blocos de questões com suas perguntas e alternativas
 */
exports.getQuestionBlocks = async (req, res) => {
    try {
        const blocks = await QuestionBlock.findAll({
            where: { is_active: true },
            include: [{
                model: Question,
                as: 'questions',
                where: { is_active: true },
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

        res.status(200).json({ success: true, data: blocks });
    } catch (error) {
        console.error('Error fetching question blocks:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar blocos de questões', error: error.message });
    }
};

/**
 * POST /structure/blocks
 * Cria um novo bloco de questões
 */
exports.createQuestionBlock = async (req, res) => {
    try {
        const { title, order, is_active = true } = req.body;

        const block = await QuestionBlock.create({ title, order, is_active });

        res.status(201).json({ success: true, data: block });
    } catch (error) {
        console.error('Error creating question block:', error);
        res.status(500).json({ success: false, message: 'Erro ao criar bloco de questões', error: error.message });
    }
};

/**
 * PUT /structure/blocks/:id
 * Atualiza um bloco de questões
 */
exports.updateQuestionBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, order, is_active } = req.body;

        const block = await QuestionBlock.findByPk(id);
        if (!block) return res.status(404).json({ success: false, message: 'Bloco não encontrado' });

        await block.update({ title, order, is_active });
        res.status(200).json({ success: true, data: block });
    } catch (error) {
        console.error('Error updating question block:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar bloco', error: error.message });
    }
};

/**
 * DELETE /structure/blocks/:id
 * Exclui um bloco de questões (soft delete opcional)
 */
exports.deleteQuestionBlock = async (req, res) => {
    try {
        const { id } = req.params;

        const block = await QuestionBlock.findByPk(id);
        if (!block) return res.status(404).json({ success: false, message: 'Bloco não encontrado' });

        await block.destroy();
        res.status(200).json({ success: true, message: 'Bloco excluído com sucesso' });
    } catch (error) {
        console.error('Error deleting question block:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir bloco', error: error.message });
    }
};

/* ============================================================================
 * QUESTÕES
 * ============================================================================
 */

/**
 * POST /structure/questions
 * Cria uma nova questão dentro de um bloco
 */
exports.createQuestion = async (req, res) => {
    try {
        const { block_id, text, order, is_active = true } = req.body;

        const block = await QuestionBlock.findByPk(block_id);
        if (!block) return res.status(404).json({ success: false, message: 'Bloco não encontrado' });

        const question = await Question.create({ block_id, text, order, is_active });

        res.status(201).json({ success: true, data: question });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ success: false, message: 'Erro ao criar questão', error: error.message });
    }
};

/**
 * PUT /structure/questions/:id
 * Atualiza uma questão
 */
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, order, is_active } = req.body;

        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ success: false, message: 'Questão não encontrada' });

        await question.update({ text, order, is_active });
        res.status(200).json({ success: true, data: question });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar questão', error: error.message });
    }
};

/**
 * DELETE /structure/questions/:id
 * Exclui uma questão
 */
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ success: false, message: 'Questão não encontrada' });

        await question.destroy();
        res.status(200).json({ success: true, message: 'Questão excluída com sucesso' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir questão', error: error.message });
    }
};

/* ============================================================================
 * ALTERNATIVAS
 * ============================================================================
 */

/**
 * POST /structure/answers
 * Cria uma nova alternativa
 */
exports.createAnswerOption = async (req, res) => {
    try {
        const { question_id, text, weight_pcp, weight_ds, weight_ma, order } = req.body;

        const question = await Question.findByPk(question_id);
        if (!question) return res.status(404).json({ success: false, message: 'Questão não encontrada' });

        const option = await AnswerOption.create({
            question_id,
            text,
            weight_pcp,
            weight_ds,
            weight_ma,
            order,
        });

        res.status(201).json({ success: true, data: option });
    } catch (error) {
        console.error('Error creating answer option:', error);
        res.status(500).json({ success: false, message: 'Erro ao criar alternativa', error: error.message });
    }
};

/**
 * PUT /structure/answers/:id
 * Atualiza uma alternativa
 */
exports.updateAnswerOption = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, weight_pcp, weight_ds, weight_ma, order } = req.body;

        const option = await AnswerOption.findByPk(id);
        if (!option) return res.status(404).json({ success: false, message: 'Alternativa não encontrada' });

        await option.update({ text, weight_pcp, weight_ds, weight_ma, order });
        res.status(200).json({ success: true, data: option });
    } catch (error) {
        console.error('Error updating answer option:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar alternativa', error: error.message });
    }
};

/**
 * DELETE /structure/answers/:id
 * Exclui uma alternativa
 */
exports.deleteAnswerOption = async (req, res) => {
    try {
        const { id } = req.params;

        const option = await AnswerOption.findByPk(id);
        if (!option) return res.status(404).json({ success: false, message: 'Alternativa não encontrada' });

        await option.destroy();
        res.status(200).json({ success: true, message: 'Alternativa excluída com sucesso' });
    } catch (error) {
        console.error('Error deleting answer option:', error);
        res.status(500).json({ success: false, message: 'Erro ao excluir alternativa', error: error.message });
    }
};

/* ============================================================================
 * AVATARES
 * ============================================================================
 */

/**
 * GET /structure/avatars
 * Retorna todos os avatares
 */
exports.getAllAvatars = async (req, res) => {
    try {
        const avatars = await Avatar.findAll({
            attributes: ['id', 'name', 'description', 'message', 'type', 'related_courses'],
            order: [['type', 'ASC'], ['name', 'ASC']],
        });

        res.status(200).json({ success: true, data: avatars });
    } catch (error) {
        console.error('Error fetching all avatars:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar avatares', error: error.message });
    }
};
