import React from 'react';
import './PhoneDetails.scss';

const PhoneDetails = ({phone}) => {
  // cut the string phone.dimensions to contain only basic info
  const bodyDimensions = phone.body.slice(phone.body.indexOf(':') + 1, phone.body.indexOf('mm') + 2);

  return (
    <div className="PhoneDetails">
      <span className="brand">{phone.brand}</span>
      <span className="name">{phone.name}</span>
      <div className="specs">
        <span className="title">{phone.release_year && 'Release year:'}</span>
        <span className="topic">{phone.release_year}</span>
        <span className="title">{bodyDimensions && 'Dimensions:'}</span>
        <span className="topic">{bodyDimensions}</span>
        <span className="title">{phone.os && 'operating system:'}</span>
        <span className="topic">{phone.os}</span>
      </div>
    </div>
  )
};

export default PhoneDetails;
