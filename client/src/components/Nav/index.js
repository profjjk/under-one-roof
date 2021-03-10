import React from "react";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

function Navbar() {
  const currentUser = AuthService.getCurrentUser();

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark blueBG">
      <div className="container-fluid">
        {currentUser ? (
        <Link to={"/landing"} className="navbar-brand logo">
        <img src="/assets/img-sans-background/v1-heart/UORHeartOnlyLOGO72.png" alt="Under One Roof Logo and Home Button"></img>
        UnderOneRoof
        </Link>) : (
        <Link to={"/"} className="navbar-brand logo">
        <img src="/assets/img-sans-background/v1-heart/UORHeartOnlyLOGO72.png" alt="Under One Roof Logo and Home Button"></img>
        UnderOneRoof
        </Link>
      )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {currentUser && (
            <li className="nav-item">
              <Link to={"/budget"} className="nav-link">
              <img src="/assets/img/NewBudget/UnderOneRoofNewBudgetLOGO48.png" alt="Budget Button"></img>
                Budget
              </Link>
            </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/chores"} className="nav-link">
                <img src="/assets/img/Chores/UnderOneRoofChoreLOGO48.png" alt="Chores Button"></img>
                  Chores
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/calendar"} className="nav-link">
                <img src="/assets/img/Calendar/UnderOneRoofCal-48.png" alt="Calendar Button"></img>
                  Calendar
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/expenses"} className="nav-link">
                <img src="/assets/img/Expenses/UnderOneRoofExpense-48.png" alt="Expense Button"></img>
                  Expenses
                </Link>
              </li>
            )}
          </ul>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                <img src="/assets/img/Profile/profileICON-48.png" alt="Profile Button"></img>
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                <img src="/assets/img/LoginOut-with-House/LoginOutICON-48.png" alt="LogOut Button"></img>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                <img src="/assets/img/LoginOut-with-House/LoginOutICON-48.png" alt="Login Button"></img>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                <img src="/assets/img/Register-with-House/register-with-houseICON-48.png" alt="Sign Up Button"></img>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;