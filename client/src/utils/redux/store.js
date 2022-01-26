import { combineReducers, createStore } from 'redux';
import { chore, event, expense, user } from './reducers';

const reducer = combineReducers({
    chore, event, expense, user
})

const store = createStore(reducer);

export default store;