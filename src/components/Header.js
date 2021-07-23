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
  faHeart,
  faChartLine,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/logo_gamelle_toque_blanche.png';
import ModalSignIn from './modalSignIn';
import Logout from './Logout';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Header() {
  const { isLoggedIn = true, profile } = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(false);
  const handleBurgerToggle = () => {
    setBurger(!burger);
  };

  return (
    <header className="w-full h-auto flex bg-primary">
      <div className="container px-4 justify-between items-start align-center flex flex-wrap">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start xl:justify-start 2xl:justify-start">
          <div className="flex items-center h-full">
            <NavLink exact path="/" to="/">
              <img
                src={Logo}
                alt="logo"
                className="w-28 flex mt-3 mb-3 items-center"
              />
            </NavLink>
          </div>
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
                className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                exact
                to="/"
              >
                {burger ? 'Rechercher' : <FontAwesomeIcon icon={faSearch} />}
              </NavLink>
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/history"
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  {burger ? 'Historique' : <FontAwesomeIcon icon={faHistory} />}
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  exact
                  to="/favoris"
                >
                  {burger ? 'Favoris' : <FontAwesomeIcon icon={faHeart} />}
                </NavLink>
              </li>
            )}
            {isLoggedIn &&
              (profile.role === 'admin' || profile.role === 'superAdmin') && (
                <li>
                  <NavLink
                    exact
                    to="/dashboard"
                    className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    {burger ? (
                      'Statistiques'
                    ) : (
                      <FontAwesomeIcon icon={faChartLine} />
                    )}
                  </NavLink>
                </li>
              )}
            {isLoggedIn && profile.role === 'superAdmin' && (
              <li>
                <NavLink
                  exact
                  to="/users"
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                >
                  {burger ? 'Utilisateurs' : <FontAwesomeIcon icon={faUsers} />}
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                    exact
                    to="/profile"
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
                    to="/sign-up"
                    className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
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
          </ul>
        </div>
      </div>
    </header>
  );
}
