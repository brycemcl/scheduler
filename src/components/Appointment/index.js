import React from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import './styles.scss';

const Appointment = ({ time, interview }) => {
  return (
    <div className='appointment'>
      <Header time={time} />
      {interview ? (
        <Show student={interview.student} interviewer={interview.interviewer} />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Appointment;
