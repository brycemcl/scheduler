// subcomponent for the Appointment component. Displays a line and the start time of the appointment.
import React from 'react';

const Header = ({ time }) => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};

export default Header;
