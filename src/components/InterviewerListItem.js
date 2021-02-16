import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

const InterviewerListItem = ({
  // id,
  name,
  avatar,
  selected,
  setInterviewer,
}) => {
  const InterviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li
      className={InterviewerListItemClass}
      onClick={() => {
        setInterviewer(name);
      }}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
