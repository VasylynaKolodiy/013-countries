import React from 'react';
import {ReactComponent as ResetButton} from "../../assetes/img/resetButton.svg";

const SelectSearch = ({idSearch, searchCountry, onChangeSearch, setSearchCountry}) => {
  return (
    <div className="countriesPage__searchButtons">
      <input className='countriesPage__search myselect'
             // id='countriesPage__search'
             id={idSearch}
             type='search'
             value={searchCountry}
             onChange={(event) => onChangeSearch(event)}
             placeholder=' '/>

      <label className='countriesPage__searchLabel'
             htmlFor={idSearch}>Search for a country...</label>

      {searchCountry
      && <button className='myselect__reset myselectSearch'
                 type='reset'
                 onClick={() => {
                   setSearchCountry('')
                 }}>
        <ResetButton className='myselect__resetImage'/>
      </button>}
    </div>
  );
};

export default SelectSearch;