module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('question_blocks', [
            { title: 'Interesse e Motivação Pessoal', order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
            { title: 'Resolução de Problemas e Aprendizado', order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
            { title: 'Trabalho Prático e Técnico', order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
            { title: 'Observação, Análise e Criatividade', order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('question_blocks', null, {});
    },
};
