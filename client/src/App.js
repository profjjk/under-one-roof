import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ExpenseProvider } from './utils/GlobalState';
import { UserProvider } from './utils/LoginState';
import AuthService from './services/auth.service';
import Navbar from './components/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { Budget, Chores, Calendar, Expenses, Login, Register, Home, Landing, Profile } from './pages';

function App() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const user = useSelector(state => state.user);
    const { events } = useSelector(state => state.events);
    const { chores } = useSelector(state => state.chores);
    const { expenses } = useSelector(state => state.expenses);

    console.log(user, events, chores, expenses)

    return (
        <>
            <div className="App">
                <Router>
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
                </Router>
            </div>
        </>
    );
};

export default App;