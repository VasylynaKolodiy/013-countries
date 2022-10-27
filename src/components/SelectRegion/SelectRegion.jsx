import React from 'react';
import Select from "react-select";

const SelectRegion = ({idRegion, countries, myRegion, setMyRegion}) => {
  let regionsSet = new Set();
  countries.filter(country => regionsSet.add(country.region))
  let regions = Array.from(regionsSet)
  regions.sort();
  regions = regions.map(item => ({label: item, value: item}))

  return (
    <div className='selectRegion'>
      <Select
        className=""
        id={idRegion}
        isMulti
        closeMenuOnSelect={false}
        isSearchable
        value={myRegion}
        onChange={option => setMyRegion(option)}
        options={regions}
        placeholder='All regions'
        textFieldProps={{
          label: 'Label',
          InputLabelProps: {
            shrink: true,
          },
        }}
      />
      <label className='selectRegion__regionLabel' htmlFor={idRegion}>Filter By Region</label>

    </div>
  );
};

export default SelectRegion;