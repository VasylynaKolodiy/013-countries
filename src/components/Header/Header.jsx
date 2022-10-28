import React from 'react';
import './Header.scss'
import {Link} from "react-router-dom";
import {ReactComponent as Light} from '../../assetes/img/light.svg';

const Header = ({lightMode, setLightMode}) => {

  function setMode() {
    let newMode = lightMode === 'Light' ? 'Dark' : 'Light'

    setLightMode(newMode)
    localStorage.setItem('lightMode', newMode)

  }

  return (
    <div className='header container'>
      <div className="header__home">
        <Link className="header__homeLink" to="/">Where is the world?</Link>
      </div>

      <div className="header__thema" onClick={setMode}>
        <Light className={lightMode}/>
        <div className="header__themaLight">{`${lightMode} mode`}</div>
      </div>
    </div>
  );

};

export default Header;