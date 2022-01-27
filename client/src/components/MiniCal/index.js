import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css';

function MiniCal() {
  const [date, setDate] = useState(new Date())

  const onChange = event => {
    setDate(new Date())
  }

  return (
    <div className="mx-auto">
      <Calendar
      onChange={onChange}
      value={date}
      />
    </div>
  );
}

export default MiniCal;