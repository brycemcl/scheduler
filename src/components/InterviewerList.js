import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';

const InterviewerList = ({ interviewers, interviewer, setInterviewer }) => {
  const InterviewerListItems = interviewers.map((i) => (
    <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={i.id === interviewer}
      setInterviewer={() => {
        setInterviewer(i.id);
      }}
    />
  ));
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{InterviewerListItems}</ul>
    </section>
  );
};

export default InterviewerList;
