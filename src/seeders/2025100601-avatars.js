module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('avatars', [
            {
                name: 'O Estrategista',
                description: 'Você tem perfil analítico e organizado, ideal para Programação e Controle de Produção.',
                type: 'dominant',
                related_courses: JSON.stringify(['PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Desenvolvedor',
                description: 'Você tem perfil lógico e criativo, perfeito para Desenvolvimento de Sistemas.',
                type: 'dominant',
                related_courses: JSON.stringify(['DS']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Mecânico',
                description: 'Você tem perfil prático e técnico, excelente para Mecânica Automotiva.',
                type: 'dominant',
                related_courses: JSON.stringify(['MA']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Híbrido Tech',
                description: 'Você combina lógica de programação com organização de processos.',
                type: 'hybrid',
                related_courses: JSON.stringify(['DS', 'PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Híbrido Maker',
                description: 'Você une habilidade técnica manual com pensamento sistêmico.',
                type: 'hybrid',
                related_courses: JSON.stringify(['MA', 'PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Híbrido Inovador',
                description: 'Você mescla desenvolvimento tecnológico com habilidades práticas.',
                type: 'hybrid',
                related_courses: JSON.stringify(['DS', 'MA']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'O Versátil',
                description: 'Você tem um perfil equilibrado entre todas as áreas técnicas.',
                type: 'balanced',
                related_courses: JSON.stringify(['PCP', 'DS', 'MA']),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('avatars', null, {});
    },
};
