module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('questions', [
            // Block 1: Perfil Pessoal
            {
                block_id: 1,
                text: 'Como você prefere resolver problemas?',
                order: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                block_id: 1,
                text: 'Qual dessas atividades você mais gosta?',
                order: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                block_id: 1,
                text: 'O que mais te motiva no trabalho?',
                order: 3,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            // Block 2: Habilidades Técnicas
            {
                block_id: 2,
                text: 'Você se sente mais confortável trabalhando com:',
                order: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                block_id: 2,
                text: 'Qual ferramenta você prefere usar?',
                order: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            // Block 3: Preferências de Trabalho
            {
                block_id: 3,
                text: 'Você prefere trabalhar:',
                order: 1,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                block_id: 3,
                text: 'Qual ambiente de trabalho é ideal para você?',
                order: 2,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('questions', null, {});
    },
};
