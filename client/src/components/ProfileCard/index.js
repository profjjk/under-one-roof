import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function ProfileCard(props) {
    return (
        <>
            <h2 className="col-12 large text-center mt-4 display-4 blue bold">Add New Roommate or Click One</h2>
            <div className={"user-cards"}>
                {props.users.map(user => {
                    return (
                        <Link className="col-lg-3 col-md-4 card imitate-btn"
                              to="/profile"
                              key={user.id}>
                            <img className="img-fluid profile-img-card"
                                 src="/assets/img/ProfileCard/profileCardICON-96.png"/>
                            <h2 className="medium text-center mt-3">{user.userName}</h2>
                        </Link>
                    )
                })}

                <div className="col-lg-3 col-md-4 card imitate-btn"
                     onClick={props.showForm}>
                    <img className="img-fluid profile-img-card"
                         src="/assets/img/addUser/addUserICON-96.png"/>
                    <h2 className="medium text-center mt-3">Add New Roommate</h2>
                </div>
            </div>
        </>

    )
}

export default ProfileCard;