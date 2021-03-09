// var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
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
    
    // User.prototype.validPassword = function(password) {
    //     // console.log(password);
    //     // console.log(this.password);
    //     return bcrypt.compareSync(password, this.password);
    // };
    // User.addHook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });

    User.associate = function(models) {
        User.belongsTo(models.Home);
    };

    return User;
};