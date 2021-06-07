/* eslint-disable */
// --------- basical import --------- //
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
// --------- css import --------- //
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faBars,
  faUserCircle,
  faSearch,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import ModalSignIn from './modalSignIn';
import { useTheme } from 'react-hook-tailwind-darkmode';

export default function Header() {
  const [burger, setBurger] = useState(false);
  const handleBurgerToggle = () => {
    setBurger(!burger);
  };
  const { changeTheme } = useTheme();
  return (
    <header className="flex bg-primary">
      <div className="container px-4 justify-between items-start align-center flex flex-wrap">
        <input type="checkbox" onClick={() => changeTheme()} />
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start xl:justify-start 2xl:justify-start">
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
        >
          <ul className="w-full flex flex-col lg:flex-row list-none lg:ml-auto lg:justify-end mt-7">
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/recherche"
              >
                <FontAwesomeIcon icon={faSearch} />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/historique"
                className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                {burger ? 'Historique' : <FontAwesomeIcon icon={faHistory} />}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/profil"
              >
                <FontAwesomeIcon icon={faUserCircle} />
              </NavLink>
            </li>

            <NavLink
              exact
              to="/SignUp"
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              S'inscrire
            </NavLink>

            <ModalSignIn />
          </ul>
        </div>
      </div>
    </header>
  );
}
