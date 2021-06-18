// --------- basical import --------- //
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// --------- css import --------- //
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faBars,
  faUserCircle,
  faSearch,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo.png';
import ModalSignIn from './modalSignIn';
import Toggle from './Toggle';
import Logout from './Logout';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Header() {
  const { isLoggedIn = true } = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(false);
  const handleBurgerToggle = () => {
    setBurger(!burger);
  };

  return (
    <header className="w-full flex bg-primary dark:bg-darkpurple">
      <div className="container px-4 justify-between items-start align-center flex flex-wrap">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start xl:justify-start 2xl:justify-start">
          <NavLink exact path="/" to="/">
            <img src={Logo} alt="logo" className="w-28" />
          </NavLink>
          <button type="button" onClick={handleBurgerToggle}>
            <FontAwesomeIcon
              className="lg:hidden flex"
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
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/recherche"
              >
                {burger ? 'Rechercher' : <FontAwesomeIcon icon={faSearch} />}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                // to={
                //   profile
                //     ? `/historique?userId=${profile.id}`
                //     : '/historique?userId=0'
                // }
                to="/historique"
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >
                {burger ? 'Historique' : <FontAwesomeIcon icon={faHistory} />}
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    exact
                    to="/profil"
                  >
                    {burger ? (
                      'Profil'
                    ) : (
                      <FontAwesomeIcon icon={faUserCircle} />
                    )}
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink
                    exact
                    to="/inscription"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    S'inscrire
                  </NavLink>
                </li>
                <li>
                  <ModalSignIn />
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <Logout />
              </li>
            )}
            <li className="mb-3">
              <Toggle />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
