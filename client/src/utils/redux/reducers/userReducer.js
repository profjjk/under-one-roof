import { SET_USERS, ADD_USER, DELETE_USER } from '../constants/actions';

export default (state = { users: [] }, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        default:
            return state;
    }
};