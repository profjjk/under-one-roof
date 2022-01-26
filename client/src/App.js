import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ExpenseProvider } from './utils/GlobalState';
import { UserProvider } from './utils/LoginState';
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import AuthService from './services/auth.service';
import Navbar from './components/Nav';
import { Budget, Chores, Calendar, Expenses, Login, Register, Home, Landing, Profile } from './pages';

function App() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, [currentUser]);

    console.log(store.getState())

    return (
        <>
            <div className="App">
                <Router>
                    <Provider store={store}>
                        <Navbar/>
                        <UserProvider>
                            <Switch>
                                {/* Public Routes */}
                                <Route exact
                                       path={['/', '/home']}
                                       component={Home}/>
                                <Route exact
                                       path="/login"
                                       component={Login}/>
                                <Route exact
                                       path="/register"
                                       component={Register}/>

                                {/* Logged in routes */}
                                {currentUser ? (
                                    <>
                                        <ExpenseProvider>
                                            <Route exact
                                                   path="/landing"
                                                   component={Landing}/>
                                            <Route exact
                                                   path="/profile"
                                                   component={Profile}/>
                                            <Route exact
                                                   path="/budget"
                                                   component={Budget}/>
                                            <Route exact
                                                   path="/expenses"
                                                   component={Expenses}/>
                                            <Route exact
                                                   path="/chores"
                                                   component={Chores}/>
                                            <Route exact
                                                   path="/calendar"
                                                   component={Calendar}/>
                                        </ExpenseProvider>
                                    </>
                                ) : <></>}
                            </Switch>
                        </UserProvider>
                    </Provider>
                </Router>
            </div>
        </>
    );
};

export default App;