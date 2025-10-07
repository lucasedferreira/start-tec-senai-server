module.exports = (sequelize, DataTypes) => {
    const AnswerOption = sequelize.define('AnswerOption', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight_pcp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Weight for PCP (Programação e Controle de Produção) course',
        },
        weight_ds: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Weight for DS (Desenvolvimento de Sistemas) course',
        },
        weight_ma: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Weight for MA (Mecânica Automotiva) course',
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'answer_options',
        timestamps: true,
    });

    AnswerOption.associate = (models) => {
        AnswerOption.belongsTo(models.Question, {
            foreignKey: 'question_id',
            as: 'question',
        });

        AnswerOption.hasMany(models.UserResponse, {
            foreignKey: 'answer_option_id',
            as: 'userResponses',
        });
    };

    return AnswerOption;
};
