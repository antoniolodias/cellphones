import React from 'react';
import './Result.scss';

const Result = ({result, handleOpenDetails, selectedPhone}) => {
  // send phone id after click to App component to be placed in state
  const openDetails = () => {
    handleOpenDetails(result.id);
  };
  // if this phone id matches id in state from App give it active class
  const classNames = `Result ${selectedPhone === result.id ? "active" : ""}`;
  return (
    <div className={classNames} onClick={openDetails}>
      {result.name}
    </div>
  )
};

export default Result;
