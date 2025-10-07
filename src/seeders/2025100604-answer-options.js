module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('answer_options', [
            // Questão 1
            { question_id: 1, text: 'Aprender a programar e entender como a tecnologia funciona.', weight_ds: 4, weight_pcp: 2, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 1, text: 'Organizar processos e ajudar na eficiência da produção.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 1, text: 'Trabalhar com máquinas, motores e atividades práticas.', weight_ds: 1, weight_pcp: 2, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 2
            { question_id: 2, text: 'Pensando em uma solução lógica, passo a passo.', weight_ds: 4, weight_pcp: 3, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 2, text: 'Buscando maneiras de melhorar o processo.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 2, text: 'Testando e ajustando até funcionar.', weight_ds: 1, weight_pcp: 2, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 3
            { question_id: 3, text: 'Cuido da parte de tecnologia, planilhas e apresentações.', weight_ds: 4, weight_pcp: 2, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 3, text: 'Organizo as tarefas e prazos.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 3, text: 'Gosto de colocar a mão na massa e ver o resultado.', weight_ds: 1, weight_pcp: 2, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 4
            { question_id: 4, text: 'Ver como a tecnologia pode facilitar o trabalho.', weight_ds: 4, weight_pcp: 2, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 4, text: 'Garantir que tudo funcione de forma organizada.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 4, text: 'Entender e consertar equipamentos.', weight_ds: 0, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 5
            { question_id: 5, text: 'Programar, testar ou criar algo digital.', weight_ds: 4, weight_pcp: 1, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 5, text: 'Controlar etapas e acompanhar resultados.', weight_ds: 1, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 5, text: 'Resolver falhas em máquinas e equipamentos.', weight_ds: 0, weight_pcp: 2, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 6
            { question_id: 6, text: 'Analiso o que deu errado e faço ajustes.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 6, text: 'Tento consertar o que puder rapidamente.', weight_ds: 0, weight_pcp: 2, weight_ma: 4, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 6, text: 'Penso em criar algo novo para evitar o problema.', weight_ds: 4, weight_pcp: 1, weight_ma: -1, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 7
            { question_id: 7, text: 'Organizada e que gosta de planejar.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 7, text: 'Criativa e curiosa por tecnologia.', weight_ds: 4, weight_pcp: 1, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 7, text: 'Prática e que prefere aprender fazendo.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 8
            { question_id: 8, text: 'Ver o sistema que desenvolvi funcionando.', weight_ds: 4, weight_pcp: 2, weight_ma: 0, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 8, text: 'Saber que tudo saiu conforme o planejado.', weight_ds: 1, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 8, text: 'Ter consertado algo que estava com defeito.', weight_ds: 0, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 9
            { question_id: 9, text: 'Gosto de cumpri-los e planejar etapas.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 9, text: 'Prefiro flexibilidade para testar soluções.', weight_ds: 4, weight_pcp: 1, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 9, text: 'Não me preocupo tanto, o importante é fazer bem.', weight_ds: -1, weight_pcp: 0, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 10
            { question_id: 10, text: 'Coordenar o andamento das tarefas.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 10, text: 'Programar ou criar as ferramentas.', weight_ds: 4, weight_pcp: 1, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 10, text: 'Realizar as atividades práticas.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 11
            { question_id: 11, text: 'Raciocínio lógico e desafios mentais.', weight_ds: 4, weight_pcp: 2, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 11, text: 'Organização de tarefas e recursos.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 11, text: 'Trabalho físico e prático.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 12
            { question_id: 12, text: 'Divido o problema em partes e analiso cada uma.', weight_ds: 4, weight_pcp: 2, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 12, text: 'Tento organizar e definir prioridades.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 12, text: 'Testo soluções até achar a certa.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 13
            { question_id: 13, text: 'Em frente ao computador, criando ou resolvendo algo.', weight_ds: 4, weight_pcp: 1, weight_ma: 1, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 13, text: 'Em ambientes com rotina organizada e metas.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 13, text: 'Na oficina ou chão de fábrica.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 14
            { question_id: 14, text: 'Sozinho, pesquisando e testando.', weight_ds: 4, weight_pcp: 1, weight_ma: 2, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 14, text: 'Observando e aplicando na prática.', weight_ds: 0, weight_pcp: 1, weight_ma: 4, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 14, text: 'Em grupo, discutindo ideias e métodos.', weight_ds: 2, weight_pcp: 4, weight_ma: 0, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 15
            { question_id: 15, text: 'Criar algo novo e útil para os outros.', weight_ds: 4, weight_pcp: 2, weight_ma: 0, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 15, text: 'Garantir que tudo ocorra de forma eficiente.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 15, text: 'Resolver problemas práticos e técnicos.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 16
            { question_id: 16, text: 'O design e a tecnologia embarcada.', weight_ds: 3, weight_pcp: 1, weight_ma: 2, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 16, text: 'O funcionamento do motor e das peças.', weight_ds: 0, weight_pcp: 1, weight_ma: 4, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 16, text: 'A forma como a montadora organiza a produção.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 17
            { question_id: 17, text: 'Abro para ver o que aconteceu e tento consertar.', weight_ds: 1, weight_pcp: 1, weight_ma: 4, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 17, text: 'Analiso a causa do problema e penso em evitar que aconteça.', weight_ds: 2, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 17, text: 'Pesquiso tutoriais e vejo se alguém já passou pelo mesmo problema.', weight_ds: 4, weight_pcp: 0, weight_ma: 1, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 18
            { question_id: 18, text: 'Consertar algo e ver o resultado.', weight_ds: 1, weight_pcp: 1, weight_ma: 4, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 18, text: 'Planejar e garantir cronogramas.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 18, text: 'Criar algo novo com tecnologia.', weight_ds: -1, weight_pcp: 1, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 19
            { question_id: 19, text: 'Observando alguém fazer e praticando.', weight_ds: 2, weight_pcp: 1, weight_ma: 4, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 19, text: 'Estudando teoria antes da prática.', weight_ds: 1, weight_pcp: 4, weight_ma: 0, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 19, text: 'Experimentando sozinho, pesquisando e testando.', weight_ds: 4, weight_pcp: 0, weight_ma: 2, order: 3, created_at: new Date(), updated_at: new Date() },

            // Questão 20
            { question_id: 20, text: 'Diagnosticar e resolver um defeito em um veículo.', weight_ds: 1, weight_pcp: 1, weight_ma: 4, order: 1, created_at: new Date(), updated_at: new Date() },
            { question_id: 20, text: 'Controlar o fluxo de produção.', weight_ds: 0, weight_pcp: 4, weight_ma: 1, order: 2, created_at: new Date(), updated_at: new Date() },
            { question_id: 20, text: 'Desenvolver um sistema que ajude mecânicos.', weight_ds: 2, weight_pcp: 0, weight_ma: 4, order: 3, created_at: new Date(), updated_at: new Date() },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('answer_options', null, {});
    },
};
