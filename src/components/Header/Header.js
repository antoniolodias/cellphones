import React from 'react';
import './Header.scss';

const Header = ({handleInputChange, searchValue, uniqueBrands}) => {
  // control input field with state in parent component
  const onInputChange = e => {
    const { value } = e.target;
    handleInputChange(value);
  }

  // render a button per each different brand that it is found on big list
  const renderBrands = () => {
    return uniqueBrands.map(brand => (
      <div className="search-fields" key={brand}>
        <button onClick={() => handleInputChange(brand)}>{brand}</button>
      </div>
    ))
  }

  return (
    <div className="Header">
      <input type="text"
             placeholder="search..."
             value={searchValue}
             onChange={onInputChange}
            spellCheck="false"/>
      {renderBrands()}
    </div>
  )
};

export default Header;
