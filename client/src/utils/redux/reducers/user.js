import { GET_USERS, ADD_USER, DELETE_USER } from '../constants/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case ADD_USER:
            return {
                ...state,
                users: (state.users || []).concat([action.payload.user])
            };
        case DELETE_USER:
            const userId = action.userId;
            return {
                ...state,
                users: state.users.filter(user => user.id !== userId)
            };
        default:
            return state;
    }
};