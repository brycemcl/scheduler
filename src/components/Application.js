import React, { useState } from 'react';
import 'components/Application.scss';
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';

const days = [
  {
    id: 1,
    name: 'Monday',
    spots: 2,
  },
  {
    id: 2,
    name: 'Tuesday',
    spots: 5,
  },
  {
    id: 3,
    name: 'Wednesday',
    spots: 0,
  },
];
const appointments = [
  {
    id: 1,
    time: '9pm',
  },
  {
    id: 2,
    time: '10pm',
    interview: {
      student: 'Jon Bill',
      interviewer: {
        id: 2,
        name: 'Newt Fred',
        avatar: 'https://i.imgur.com/twYrpay.jpg',
      },
    },
  },
  {
    id: 3,
    time: '11pm',
  },
  {
    id: 4,
    time: '12pm',
  },
  {
    id: 5,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
];


export default function Application(props) {
  const [day, setday] = useState('Monday');
  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={days} day={day} setDay={setday} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointments.map((apt) => {
          return <Appointment key={apt.id} {...apt} />;
        })}
        <Appointment key='last' time='2pm' />
      </section>
    </main>
  );
}
