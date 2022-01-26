import { GET_EVENTS, ADD_EVENT, DELETE_EVENT } from '../constants/actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: [...action.events]
            };
        case ADD_EVENT:
            return {
                ...state,
                events: (state.events || []).concat([action.payload.event])
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