import React, { createContext, useReducer, useContext } from "react";
import {
    ADD_USER,
    DELETE_USER,
    GET_USER
} from "./actions";

const userContext = createContext({
    username: "",
    HomeId: "",
    loggedIn: true
});

const {Provider} = userContext;

const reducer = (state, action) => {
    switch(action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            };
        case GET_USER:
            return {
                ...state,
                users: [...action.users]
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => {
                    return user.username !== action.username;
                })
            };
        default:
            return state;
    }
};

const UserProvider = ({value =[], ...props}) => {
    const [state, dispatch] = useReducer(reducer, {
        users: []
    });

    return <Provider value={[state, dispatch]}{...props} />;
};

const useUserContext = () => {
    return useContext(userContext)
}

export { UserProvider, useUserContext };