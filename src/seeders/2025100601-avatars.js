module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('avatars', [
            {
                name: 'Estrategista dos Processos',
                description: 'Organizado, observador e com calma para resolver qualquer situação.',
                message: 'Você sabe como planejar e organizar para fazer tudo funcionar de forma eficiente. Sua visão estratégica e capacidade de pensar à frente fazem você ser alguém que traz soluções e resultados.',
                type: 'dominant',
                related_courses: JSON.stringify(['PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Mestre dos Sistemas',
                description: 'Curioso, concentrado e gosta de entender como as coisas funcionam.',
                message: 'Você adora entender o funcionamento das coisas e resolver problemas difíceis. Sua curiosidade e jeito lógico fazem de você uma pessoa capaz de transformar ideias em soluções práticas e inovadoras.',
                type: 'dominant',
                related_courses: JSON.stringify(['DS']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Mão na Massa',
                description: 'Prático, curioso e com uma paixão por desafios que exigem ação.',
                message: 'Você é do tipo que aprende fazendo e gosta de ver seu trabalho funcionando. Sua habilidade em resolver problemas práticos e sua determinação são suas maiores forças.',
                type: 'dominant',
                related_courses: JSON.stringify(['MA']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Arquiteto Digital',
                description: 'Organizado, criativo e com facilidade para trabalhar com dados e processos.',
                message: 'Você tem a capacidade de unir lógica e organização para melhorar o que já existe. Sua mente analítica e criativa é perfeita para transformar ideias em resultados concretos.',
                type: 'hybrid',
                related_courses: JSON.stringify(['DS', 'PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Líder Prático',
                description: ' Disciplinado, responsável e focado em resultados reais.',
                message: ' Você é o tipo de pessoa que faz as coisas acontecerem. Sua capacidade de organizar e executar tarefas de forma eficiente garante que tudo funcione como planejado.',
                type: 'hybrid',
                related_courses: JSON.stringify(['MA', 'PCP']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Inovador das Engrenagens',
                description: 'Criativo, curioso e apaixonado por tecnologia aplicada.',
                message: 'Você é a mente criativa que conecta a tecnologia com a mecânica. Seu jeito inovador e prático pode criar soluções inteligentes para melhorar o mundo à sua volta.',
                type: 'hybrid',
                related_courses: JSON.stringify(['DS', 'MA']),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Viajante de Possibilidades',
                description: 'Curioso, versátil e cheio de energia para explorar novas ideias.',
                message: 'Você tem uma curiosidade enorme e está sempre em busca de novas possibilidades. Antes de decidir, explore, experimente e descubra o que realmente te faz brilhar.',
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
