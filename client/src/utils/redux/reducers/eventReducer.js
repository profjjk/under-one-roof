import { SET_EVENTS, ADD_EVENT, DELETE_EVENT } from '../constants/actions';

export default (state = { events: [] }, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: [...action.events]
            };
        case ADD_EVENT:
            return {
                ...state,
                events: (state.events || []).concat([action.newEvent])
            };
        case DELETE_EVENT:
            const eventId = action.eventId;
            return {
                ...state,
                events: state.events.filter(event => event.id !== eventId)
            };
        default:
            return state;
    }
};