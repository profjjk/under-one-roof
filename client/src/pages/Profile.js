import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';
import Header from '../components/Header';
import AuthService from '../services/auth.service';
import API from '../utils/API';
import { useDispatch } from 'react-redux';
import { SET_USER, SET_EVENTS } from '../utils/redux/constants/actions';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [displayForm, setDisplayForm] = useState(false);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    let HomeId = currentUser.id;

    useEffect(() => {
        API.getUsers(HomeId)
            .then(users => {
                setUsers(users.data)
                dispatch({ type: SET_USER, user: users.data[0] })
            }).catch(err => console.error(err));
    }, []);

    const hideForm = () => {
        setDisplayForm(false)
    }
    const showForm = () => {
        setDisplayForm(true)
    }

    if (displayForm) {
        return (
            <>
                <ProfileForm hideForm={hideForm} />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <ProfileCard showForm={showForm} users={users} />
            </>
        )
    }
};

export default Profile;