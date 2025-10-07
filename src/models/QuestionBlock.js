module.exports = (sequelize, DataTypes) => {
    const QuestionBlock = sequelize.define('QuestionBlock', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
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
        tableName: 'question_blocks',
        timestamps: true,
    });

    QuestionBlock.associate = (models) => {
        QuestionBlock.hasMany(models.Question, {
            foreignKey: 'block_id',
            as: 'questions',
        });
    };

    return QuestionBlock;
};
