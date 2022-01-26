import { GET_CHORES, ADD_CHORE, DELETE_CHORE } from '../constants/actions';

const choreReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CHORES:
            return {
                ...state,
                chores: [...action.chores]
            };
        case ADD_CHORE:
            return {
                ...state,
                chores: (state.chores || []).concat([action.payload])
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