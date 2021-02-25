// Appointment component. Is displayed for each of the appointments in a list format.
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

const Appointment = ({
  time = '',
  interview,
  interviewers,
  id,
  cancelInterview,
  bookInterview,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const FORM = 'FORM';
  const SAVING = 'SAVING';
  const SHOW = 'SHOW';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const ERROR = 'ERROR';
  const { mode, transition, back } = useVisualMode(SHOW);
  return (
    <div className="appointment">
      <Header time={time} />
      {mode === ERROR && (
        <Error
          id={id}
          message={errorMessage || 'An error has occurred. Please try again.'}
          onClose={() => back()}
        />
      )}
      {mode === SHOW && !interview && <Empty onAdd={() => transition(FORM)} />}
      {mode === FORM && (
        <Form
          id={id}
          name={interview ? interview.student : ''}
          interviewers={interviewers}
          interviewer={interview && interview.interviewer.id}
          onUpdatingState={() => transition(SAVING)}
          onError={(m) => {
            setErrorMessage(m);
            transition(ERROR, true);
          }}
          onUpdatedState={() => {
            back();
            back();
          }}
          onSave={(p) => {
            bookInterview(p);
          }}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && interview && (
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
          id={id}
          message="Delete the appointment?"
          cancelInterview={(p) => cancelInterview(p)}
          onCancel={() => back()}
          onUpdatingState={() => transition(DELETING, true)}
          onError={(m) => {
            setErrorMessage(m);
            transition(ERROR, true);
          }}
          onUpdatedState={() => {
            back();
          }}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
    </div>
  );
};

export default Appointment;
