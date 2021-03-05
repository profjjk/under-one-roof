import React, { useState } from 'react';
import Moment from "moment";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

function MiniCal() {
  const [date, setDate] = useState(new Date())

  const onChange = event => {
    console.log(event)
    setDate(new Date())
  }

  return (
    <div>
      <Calendar
      onChange={onChange}
      value={date}
      />
    </div>
  );
}

export default MiniCal;