import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';

const useApplicationData = () => {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: {},
    interviewers: {},
  });

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
  const createAppointmentObject = ({
    id,
    name = null,
    interviewerId = null,
  }) => {
    const appointment = {
      ...state.appointments[id],
      interview: {
        student: name,
        interviewer: interviewerId,
      },
    };
    if (!appointment.interview.student || !appointment.interview.interviewer) {
      appointment.interview = null;
    }
    return appointment;
  };
  const updateSpots = (state) => {
    const newState = { ...state };
    state.days
      .map((day) => {
        return day.appointments.filter((a) => {
          return !state.appointments[a].interview;
        });
      })
      .map((day) => day.length)
      .forEach((spots, index) => {
        newState.days[index].spots = spots;
      });
    return newState;
  };
  const bookInterview = ({
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
      .then(() => {
        setState((s) => {
          const newState = { ...s };
          newState.appointments[id] = appointment;
          return newState;
        });
        setState((s) => updateSpots(s));
      })
      .then(() => onUpdatedState())
      .catch((e) => {
        onError('Error saving appointment. Please try again.');
        console.log(e);
      });
  };
  const cancelInterview = ({
    id,
    onUpdatingState,
    onError,
    onUpdatedState,
  }) => {
    onUpdatingState();
    const appointment = createAppointmentObject({ id });
    axios
      .delete(`api/appointments/${id}`)
      .then(() => {
        setState((s) => {
          const newState = { ...s };
          newState.appointments[id] = appointment;
          return newState;
        });
        setState((s) => updateSpots(s));
      })
      .then(() => onUpdatedState())
      .catch((e) => {
        onError('Error deleting appointment. Please try again.');
        console.log(e);
      });
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  return { state, dailyAppointments, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
