import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import ChoresCard from '../components/RecentCard/ChoresCard';
import EventsCard from '../components/RecentCard/EventsCard';
import ExpensesCard from '../components/RecentCard/ExpensesCard';
import ContactCard from '../components/ContactCard/index';
import AuthService from '../services/auth.service';

const style = {
    logo: {
        height: '200px',
        objectFit: 'contain'
    }
}


const Profile = () => {
    const [content, setContent] = useState('');
    const [chores, setChores] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    const getHomeId = () => {
        const HomeId = currentUser.id;
        return HomeId;
    }

    let HomeId = getHomeId();

    useEffect(() => {
        API.getEvents(HomeId)
            .then(events => {
                setEvents(events.data)
            }).catch(err => console.error(err))
        API.getChores(HomeId)
            .then(chores => {
                // console.log(chores)
                setChores(chores.data)
            }).catch(err => console.error(err))
        API.getExpenses(HomeId)
            .then(expenses => {
                // console.log(expenses)
                setExpenses(expenses.data)
            }).catch(err => console.error(err))
        API.getUsers(HomeId)
            .then(users => {
                // console.log(expenses)
                setUsers(users.data)
            }).catch(err => console.error(err))
    }, [])

    const limitedEvents = events.slice(0, 5).map(item => {
        return item;
    })
    const limitedExpenses = expenses.slice(0, 5).map(item => {
        return item;
    })
    const limitedChores = chores.slice(0, 5).map(item => {
        return item;
    })

    return (
        <main className="container-fluid m-0">
            {/*<header className="jumbotron whiteBG blue mx-5 px-5 justify-content-center d-flex">*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-4 d-flex">*/}
            {/*            <img className="img-fluid mx-auto"*/}
            {/*                 src="/assets/img/Brand/UnderOneRoof.png"*/}
            {/*                 style={style.logo}/>*/}
            {/*        </div>*/}
            {/*        <div className="col-8 pt-5">*/}
            {/*            <h2 className="large display-3">{currentUser.username}</h2>*/}
            {/*            <h4 className="medium mt-4 red">Summary</h4>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</header>*/}
            <div className="row justify-content-around m-5">
                <div className="col-xl-4 col-lg-5 col-sm-7">
                    <ChoresCard list={limitedChores}
                                heading="Chores Due"/>
                </div>
                <div className="col-xl-4 col-lg-5 col-sm-7">
                    <EventsCard list={limitedEvents}
                                heading="Upcoming Events"/>
                </div>
                <div className="col-xl-4 col-lg-5 col-sm-7">
                    <ExpensesCard list={limitedExpenses}
                                  heading="Recent Expenses"/>
                </div>
            </div>
            <div className="row justify-content-around m-5">
                <h2 className="col-12 large text-center mt-4 display-4 blue bold">Roommate Contact List</h2>
                <ContactCard list={users}/>
            </div>
        </main>
    );
};

export default Profile;