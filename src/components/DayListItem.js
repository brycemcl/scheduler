import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

const DayListItem = ({ name, spots, selected, setDay }) => {
  const buttonClass = classNames(
    'day-list__item',
    { 'day-list__item--selected': selected },
    { 'day-list__item--full': spots === 0 }
  );

  return (
    <li onClick={() => setDay(name)} className={buttonClass}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>
        {[spots].map((numberOfSpots) => {
          if (numberOfSpots === 0) {
            return 'no spots remaining';
          } else if (numberOfSpots === 1) {
            return '1 spot remaining';
          } else {
            return `${numberOfSpots} spots remaining`;
          }
        })}
      </h3>
    </li>
  );
};
export default DayListItem;
