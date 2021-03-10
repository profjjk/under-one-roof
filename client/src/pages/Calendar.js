import React, { useState, useEffect } from "react";
import MiniCal from '../components/MiniCal';
import CalEvent from '../components/CalEvent';
import EventForm from '../components/EventForm';

function Calendar() {
  const [displayForm, setDisplayForm] = useState(false);

  const hideForm = () => {
    setDisplayForm(false)
  }
  const showForm = () => {
    setDisplayForm(true)
  }

  return (
    <div className="container">
      <header className="row justify-content-around p-3">
        <div className="col-lg-5 col-md-8 d-flex align-items-center justify-content-center m-3">
          <div className="row justify-content-center">
            <img className="col-4 border img-fluid" src="/assets/img/Calendar/UnderOneRoofCal-96.png" />
            <h1 className=" col-12 border large text-center display-1 blue mt-3 mx-5 logo">Calendar</h1>
          </div>
        </div>
        <div className="col-lg-5 col-md-8 m-3 d-flex">
          <MiniCal />
        </div>
      </header>
      <main className="row">
        <div className="col-12 p-3">
          <button className="btn btn-primary m-0 mb-3" onClick={showForm}>Add Event</button>
          {displayForm ? <EventForm hideForm={hideForm} /> : <CalEvent />}
        </div>
      </main>
    </div>
  )
}

export default Calendar;