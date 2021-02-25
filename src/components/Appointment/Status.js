// subcomponent for the Appointment component. Is displayed during while waiting for the backend.
import React from 'react';

const Status = ({ message, action = () => {} }) => {
  action();
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt={message}
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
};

export default Status;
