module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('question_blocks', [
            {
                title: 'Perfil Pessoal',
                order: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: 'Habilidades Técnicas',
                order: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: 'Preferências de Trabalho',
                order: 3,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('question_blocks', null, {});
    },
};
