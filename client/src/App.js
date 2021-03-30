import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ExpenseProvider } from "./utils/GlobalState";
import { UserProvider, useUserContext } from "./utils/LoginState";
import AuthService from "./services/auth.service";
import Budget from "./pages/Budget";
import Chores from "./pages/Chores";
import Calendar from "./pages/Calendar";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Navbar from "./components/Nav";
import API from "./utils/API";
import { GET_USER } from "./utils/actions";


function App () {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <UserProvider>
            <Switch>
              {/* Public Routes */}
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />

              {/* Logged in routes */}
              {LoginStatus[1] && (
                <div>
                  <ExpenseProvider>
                  <Route exact path="/landing" component={Landing} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/budget" component={Budget} />
                  <Route exact path="/expenses" component={Expenses} />
                  <Route exact path="/chores" component={Chores} />
                  <Route exact path="/calendar" component={Calendar} />
                  </ExpenseProvider>
                </div>
              )}
            </Switch>
          </UserProvider>
        </Router>
      </div>
    </>
  );         
};

export default App;