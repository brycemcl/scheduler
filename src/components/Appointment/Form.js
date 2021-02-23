import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
const Form = ({
  id,
  name: propsName = '',
  interviewers = [],
  interviewer: propsInterviewer = '',
  onSave = () => {},
  onCancel = () => {},
  onUpdatingState = () => {},
  onError = () => {},
  onUpdatedState = () => {},
}) => {
  const [name, setName] = useState(propsName);
  const [interviewer, bookInterviewer] = useState(propsInterviewer);
  const [error, setError] = useState('');
  const reset = () => {
    setName(propsName);
    bookInterviewer(propsInterviewer);
    setError('');
    onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={bookInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {
              if (name && interviewer) {
                setError('');
                onSave({
                  id,
                  name,
                  interviewerId: interviewer,
                  onUpdatingState,
                  onError,
                  onUpdatedState,
                });
              } else {
                let errors = '';
                if (!name && !interviewer) {
                  errors += 'Please enter your name & select an interviewer.';
                } else if (!name) {
                  errors += 'Please enter your name.';
                } else if (!interviewer) {
                  errors += 'Please select an interviewer.';
                }
                setError(errors);
              }
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
