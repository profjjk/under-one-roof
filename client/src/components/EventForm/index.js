import React from 'react';
import API from '../../utils/API';
import AuthService from '../../services/auth.service';


function EventForm(props) {
    const currentUser = AuthService.getCurrentUser();

    let HomeId = currentUser.id;

    const submit = async e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        let newEvent = {
            eventDate: formData.date,
            eventName: formData.title,
            HomeId: HomeId
        }
        await API.saveEvent(newEvent).catch(err => console.error(err))
        props.hideForm();
        document.location.reload()
    }

    return (
        <form className="row border p-3 m-0"
              onSubmit={submit}>
            <label className="col-12 form-label">Date</label>
            <input className="col-12 form-control mb-3"
                   type="date"
                   placeholder="MM/DD/YYYY"
                   required
                   name={"date"}/>
            <label className="col-12 form-label">Title</label>
            <input className="col-12 form-control mb-3"
                   type="text"
                   placeholder="Title of event..."
                   required
                   name={"title"}/>
            <button className="btn btn-primary ml-auto"
                    type={'submit'}>Save
            </button>
        </form>
    );
}

export default EventForm;