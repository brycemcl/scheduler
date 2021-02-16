import React from 'react';
import DayListItem from './DayListItem';
const DayList = ({ days, day, setDay }) => {
  const listOfDays = days.map((dayData) => {
    return (
      <DayListItem
        key={dayData.id}
        name={dayData.name}
        spots={dayData.spots}
        selected={dayData.name === day}
        setDay={setDay}
      />
    );
  });
  return <ul>{listOfDays}</ul>;
};

export default DayList;
