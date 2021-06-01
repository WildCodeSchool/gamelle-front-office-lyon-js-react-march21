/* eslint-disable */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faBars,
  faUserCircle,
  faSearch,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [burger, setBurger] = useState(false);

  const handleBurgerToggle = () => {
    setBurger(!burger);
  };

  return (
    <header className="flex bg-primary">
      <div className="container px-4 justify-between items-center flex flex-wrap">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <NavLink exact path="/" to="home">
            <img src={Logo} alt="logo" className="w-28" />
          </NavLink>
          <button type="button" onClick={handleBurgerToggle}>
            <FontAwesomeIcon
              className="lg:hidden flex "
              icon={burger ? faTimes : faBars}
            />
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center${
            burger ? ' flex' : ' hidden'
          }`}
          id="example-navbar-danger"
        >
          <ul className="w-full flex flex-col lg:flex-row list-none lg:ml-auto lg:justify-end">
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/recherche"
              >
                <FontAwesomeIcon icon={faSearch} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/profil"
              >
                <FontAwesomeIcon icon={faUserCircle} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/historique"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                {burger ? 'Historique' : <FontAwesomeIcon icon={faHistory} />}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}