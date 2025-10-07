module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('quiz_sessions', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            student_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            started_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            finished_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            scores: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            avatar_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'avatars',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            duration_seconds: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            device_type: {
                type: Sequelize.ENUM('mobile', 'desktop', 'tablet'),
                allowNull: true,
                defaultValue: 'desktop',
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

        await queryInterface.addIndex('quiz_sessions', ['avatar_id']);
        await queryInterface.addIndex('quiz_sessions', ['started_at']);
        await queryInterface.addIndex('quiz_sessions', ['finished_at']);
        await queryInterface.addIndex('quiz_sessions', ['device_type']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('quiz_sessions');
    },
};
