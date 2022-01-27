import { combineReducers, applyMiddleware, createStore } from 'redux';
import { choreReducer, eventReducer, expenseReducer, userReducer, homeReducer } from './reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    chores: choreReducer,
    events: eventReducer,
    expenses: expenseReducer,
    users: userReducer,
    home: homeReducer
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;