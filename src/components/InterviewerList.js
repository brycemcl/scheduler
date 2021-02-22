import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

const InterviewerList = ({ interviewers, value, onChange }) => {
  const InterviewerListItems = Object.values(interviewers).map((i) => (
    <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={i.id === value}
      onChange={() => {
        onChange(i.id);
      }}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItems}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
