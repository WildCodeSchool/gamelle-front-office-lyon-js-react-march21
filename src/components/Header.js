import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/recherche">
              Recherche
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/profil">
              Profil
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/historique">
              Historique
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
