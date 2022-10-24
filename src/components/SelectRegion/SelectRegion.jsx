import React from 'react';
import './SelectRegion.scss'
import {ReactComponent as ResetButton} from "../../assetes/img/resetButton.svg";

const SelectRegion = ({countries, myRegion, setMyRegion, onChangeRegion}) => {
  let regionsSet = new Set();
  countries.filter(country => regionsSet.add(country.region))
  let regions = Array.from(regionsSet)
  regions.sort()

  return (
    <div>
      <form className='selectRegion__form myselect__form'>
        <select
          className='selectRegion myselect'
          name="selectRegion"
          id="selectRegion"
          onChange={onChangeRegion}
          value={myRegion}
        >
          <option value='' hidden> </option>
          {regions.map((region, i) => <option value={region} key={i}>{region}</option>)}
        </select>



        {myRegion &&
        <div>
          <label className='selectRegion__label'
                 htmlFor='selectRegion'>Filter By Region</label>
          <button className='myselect__reset' type='reset' onClick={() => setMyRegion('')}>
            <ResetButton className='myselect__resetImage'/>
          </button>
        </div>
        }
        <label className='selectRegion__labelFirst'
               htmlFor='selectRegion'>Filter By Region</label>

      </form>

    </div>
  );
};

export default SelectRegion;