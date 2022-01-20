module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3],
                isEmail: true 
            }
        },
        contactPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            isNumeric: true
        },
        emergencyName: {
          type: DataTypes.STRING,
        },
        emergencyRelationship: {
          type: DataTypes.STRING
        },
        emergencyPhone: {
          type: DataTypes.STRING
        }

    });

    User.associate = function(models) {
        User.belongsTo(models.Home);
    };

    return User;
};