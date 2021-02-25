// clickable item for user to select interviewer. child of InterviewerList
import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

const InterviewerListItem = ({ name, avatar, selected, onChange }) => {
  const InterviewerListItemClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li className={InterviewerListItemClass} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
