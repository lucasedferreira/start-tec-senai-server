module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        block_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'question_blocks',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName: 'questions',
        timestamps: true,
    });

    Question.associate = (models) => {
        Question.belongsTo(models.QuestionBlock, {
            foreignKey: 'block_id',
            as: 'block',
        });

        Question.hasMany(models.AnswerOption, {
            foreignKey: 'question_id',
            as: 'answerOptions',
        });

        Question.hasMany(models.UserResponse, {
            foreignKey: 'question_id',
            as: 'userResponses',
        });
    };

    return Question;
};
