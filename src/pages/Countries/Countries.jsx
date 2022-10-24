import React, {useEffect, useState} from 'react';
import './Countries.scss'
import {useFetching} from "../../hooks/useFetching";
import getDataCountries from "../../helpersFunctions/getDataCountries";
import CountriesList from "../../components/CountriesList/CountriesList";
import SelectRegion from "../../components/SelectRegion/SelectRegion";
import {ReactComponent as ResetButton} from "../../assetes/img/resetButton.svg";
import Loader from "../../components/Loader/Loader";


const Countries = () => {

  const [countries, setCountries] = useState([]);
  const [fetchCountries, isCountriesLoading, countriesError] = useFetching(async () => {
    const response = await getDataCountries.getAllCountries();
    setCountries(response.data);
  })

  useEffect(() => {
    fetchCountries()
  }, [])

  const startCount = 8;
  let [count, setCount] = useState(startCount);
  let [countOnPage, setCountOnPage] = useState(count);

  function onChangeCount(event) {
    setCount(event.target.value)
    setCountOnPage(event.target.value)
  }

  let [myRegion, setMyRegion] = useState('');

  function onChangeRegion(event) {
    setMyRegion(event.target.value)
  }


  let countriesByRegion
  myRegion
    ? countriesByRegion = countries.filter(cntr => cntr.region === myRegion)
    : countriesByRegion = countries

  let [searchCountry, setSearchCountry] = useState('')

  function onChangeSearch(event) {
    setSearchCountry(event.target.value)
  }

  function searchMyCountry() {
    return countriesByRegion.filter(item => item.name.toUpperCase().includes(searchCountry.toUpperCase()))
  }

  let mySearchCountriesInRegion = searchMyCountry()

  return (
    <div className='countriesPage'>
      {isCountriesLoading
        ? <Loader/>
        : <div className='countriesPage__container container'>

          <div className='countriesPage__select'>

            <div className="countriesPage__searchButtons">
              <input className='countriesPage__search myselect'
                     id='countriesPage__search'
                     type='search'
                     onChange={onChangeSearch}
                     placeholder=' '/>

              <label className='countriesPage__searchLabel'
                     htmlFor='countriesPage__search'>Search for a country...</label>
            </div>


            <SelectRegion countries={countries} myRegion={myRegion} setMyRegion={setMyRegion}
                          onChangeRegion={onChangeRegion}>
            </SelectRegion>

            <div>
              <form className='countriesPage__form myselect__form'>

                <select className='countriesPage__count myselect'
                        name="countriesPage__count"
                        id="countriesPage__count"
                        value={count}
                        onChange={event => onChangeCount(event)}>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value={countries.length}>All</option>
                </select>
                <label className='countriesPage__countLabel'
                       htmlFor='countriesPage__count'>Countries on page</label>

                {Number(count) !== 8 &&
                <button className='myselect__reset' type='reset'
                        onClick={() => {
                          setCount(startCount);
                          setCountOnPage(startCount)
                        }}>
                  <ResetButton className='myselect__resetImage'/>
                </button>}
              </form>


            </div>
          </div>

          <CountriesList countries={mySearchCountriesInRegion}
                         countOnPage={countOnPage}>
          </CountriesList>
          {countOnPage < mySearchCountriesInRegion.length &&
          <button className='countriesPage__loadButton'
                  onClick={() => setCountOnPage(Number(countOnPage) + Number(count))}>
            +{count} countries load...</button>
          }
        </div>
      }
    </div>
  );
};

export default Countries;