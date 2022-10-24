import React, {useEffect, useState} from 'react';
import './CountryDetailPage.scss'
import {useFetching} from "../../hooks/useFetching";
import {Link, useParams} from "react-router-dom";
import getDataCountries from "../../helpersFunctions/getDataCountries";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import {ReactComponent as Arrow} from '../../assetes/img/backArrow.svg';

const CountryDetailPage = () => {
  const params = useParams()
  const [country, setCountry] = useState({});
  const [codes, setCodes] = useState({});
  const [fetchCountry, isLoading, error] = useFetching(async () => {
    const response = await getDataCountries.getDetailCountry(params.name);
    setCountry(response.data[0]);
    const responseCode = await getDataCountries.getNameFromCode(response.data[0].borders.join(','))
    setCodes(responseCode.data);
  })

  useEffect(() => {
    fetchCountry()
  }, [params.name])

  let history = useNavigate();

  //______________________


  return (
    <div className='countryDetail'>

      {isLoading
        ? <Loader/>
        : <div className="countryDetail__home container">
          <div className='countryDetail__back'>
            <Arrow className='arrow'/>
            <a className='countryDetail__backLink' onClick={() => history(-1)}>
            </a>
            Back
          </div>


          <div className="countryDetail__container">
            <div className="countryDetail__flagWrapper">
              <img className='countryDetail__flag' src={country.flag} alt='Flag'/>
            </div>

            <div className="countryDetail__info">
              <h1 className="countryDetail__title">
                {country.name}
              </h1>

              <div className='countryDetail__table'>
                <div>
                  <p className="countryDetail__content">
                    <span>Native Name: </span>{country.nativeName || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Population: </span>{country.population && country.population.toLocaleString() || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Region: </span>{country.region || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Sub Region: </span>{country.subregion || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Capital: </span>{country.capital || "-"}
                  </p>
                </div>


                <div>
                  <p className="countryDetail__content">
                    <span>Top Level Domain: </span>{country.topLevelDomain || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Currency: </span>{country.currencies && country.currencies[0].name || "-"}
                  </p>

                  <p className="countryDetail__content">
                    <span>Languages: </span>{country.languages && country.languages[0].name || "-"}
                  </p>
                </div>
              </div>

              <div className="countryDetail__contentBorders">
                <p><span>Border Countries: </span></p>
                <div className='countryDetail__borderWrapper'>
                  {country.borders && country.borders.map((border, i) =>
                    codes[i] &&
                    <div className='countryDetail__border' key={i}>
                      {codes[i].name}
                      <Link className='countryDetail__borderLink' to={`/countries/${codes[i].name}`}>
                      </Link>
                    </div>
                  )
                  ||
                  <div className='countryDetail__noborders'> There is no border country</div>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CountryDetailPage;