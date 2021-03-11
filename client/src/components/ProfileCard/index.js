import React from 'react';
import { Link } from 'react-router-dom';

function ProfileCard(props) {
  return (
    <>
      <h2 className="col-12 large text-center mt-4 display-4 blue bold">Add New Roommate or Click One</h2>
      {props.users.map(user => {
        return (
          <Link className="col-lg-3 col-md-4 card mx-3 imitate-btn" to="/landing" key={user.id}>
            <img className="img-fluid profile-img-card" src="/assets/img/Profile/profileICON-96.png" />
            <h2 className="medium text-center mt-3">{user.userName}</h2>
          </Link>
        )
      })}
      <div className="col-lg-3 col-md-4 card mx-3 imitate-btn" onClick={props.showForm}>
        <img className="img-fluid profile-img-card" src="/assets/img/addUser/addUserICON-96.png" />
        <h2 className="medium text-center mt-3">Add New Roommate</h2>
      </div>
    </>
  )
}

export default ProfileCard;