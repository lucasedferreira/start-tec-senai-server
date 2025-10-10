const { QuizSession, Avatar } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../models').sequelize;

/**
 * Get global statistics (with optional date filters)
 * GET /stats/global?startDate=2025-01-01&endDate=2025-01-31
 */
exports.getGlobalStats = async (req, res) => {
    try {
        // === 0. TRATAMENTO DE FILTROS ===
        const { startDate, endDate } = req.query;

        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.started_at = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        } else if (startDate) {
            dateFilter.started_at = { [Op.gte]: new Date(startDate) };
        } else if (endDate) {
            dateFilter.started_at = { [Op.lte]: new Date(endDate) };
        }

        // === 1. PARTICIPAÇÃO E ENGAJAMENTO ===
        const totalSessions = await QuizSession.count({ where: dateFilter });

        const finishedSessions = await QuizSession.count({
            where: {
                ...dateFilter,
                finished_at: { [Op.ne]: null },
            },
        });

        const avgDurationResult = await QuizSession.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('duration_seconds')), 'avg_duration'],
            ],
            where: {
                ...dateFilter,
                finished_at: { [Op.ne]: null },
                duration_seconds: { [Op.ne]: null },
            },
            raw: true,
        });

        const avgDuration = avgDurationResult?.avg_duration
            ? Math.round(avgDurationResult.avg_duration)
            : 0;

        const completionRate = totalSessions > 0
            ? ((finishedSessions / totalSessions) * 100).toFixed(2)
            : 0;
        const dropoutRate = (100 - completionRate).toFixed(2);

        // === 2. DESEMPENHO E RESULTADOS ===
        const avatarStats = await QuizSession.findAll({
            attributes: [
                'avatar_id',
                [sequelize.fn('COUNT', sequelize.col('QuizSession.id')), 'count'],
            ],
            include: [{
                model: Avatar,
                as: 'avatar',
                attributes: ['id', 'name', 'type', 'related_courses'],
            }],
            where: {
                ...dateFilter,
                finished_at: { [Op.ne]: null },
                avatar_id: { [Op.ne]: null },
            },
            group: ['avatar_id', 'avatar.id'],
            raw: false,
        });

        const totalAvatarSessions = avatarStats.reduce((sum, a) => {
            return sum + parseInt(a.dataValues.count);
        }, 0);

        const avatarDistribution = avatarStats.map(a => ({
            avatar_id: a.avatar.id,
            avatar_name: a.avatar.name,
            avatar_type: a.avatar.type,
            count: parseInt(a.dataValues.count),
            percentage: totalAvatarSessions > 0
                ? ((parseInt(a.dataValues.count) / totalAvatarSessions) * 100).toFixed(2)
                : 0,
        }));

        const topAvatars = [...avatarDistribution]
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        // === 3. COMPORTAMENTO DURANTE O QUIZ ===
        // Tempo médio por bloco de questões
        const blockTimes = await sequelize.query(`
            SELECT 
                qb.id AS block_id,
                qb.title AS block_title,
                ROUND(AVG(qs.duration_seconds), 2) AS avg_duration
            FROM question_blocks qb
            JOIN questions q ON q.block_id = qb.id
            JOIN user_responses ur ON ur.question_id = q.id
            JOIN quiz_sessions qs ON qs.id = ur.quiz_session_id
            WHERE qs.finished_at IS NOT NULL
            ${startDate || endDate ? `
                AND qs.started_at BETWEEN :startDate AND :endDate
            ` : ''}
            GROUP BY qb.id, qb.title
            ORDER BY qb.id;
        `, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
            },
        });

        // Bloco com maior desistência
        const dropoutByBlock = await sequelize.query(`
            SELECT 
                qb.id AS block_id,
                qb.title AS block_title,
                COUNT(DISTINCT qs.id) AS dropout_sessions
            FROM question_blocks qb
            JOIN questions q ON q.block_id = qb.id
            JOIN user_responses ur ON ur.question_id = q.id
            JOIN quiz_sessions qs ON qs.id = ur.quiz_session_id
            WHERE qs.finished_at IS NULL
            ${startDate || endDate ? `
                AND qs.started_at BETWEEN :startDate AND :endDate
            ` : ''}
            GROUP BY qb.id, qb.title
            ORDER BY dropout_sessions DESC
            LIMIT 1;
        `, {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
            },
        });

        const mostDroppedBlock = dropoutByBlock.length > 0
            ? dropoutByBlock[0]
            : null;

        // === 4. RETORNO FINAL ===
        res.status(200).json({
            success: true,
            filters: {
                start_date: startDate || null,
                end_date: endDate || null,
            },
            data: {
                participation: {
                    total_sessions: totalSessions,
                    finished_sessions: finishedSessions,
                    average_duration_seconds: avgDuration,
                    completion_rate: completionRate,
                    dropout_rate: dropoutRate,
                },
                results: {
                    avatar_distribution: avatarDistribution,
                    top_3_avatars: topAvatars,
                },
                behavior: {
                    average_time_per_block: blockTimes,
                    block_with_highest_dropout: mostDroppedBlock,
                },
            },
        });
    } catch (error) {
        console.error('Error fetching global stats:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas globais',
            error: error.message,
        });
    }
};

