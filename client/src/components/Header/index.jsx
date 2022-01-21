import React from 'react';
import AuthService from '../../services/auth.service';
import './style.css';

const Header = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <header className="blue my-4">
            <div className="row justify-content-center">
                <div className="col-4 d-flex">
                    <img className="img-fluid ml-auto logo" src="/assets/img/Brand/UnderOneRoof.png"/>
                </div>
                <div className="col-5 pt-5">
                    <h4 className="medium">Welcome home!</h4>
                    <h2 className="large display-3">{currentUser.username}</h2>
                </div>
            </div>
        </header>
    )
}

export default Header;