module.exports = function(sequelize, DataTypes) {
    const Expense = sequelize.define("Expense", {
        expenseName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expenseAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        expenseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        expenseType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paid: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        paidBy: {
            type: DataTypes.STRING,
            default: "0"
        }
    });

    Expense.associate = function(models) {
        Expense.belongsTo(models.Home);
    };

    return Expense;
};