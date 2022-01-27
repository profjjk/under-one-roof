import { SET_HOME } from '../constants/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_HOME:
            return {
                ...state,
                home: action.home
            };
        default:
            return state;
    }
};