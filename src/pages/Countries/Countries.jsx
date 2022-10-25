import React, {useEffect, useState} from 'react';
import './Countries.scss'
import {useFetching} from "../../hooks/useFetching";
import getDataCountries from "../../helpersFunctions/getDataCountries";
import CountriesList from "../../components/CountriesList/CountriesList";
import SelectRegion from "../../components/SelectRegion/SelectRegion";
import {ReactComponent as ResetButton} from "../../assetes/img/resetButton.svg";
import Loader from "../../components/Loader/Loader";
import Select from "react-select";


const Countries = () => {

  const [countries, setCountries] = useState([]);
  const [fetchCountries, isCountriesLoading] = useFetching(async () => {
    const response = await getDataCountries.getAllCountries();
    setCountries(response.data);
  })

  useEffect(() => {
    fetchCountries()
  }, []) //eslint-disable-line

  const countOptions = [
    {value: '8', label: '8'},
    {value: '16', label: '16'},
    {value: '32', label: '32'},
    {value: '64', label: '64'},
    {value: countries.length, label: 'All'},
  ]

  let [count, setCount] = useState(countOptions[0]);
  let [countOnPage, setCountOnPage] = useState(count);

  function onChangeCount(option) {
    setCount(option)
    setCountOnPage(option)
  }

  let [myRegion, setMyRegion] = useState([]);
  let onlyRegionValue = myRegion.map(reg => reg.value)

  console.log(myRegion.value, 'myRegion.value')
  console.log(myRegion, 'myRegion')

  let countriesByRegion
  myRegion.length > 0
    ? countriesByRegion = countries.filter(cntr => onlyRegionValue.includes(cntr.region))
    : countriesByRegion = countries

  let [searchCountry, setSearchCountry] = useState('')

  function onChangeSearch(event) {
    setSearchCountry(event.target.value)
  }

  function searchMyCountry() {
    return countriesByRegion.filter(item => item.name.toUpperCase().includes(searchCountry.toUpperCase()))
  }

  let mySearchCountriesInRegion = searchMyCountry()

  console.log(countriesByRegion, 'countriesByRegion')


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
                     value={searchCountry}
                     onChange={onChangeSearch}
                     placeholder=' '/>

              <label className='countriesPage__searchLabel'
                     htmlFor='countriesPage__search'>Search for a country...</label>

              {searchCountry
              && <button className='myselect__reset myselectSearch'
                         type='reset'
                         onClick={() => {
                           setSearchCountry('')
                         }}>
                <ResetButton className='myselect__resetImage'/>
              </button>}
            </div>


            <SelectRegion countries={countries} myRegion={myRegion} setMyRegion={setMyRegion}/>

            <div>
                <Select
                  className="countriesPage__count"
                  isSearchable
                  value={count}
                  onChange={option => onChangeCount(option)}
                  options={countOptions}
                  placeholder='Countries on page'
                />
            </div>
          </div>

          {
            mySearchCountriesInRegion.length > 0
              ? <CountriesList countries={mySearchCountriesInRegion}
                               countOnPage={countOnPage.value}>
              </CountriesList>
              : <h2>No country found</h2>
          }

          {countOnPage.value < mySearchCountriesInRegion.length &&
          <button className='countriesPage__loadButton'
                  onClick={() =>
                    setCountOnPage({...countOnPage, value: Number(countOnPage.value) + Number(count.value)})}>
            +{count.value} countries load...</button>
          }
        </div>
      }
    </div>
  );
};

export default Countries;