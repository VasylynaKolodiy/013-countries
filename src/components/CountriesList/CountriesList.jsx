import React from 'react';
import CountryItem from "../CountryItem/CountryItem";
import './CountriesList.scss'

const CountriesList = ({countries, countOnPage}) => {
  let partOfCountries = countries.slice(0, countOnPage)
  return (
    <div className='countries__list'>
      {partOfCountries.map((country, i) => (i < countOnPage) &&
        <CountryItem country={country} key={i}>
        </CountryItem>
      )}
    </div>
  );
};

export default CountriesList;