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
  const {
    isLoggedIn = true,
    profile,
    setShowModal,
  } = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(false);
  const handleBurgerToggle = () => {
    setBurger(!burger);
  };

  const closeBurger = () => {
    setBurger(false);
  };

  return (
    <>
      <header className="w-full h-auto flex bg-primary">
        <div className="w-full px-4 justify-between items-center flex flex-wrap">
          <div className="my-4 w-full relative flex justify-between lg:w-auto lg:static lg:block ">
            <NavLink exact path="/" to="/">
              <img src={Logo} alt="logo" className="w-28" />
            </NavLink>
            <button id="burger-btn" type="button" onClick={handleBurgerToggle}>
              <FontAwesomeIcon
                className="flex text-white"
                icon={burger ? faTimes : faBars}
              />
            </button>
          </div>
          <div
            className={`lg:flex flex-grow items-center ${
              burger ? ' flex' : ' hidden'
            }`}
          >
            <ul className="w-full flex flex-col lg:flex-row list-none lg:ml-auto lg:justify-end">
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                  exact
                  to="/"
                  onClick={closeBurger}
                >
                  {burger ? 'Rechercher' : <FontAwesomeIcon icon={faSearch} />}
                </NavLink>
              </li>

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    to="/history"
                    className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={closeBurger}
                  >
                    {burger ? (
                      'Historique'
                    ) : (
                      <FontAwesomeIcon icon={faHistory} />
                    )}
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className="px-3 py-2 flex items-center text-sm lg:text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                    exact
                    to="/favoris"
                    onClick={closeBurger}
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
                      onClick={closeBurger}
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
                    onClick={closeBurger}
                  >
                    {burger ? (
                      'Utilisateurs'
                    ) : (
                      <FontAwesomeIcon icon={faUsers} />
                    )}
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
                      onClick={closeBurger}
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
                      onClick={closeBurger}
                    >
                      S'inscrire
                    </NavLink>
                  </li>
                  <li>
                    <div
                      role="none"
                      className="btn px-3 py-2 bg-primary text-white font-bold uppercase text-sm lg:text-md cursor-pointer hover:opacity-75 "
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      S'identifier
                    </div>
                    <ModalSignIn />
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li onClick={closeBurger} aria-hidden="true">
                  <Logout />
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
