import React, {useState} from 'react';
import './Header.scss'
import {Link} from "react-router-dom";
import {ReactComponent as Light} from '../../assetes/img/light.svg';
import {ReactComponent as Dark} from '../../assetes/img/dark.svg';

const Header = ({lightMode, setLightMode}) => {
  return (
    <div className='header container'>
      <div className="header__home">
        <Link  className="header__homeLink" to="/">Where is the world?</Link>
      </div>

      <div className="header__thema" onClick={() => setLightMode(!lightMode)}>
        {lightMode ? <Dark className="light"/> : <Dark className="dark"/>}
        <div className="header__themaLight" >{lightMode ? 'Light Mode' : 'Dark Mode'}</div>
      </div>

    </div>
  );
};

export default Header;