/**
 * Get avatar distribution statistics
 * GET /stats/avatars
 */
exports.getAvatarStats = async (req, res) => {
    try {
        const avatarStats = await QuizSession.findAll({
            attributes: [
                'avatar_id',
                [sequelize.fn('COUNT', sequelize.col('QuizSession.id')), 'total_count'],
            ],
            include: [{
                model: Avatar,
                as: 'avatar',
                attributes: ['id', 'name', 'description', 'message', 'type', 'related_courses'],
            }],
            where: {
                finished_at: { [Op.ne]: null },
                avatar_id: { [Op.ne]: null },
            },
            group: ['avatar_id', 'avatar.id'],
        });

        // Calculate percentages
        const totalSessions = avatarStats.reduce((sum, stat) => {
            return sum + parseInt(stat.dataValues.total_count);
        }, 0);

        const statsWithPercentage = avatarStats.map(stat => ({
            avatar: stat.avatar,
            count: parseInt(stat.dataValues.total_count),
            percentage: totalSessions > 0
                ? ((parseInt(stat.dataValues.total_count) / totalSessions) * 100).toFixed(2)
                : 0,
        }));

        res.status(200).json({
            success: true,
            data: {
                total_sessions: totalSessions,
                avatars: statsWithPercentage,
            },
        });
    } catch (error) {
        console.error('Error fetching avatar stats:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas de avatares',
            error: error.message,
        });
    }
};

/**
 * Get dominant course distribution statistics
 * GET /stats/courses
 */
exports.getCourseStats = async (req, res) => {
    try {
        const sessions = await QuizSession.findAll({
            where: {
                finished_at: { [Op.ne]: null },
                scores: { [Op.ne]: null },
            },
            attributes: ['id', 'scores'],
        });

        const courseStats = {
            pcp: { count: 0, total_score: 0, name: 'Programação e Controle de Produção' },
            ds: { count: 0, total_score: 0, name: 'Desenvolvimento de Sistemas' },
            ma: { count: 0, total_score: 0, name: 'Mecânica Automotiva' },
        };

        sessions.forEach(session => {
            const scores = session.scores;
            if (scores && typeof scores === 'object') {
                // Find dominant course
                let maxScore = -1;
                let dominantCourse = null;

                Object.keys(scores).forEach(course => {
                    if (courseStats.hasOwnProperty(course)) {
                        courseStats[course].total_score += scores[course] || 0;

                        if (scores[course] > maxScore) {
                            maxScore = scores[course];
                            dominantCourse = course;
                        }
                    }
                });

                if (dominantCourse && courseStats.hasOwnProperty(dominantCourse)) {
                    courseStats[dominantCourse].count++;
                }
            }
        });

        const totalSessions = sessions.length;

        const formattedStats = Object.keys(courseStats).map(courseKey => ({
            course_code: courseKey.toUpperCase(),
            course_name: courseStats[courseKey].name,
            dominant_count: courseStats[courseKey].count,
            total_score: courseStats[courseKey].total_score,
            average_score: courseStats[courseKey].count > 0
                ? (courseStats[courseKey].total_score / totalSessions).toFixed(2)
                : 0,
            percentage: totalSessions > 0
                ? ((courseStats[courseKey].count / totalSessions) * 100).toFixed(2)
                : 0,
        }));

        res.status(200).json({
            success: true,
            data: {
                total_sessions: totalSessions,
                courses: formattedStats,
            },
        });
    } catch (error) {
        console.error('Error fetching course stats:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar estatísticas de cursos',
            error: error.message,
        });
    }
};
