module.exports = function(sequelize, DataTypes) {
    var Budget = sequelize.define("Budget", {
<<<<<<< HEAD
        expenseName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        expenseAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                gt: 0
            }
        },
        expenseDate: {
            type: DataTypes.DATE,
=======
        rent: {
            type: DataTypes.INTEGER,
>>>>>>> 216198794e9ba2a0d9d1f0b677592040d5781f7c
            allowNull: false
        },
        utilities: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
<<<<<<< HEAD
        paid: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        paidBy: {
            type: DataTypes.STRING
        }
=======
        rent: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

>>>>>>> 216198794e9ba2a0d9d1f0b677592040d5781f7c
    });

    Budget.associate = function(models) {
        Budget.belongsTo(models.Home);
    };

    Budget.associate = function(models) {
        Budget.hasMany(models.Expense);
    };

    Budget.associate = function(models) {
        Budget.hasMany(models.User);
    };

    return Budget;
};
