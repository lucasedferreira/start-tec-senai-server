module.exports = (sequelize, DataTypes) => {
    const UserResponse = sequelize.define('UserResponse', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quiz_session_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'quiz_sessions',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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
        answer_option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'answer_options',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    }, {
        tableName: 'user_responses',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['quiz_session_id', 'question_id'],
                name: 'unique_session_question',
            },
        ],
    });

    UserResponse.associate = (models) => {
        UserResponse.belongsTo(models.QuizSession, {
            foreignKey: 'quiz_session_id',
            as: 'quizSession',
        });

        UserResponse.belongsTo(models.Question, {
            foreignKey: 'question_id',
            as: 'question',
        });

        UserResponse.belongsTo(models.AnswerOption, {
            foreignKey: 'answer_option_id',
            as: 'answerOption',
        });
    };

    return UserResponse;
};
