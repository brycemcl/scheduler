const getAppointmentsForDay = (state, day) => {
  const idsForAppointmentsForDay = state.days.filter((d) => d.name === day);
  if (idsForAppointmentsForDay.length) {
    return idsForAppointmentsForDay[0].appointments.map(
      (id) => state.appointments[id]
    );
  }
  return [];
};

const getInterview = (state, interview) => {
  if (state && interview && interview.student && interview.interviewer) {
    const { student, interviewer } = interview;
    console.log({
      student,
      interviewer: state.interviewers[interviewer],
    });
    return {
      student,
      interviewer: state.interviewers[interviewer],
    };
  } else {
    return null;
  }
};

export { getAppointmentsForDay, getInterview };