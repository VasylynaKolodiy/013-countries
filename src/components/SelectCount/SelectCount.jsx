import React from 'react';
import Select from "react-select";


const SelectCount = ({idCount, count, onChangeCount, countOptions}) => {
  return (
    <div className="countriesPage__countWrapper">
      <Select
        className="countriesPage__count"
        // id='countriesPage__count'
        id={idCount}
        isSearchable
        value={count}
        onChange={option => onChangeCount(option)}
        options={countOptions}
        placeholder='Countries on page'
      />
      <label className='countriesPage__countLabel' htmlFor={idCount}>Countries on page</label>
    </div>
  );
};

export default SelectCount;