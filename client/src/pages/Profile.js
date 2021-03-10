import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import AuthService from "../services/auth.service";
import API from "../utils/API";

const style = {
  logo: {
    height: '200px',
    objectFit: 'contain'
  }
}

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [displayForm, setDisplayForm] = useState(false);
  const [users, setUsers] = useState([]);

  const getHomeId = () => {
    const HomeId = currentUser.id;
    return HomeId;
  }

  let HomeId = getHomeId();

  useEffect(() => {
    API.getUsers(HomeId)
      .then(results => {
        setUsers(results.data)
      }).catch(err => console.error(err))
  }, [])

  const hideForm = () => {
    setDisplayForm(false)
  }
  const showForm = () => {
    setDisplayForm(true)
  }

  return (
    <div className="container">
      <header className="jumbotron whiteBG blue">
        <div className="row">
          <div className="col-md-4 col-sm d-flex">
            <img className="mx-auto" 
              src="/assets/img/Brand/UnderOneRoof.png" 
              style={style.logo} />
          </div>
          <div className="col-md-8 col-sm pt-5">
            <h4>Welcome home!</h4>
            <h3 className="display-3">{currentUser.username}</h3>
          </div>
        </div>
      </header>
      <main className="row justify-content-center">
        {
          displayForm ? 
          <ProfileForm hideForm={hideForm} /> : 
          <ProfileCard showForm={showForm} users={users} /> 
        }
      </main>
    </div>
  );
};

export default Profile;