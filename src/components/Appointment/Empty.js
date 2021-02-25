// subcomponent for the Appointment component. Is displayed when there is an empty appointment slot and it displays a + call to action.
import React from 'react';

const Empty = ({ onAdd }) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
};

export default Empty;
