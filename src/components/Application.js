// This is the main component that gets rendered into the dom
import React from 'react';
import 'components/Application.scss';
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
import { getInterview } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    dailyAppointments,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  // creating list of appointment slots
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={Object.values(state.interviewers)}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* Is needed for the last line of the list */}
        <Appointment key="last" /* time="5pm" */ />
      </section>
    </main>
  );
}
