import React from 'react';
import CountryItem from "../CountryItem/CountryItem";
import './CountriesList.scss'

const CountriesList = ({countries, countOnPage}) => {
  let partOfCountries = countries.slice(0, countOnPage)
  return (
    <div className='countries'>
      <div className='countries__list'>
        {partOfCountries.map((country, i) => (i < countOnPage) &&
          <div className='countries__list-item' key={i}>
            <CountryItem country={country}>
            </CountryItem>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesList;