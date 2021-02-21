import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'components/Application.scss';
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
    interviewers: {},
  });
  const { days, day } = state;
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = (arg) => {
    setState({ ...state, day: arg });
  };
  const updateState = () => {
    return Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((a) => {
      const [days, appointments, interviewers] = a;
      setState((s) => {
        return {
          ...s,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        };
      });
    });
  };
  useEffect(() => {
    updateState();
  }, []);
  const createAppointmentObject = ({ id, name, interviewerId }) => {
    const appointment = {
      ...state.appointments[id],
      interview: {
        student: name,
        interviewer: interviewerId,
      },
    };
    return appointment;
  };
  const setInterview = ({
    id,
    name,
    interviewerId,
    onUpdatingState,
    onError,
    onUpdatedState,
  }) => {
    onUpdatingState();
    const appointment = createAppointmentObject({ id, name, interviewerId });
    axios
      .put(`api/appointments/${id}`, appointment)
      .then(() => updateState())
      .then(() => onUpdatedState())
      .catch((e) => {
        onError('Error saving appointment. Please try again.');
        console.log(e);
      });
  };
  const deleteInterview = ({
    id,
    onUpdatingState,
    onError,
    onUpdatedState,
  }) => {
    onUpdatingState();
    axios
      .delete(`api/appointments/${id}`)
      .then(() => updateState())
      .then(() => onUpdatedState())
      .catch((e) => {
        onError('Error deleting appointment. Please try again.');
        console.log(e);
      });
  };
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interviewers={state.interviewers}
        interview={interview}
        setInterview={setInterview}
        deleteInterview={deleteInterview}
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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" />
      </section>
    </main>
  );
}
