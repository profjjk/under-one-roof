import { SET_HOME } from '../constants/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_HOME:
            return {
                home: action.home
            };
        default:
            return state;
    }
};