const { QuizSession, Avatar, UserResponse, AnswerOption } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../models').sequelize;

/**
 * Get global statistics
 * GET /stats/global
 */
exports.getGlobalStats = async (req, res) => {
    try {
        // Total completed sessions
        const totalSessions = await QuizSession.count({
            where: {
                finished_at: { [Op.ne]: null },
            },
        });

        // Average duration
        const avgDuration = await QuizSession.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('duration_seconds')), 'avg_duration'],
            ],
            where: {
                finished_at: { [Op.ne]: null },
                duration_seconds: { [Op.ne]: null },
            },
            raw: true,
        });

        // Device distribution
        const deviceStats = await QuizSession.findAll({
            attributes: [
                'device_type',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
            ],
            where: {
                finished_at: { [Op.ne]: null },
            },
            group: ['device_type'],
            raw: true,
        });

        // Avatar distribution
        const avatarStats = await QuizSession.findAll({
            attributes: [
                'avatar_id',
                [sequelize.fn('COUNT', sequelize.col('QuizSession.id')), 'count'],
            ],
            include: [{
                model: Avatar,
                as: 'avatar',
                attributes: ['name', 'type', 'related_courses'],
            }],
            where: {
                finished_at: { [Op.ne]: null },
                avatar_id: { [Op.ne]: null },
            },
            group: ['avatar_id', 'avatar.id'],
        });

        // Calculate dominant course distribution
        const sessions = await QuizSession.findAll({
            where: {
                finished_at: { [Op.ne]: null },
                scores: { [Op.ne]: null },
            },
            attributes: ['scores'],
            raw: true,
        });

        const courseCounts = { pcp: 0, ds: 0, ma: 0 };

        sessions.forEach(session => {
            const scores = session.scores;
            if (scores && typeof scores === 'object') {
                const maxCourse = Object.keys(scores).reduce((a, b) =>
                    scores[a] > scores[b] ? a : b
                );
                if (courseCounts.hasOwnProperty(maxCourse)) {
                    courseCounts[maxCourse]++;
                }
            }
        });

        res.status(200).json({
            success: true,
            data: {
                total_sessions: totalSessions,
                average_duration_seconds: avgDuration?.avg_duration ? Math.round(avgDuration.avg_duration) : 0,
                device_distribution: deviceStats,
                avatar_distribution: avatarStats,
                dominant_course_distribution: courseCounts,
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
                attributes: ['id', 'name', 'description', 'type', 'related_courses'],
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
