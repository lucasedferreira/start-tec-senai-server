module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('questions', [
            // Bloco 1: Interesse e Motivação Pessoal
            { block_id: 1, text: 'O que mais te atrai em um curso técnico?', order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 1, text: 'Como você prefere resolver um problema?', order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 1, text: 'Durante um trabalho em grupo, o que você faz?', order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 1, text: 'O que te motiva em uma atividade prática?', order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 1, text: 'Qual tipo de tarefa te deixa mais empolgado?', order: 5, is_active: true, created_at: new Date(), updated_at: new Date() },

            // Bloco 2: Resolução de Problemas e Aprendizado
            { block_id: 2, text: 'Quando algo sai do planejado, o que você faz?', order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 2, text: 'Você se considera uma pessoa…', order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 2, text: 'O que mais te satisfaz ao final de um projeto?', order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 2, text: 'Como você reage a prazos e metas?', order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 2, text: 'Durante um trabalho em equipe, seu papel ideal seria…', order: 5, is_active: true, created_at: new Date(), updated_at: new Date() },

            // Bloco 3: Trabalho Prático e Técnico
            { block_id: 3, text: 'Você gosta mais de atividades que envolvem…', order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 3, text: 'Como você reage a problemas complexos?', order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 3, text: 'Em qual ambiente você se sente mais à vontade?', order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 3, text: 'Como você prefere aprender coisas novas?', order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 3, text: 'O que mais te motiva no trabalho?', order: 5, is_active: true, created_at: new Date(), updated_at: new Date() },

            // Bloco 4: Observação, Análise e Criatividade
            { block_id: 4, text: 'O que mais te chama atenção em um carro ou moto?', order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 4, text: 'Quando algo quebra ou para de funcionar, o que você faz?', order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 4, text: 'Que tipo de trabalho te deixa mais satisfeito?', order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 4, text: 'Como você aprende melhor?', order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
            { block_id: 4, text: 'Qual dessas situações você mais gostaria de viver no trabalho futuramente?', order: 5, is_active: true, created_at: new Date(), updated_at: new Date() },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('questions', null, {});
    },
};
