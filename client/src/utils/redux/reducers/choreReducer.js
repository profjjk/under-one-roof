import { SET_CHORES, ADD_CHORE, DELETE_CHORE } from '../constants/actions';

const choreReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CHORES:
            return {
                ...state,
                chores: [...action.chores]
            };
        case ADD_CHORE:
            return {
                ...state,
                chores: (state.chores || []).concat([action.newChore])
            };
        case DELETE_CHORE:
            const choreId = action.choreId;
            return {
                ...state,
                chores: state.chores.filter(chore => chore.id !== choreId)
            };
        default:
            return state;
    }
};

export default choreReducer;