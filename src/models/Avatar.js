module.exports = (sequelize, DataTypes) => {
    const Avatar = sequelize.define('Avatar', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Mensagem personalizada associada ao avatar',
        },
        type: {
            type: DataTypes.ENUM('dominant', 'hybrid', 'balanced'),
            allowNull: false,
            defaultValue: 'balanced',
        },
        related_courses: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
            comment: 'Array of course codes, e.g. ["DS", "PCP"]',
        },
    }, {
        tableName: 'avatars',
        timestamps: true,
    });

    Avatar.associate = (models) => {
        Avatar.hasMany(models.QuizSession, {
            foreignKey: 'avatar_id',
            as: 'quizSessions',
        });
    };

    return Avatar;
};
