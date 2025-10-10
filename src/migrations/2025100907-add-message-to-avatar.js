module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('avatars', 'message', {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Mensagem personalizada associada ao avatar',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('avatars', 'message');
    },
};
