module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('answer_options', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            weight_pcp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            weight_ds: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            weight_ma: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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

        await queryInterface.addIndex('answer_options', ['question_id']);
        await queryInterface.addIndex('answer_options', ['order']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('answer_options');
    },
};
