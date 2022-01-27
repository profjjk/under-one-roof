module.exports = function(sequelize, DataTypes) {
    const Home = sequelize.define("Home", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3],
                isEmail: true 
            }
        }
    });

    Home.associate = function(models) {
        Home.hasMany(models.Chore, {
            onDelete: "cascade",
            foreignKey: {
                name: "HomeId",
                allowNull: false
            }
        });
    };

    Home.associate = function(models) {
        Home.hasMany(models.Event, {
            onDelete: "cascade",
            foreignKey: {
                name: "HomeId",
                allowNull: false
            }
        });
    };

    Home.associate = function(models) {
        Home.hasMany(models.Expense, {
            onDelete: "cascade",
            foreignKey: {
                name: "HomeId",
                allowNull: false
            }
        });
    };

    Home.associate = function(models) {
        Home.hasMany(models.User, {
            onDelete: "cascade",
            foreignKey: {
                name: "HomeId",
                allowNull: false
            }
        });
    };

    return Home;
};