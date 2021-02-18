const getAppointmentsForDay = (state, day) => {
  const idsForAppointmentsForDay = state.days.filter((d) => d.name === day);
  if (idsForAppointmentsForDay.length) {
    return idsForAppointmentsForDay[0].appointments.map(
      (id) => state.appointments[id]
    );
  }
  return [];
};

export { getAppointmentsForDay };
