module.exports = (sequelize, DataTypes) => {
    const QuizSession = sequelize.define('QuizSession', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        finished_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        scores: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'JSON object with course scores, e.g. {"pcp": 32, "ds": 27, "ma": 22}',
        },
        avatar_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'avatars',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        duration_seconds: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Total duration of quiz in seconds',
        },
        device_type: {
            type: DataTypes.ENUM('mobile', 'desktop', 'tablet'),
            allowNull: true,
            defaultValue: 'desktop',
        },
    }, {
        tableName: 'quiz_sessions',
        timestamps: true,
    });

    QuizSession.associate = (models) => {
        QuizSession.belongsTo(models.Avatar, {
            foreignKey: 'avatar_id',
            as: 'avatar',
        });

        QuizSession.hasMany(models.UserResponse, {
            foreignKey: 'quiz_session_id',
            as: 'userResponses',
        });
    };

    return QuizSession;
};
