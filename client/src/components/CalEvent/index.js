import React, { useState, useEffect } from 'react';
import DayJS from 'react-dayjs';
import API from '../../utils/API';
import AuthService from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { DELETE_EVENT } from '../../utils/redux/constants/actions';

function CalEvent() {
    const [events, setEvents] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const dispatch = useDispatch();

    let HomeId = currentUser.id;

    useEffect(() => {
        API.getEvents(HomeId)
            .then(results => {
                setEvents(results.data);
            }).catch(err => console.error(err))
    }, [])

    const handleDeleteBtn = event => {
        let id = event.target.getAttribute('data-id');
        console.log(id);
        API.deleteEvent(id)
            .then(res => {
                console.log('Event deleted!')
                dispatch({ type: DELETE_EVENT, eventId: id })
                setEvents(events)
            }).catch(err => console.error(err))
    }

    return (
        events.map(event => (
            <div className="row m-0 mt-4"
                 key={event.id}>
                <div className="col-2">
                    <h3 className="m-0 medium purple"><DayJS format="MMM D">{event.eventDate}</DayJS></h3>
                </div>
                <div className="col-9">
                    <h3 className="m-0 medium">{event.eventName}</h3>
                </div>
                <div className="col-1 ml-auto">
                    <button className="btn delete small ml-auto red"
                            onClick={handleDeleteBtn}
                            data-id={event.id}>Delete
                    </button>
                </div>
            </div>
        ))
    )
}

export default CalEvent;