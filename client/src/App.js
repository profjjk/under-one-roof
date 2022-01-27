import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Budget, Chores, Calendar, Expenses, Login, Register, Home, Landing, Profile } from './pages';
import { useSelector } from 'react-redux';
import Navbar from './components/Nav';
import './App.css';

import { ExpenseProvider } from './utils/GlobalState';
import { useEffect } from 'react';
import { SET_HOME } from './utils/redux/constants/actions';
import AuthService from './services/auth.service';

const App = () => {
    const dispatch = useDispatch();
    // const { id: HomeId } = AuthService.getCurrentUser();
    const home = useSelector(state => state.home);
    const {users} = useSelector(state => state.users);
    const {events} = useSelector(state => state.events);
    const {chores} = useSelector(state => state.chores);
    const {expenses} = useSelector(state => state.expenses);

    useEffect(() => {
        // if (home && users && events && chores && expenses) {
            console.log("Home:", home)
            console.log("Users:", users)
            console.log("Events:", events)
            console.log("Chores:", chores)
            console.log("Expenses:", expenses)
        // }
    }, [home, users, events, chores, expenses])

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            const home = { id: user.id, email: user.email, address: user.username };
            dispatch({ type: SET_HOME, home });
        }
    }, []);

    return (
        <>
            <div className="App">
                <Router>
                        <Navbar/>
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
                </Router>
            </div>
        </>
    );
};

export default App;