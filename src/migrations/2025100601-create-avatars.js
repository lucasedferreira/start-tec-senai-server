module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('avatars', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            type: {
                type: Sequelize.ENUM('dominant', 'hybrid', 'balanced'),
                allowNull: false,
                defaultValue: 'balanced',
            },
            related_courses: {
                type: Sequelize.JSON,
                allowNull: true,
                defaultValue: [],
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

        await queryInterface.addIndex('avatars', ['type']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('avatars');
    },
};
