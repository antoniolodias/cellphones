import React from 'react';

import './ResultList.scss';

import Result from './Result/Result';

const ResultList = ({list, searchValue, handleOpenDetails, selectedPhone}) => {

  // filter complete list with user input
  const renderList = () => {
    // match values with lowercases to skip capital values both in response and input
    const searchLowerCase = searchValue.toLowerCase();

    const filteredList = list.filter(({brand, name}) =>
      // filter list by brand
      brand.toLowerCase().indexOf(searchLowerCase) > -1 ||
      // filter list by phone name
      name.toLowerCase().indexOf(searchLowerCase) > -1
    );
    if(filteredList.length < 1) {
      // display message if there are no matches between Data and user input
      return <span className="no-matches">No matches...</span>
    }

    // map results of filtered list
    return filteredList.map(each =>
      <Result key={each.id}
              result={each}
              handleOpenDetails={handleOpenDetails}
              selectedPhone={selectedPhone}/>
    )
  }

  return (
    <div className="ResultList">
      {renderList()}
    </div>
  )
};

export default ResultList;
