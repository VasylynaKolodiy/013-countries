import React from 'react';
import {Link} from "react-router-dom";
import './CountryItem.scss'

const CountryItem = ({country}) => {
  return (
    <div className='country'>
      <div className='country__item'>
        <Link className='country__link' to={`/countries/${country.name}`}>
          <p className='country__link-button'>{country.name}</p>
        </Link>

        <div className='country__imageWrapper'>
          <img className='country__image' src={country.flags.png} alt="Country's flag"/>
        </div>

        <div className='country__content'>
          <h3 className='country__name'>
            {country.name}
          </h3>
          <ul className='country__info'>
            <li className='country__info-item'>
              <span>Population: </span> {country.population.toLocaleString()}
            </li>
            <li className='country__info-item'>
              <span>Region: </span> {country.region}
            </li>
            <li className='country__info-item'>
              <span>Capital: </span> {country.capital}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CountryItem;