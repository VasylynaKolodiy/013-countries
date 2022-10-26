import React, {useEffect, useState} from 'react';
import './Countries.scss'
import {useFetching} from "../../hooks/useFetching";
import getDataCountries from "../../helpersFunctions/getDataCountries";
import CountriesList from "../../components/CountriesList/CountriesList";
import SelectRegion from "../../components/SelectRegion/SelectRegion";
import Loader from "../../components/Loader/Loader";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import SelectCount from "../../components/SelectCount/SelectCount";
import {ReactComponent as SettingButton} from '../../assetes/img/settingButton.svg'
import {ReactComponent as ResetButton} from '../../assetes/img/resetButton.svg'


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

  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className='countriesPage'>
      {isCountriesLoading
        ? <Loader/>
        : <div className='countriesPage__container container'>

          <SettingButton className='openModal' onClick={() => setIsOpen(!isOpen)}/>

          <div className='countriesPage__select'>
            <SelectSearch idSearch='countriesPage__search'
                          searchCountry={searchCountry}
                          onChangeSearch={onChangeSearch}
                          setSearchCountry={setSearchCountry}/>

            <SelectRegion idRegion="selectRegion"
                          countries={countries}
                          myRegion={myRegion}
                          setMyRegion={setMyRegion}/>

            <SelectCount idCount='countriesPage__count'
                         count={count}
                         onChangeCount={onChangeCount}
                         countOptions={countOptions}/>
          </div>

          <div className={`modal ${isOpen ? 'isOpen' : ''}`}>

            <div className='modal__overlay' onClick={() => setIsOpen(!isOpen)}>
              <ResetButton className='closeModal'/>
            </div>

            <div className='modalWrapper'>
              <SelectSearch idSearch='countriesPage__searchModal'
                            searchCountry={searchCountry}
                            onChangeSearch={onChangeSearch}
                            setSearchCountry={setSearchCountry}/>

              <SelectRegion idRegion="selectRegionModal"
                            countries={countries}
                            myRegion={myRegion}
                            setMyRegion={setMyRegion}/>

              <SelectCount idCount='countriesPage__countModal'
                           count={count}
                           onChangeCount={onChangeCount}
                           countOptions={countOptions}/>
            </div>
          </div>

          {mySearchCountriesInRegion.length > 0
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