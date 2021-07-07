import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Logout() {
  const { logout } = useContext(CurrentUserContext);
  return (
    <div className="flex w-full md:w-full">
      <button
        className="text-white px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75"
        type="button"
        onClick={logout}
      >
        Se déconnecter
      </button>
    </div>
  );
}
export default Logout;
