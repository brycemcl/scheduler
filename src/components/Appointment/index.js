import React, { useState } from 'react';
import Header from './Header';
import Form from './Form';
import Status from './Status';
import Empty from './Empty';
import Error from './Error';
import Show from './Show';
import Confirm from './Confirm';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';

const Appointment = ({ time, interview, interviewers, ...rest }) => {
  const [errorMessageActive, setErrorMessageActive] = useState(false);
  if (rest.length) {
    console.error(rest);
  }
  const FORM = 'FORM';
  const SAVING = 'SAVING';
  const SHOW = 'SHOW';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EMPTY = 'EMPTY';
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  return (
    <div className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
      {mode === FORM && (
        <Form
          name={interview && interview.student}
          interviewers={interviewers}
          interviewer={interview && interview.interviewer.id}
          onSave={() => transition(SAVING)}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(FORM)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={() => transition(DELETING)}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {errorMessageActive && (
        <Error
          message="An error has occurred. Please try again."
          onClose={() => setErrorMessageActive(false)}
        />
      )}
    </div>
  );
};

export default Appointment;
