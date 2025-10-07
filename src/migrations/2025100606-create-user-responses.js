module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_responses', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quiz_session_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'quiz_sessions',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            question_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            answer_option_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'answer_options',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('user_responses', ['quiz_session_id']);
        await queryInterface.addIndex('user_responses', ['question_id']);
        await queryInterface.addIndex('user_responses', ['answer_option_id']);

        // Unique constraint: one answer per question per session
        await queryInterface.addConstraint('user_responses', {
            fields: ['quiz_session_id', 'question_id'],
            type: 'unique',
            name: 'unique_session_question',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_responses');
    },
};
