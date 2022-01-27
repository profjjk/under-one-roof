import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Budget, Chores, Calendar, Expenses, Login, Register, Home, Landing, Profile } from './pages';
import { useSelector } from 'react-redux';
import store from './utils/redux/store';
import Navbar from './components/Nav';
import './App.css';

import { ExpenseProvider } from './utils/GlobalState';
import { UserProvider } from './utils/LoginState';

const App = () => {
    const home = useSelector(state => state.home);
    console.log("STORE:", store.getState());

    return (
        <>
            <div className="App">
                <Router>
                        <Navbar/>
                        {/*<UserProvider>*/}
                            <Switch>
                                {/* Public Routes */}
                                <Route exact
                                       path={'/'}
                                       component={Landing}/>
                                <Route exact
                                       path={'/login'}
                                       component={Login}/>
                                <Route exact
                                       path={'/register'}
                                       component={Register}/>

                                {/* Logged in routes */}
                                {home ? (
                                    <>
                                        <ExpenseProvider>
                                            <Route exact
                                                   path={'/home'}
                                                   component={Home}/>
                                            <Route exact
                                                   path={'/profile'}
                                                   component={Profile}/>
                                            <Route exact
                                                   path={'/budget'}
                                                   component={Budget}/>
                                            <Route exact
                                                   path={'/expenses'}
                                                   component={Expenses}/>
                                            <Route exact
                                                   path={'/chores'}
                                                   component={Chores}/>
                                            <Route exact
                                                   path={'/calendar'}
                                                   component={Calendar}/>
                                        </ExpenseProvider>
                                    </>
                                ) : <></>}
                            </Switch>
                        {/*</UserProvider>*/}
                </Router>
            </div>
        </>
    );
};

export default App;