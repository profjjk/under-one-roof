module.exports = function(sequelize, DataTypes) {
    const Chore = sequelize.define("Chore", {

        choreName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1]}
        },
        choreDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: [1]}
        },
        choreFrequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 365
            }
        },
        assignee: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "None"
        }
    });

    Chore.associate = function(models) {
        Chore.belongsTo(models.Home);
    };

    return Chore;
};