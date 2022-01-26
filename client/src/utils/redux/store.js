import { combineReducers, applyMiddleware, createStore } from 'redux';
import { choreReducer, eventReducer, expenseReducer, userReducer } from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    chores: choreReducer,
    events: eventReducer,
    expenses: expenseReducer,
    users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;