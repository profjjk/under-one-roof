import { SET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE } from '../constants/actions';

export default (state = { expenses: [] }, action) => {
    switch (action.type) {
        case SET_EXPENSES:
            return {
                ...state,
                expenses: [...action.expenses]
            };
        case ADD_EXPENSE:
            return {
                ...state,
                expenses: (state.expenses || []).concat([action.expense])
            };
        case DELETE_EXPENSE:
            const expenseId = action.expenseId;
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== expenseId)
            };
        default:
            return state;
    }
};