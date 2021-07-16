import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function DeleteProfile() {
  const { profile, deleteUser } = useContext(CurrentUserContext);
  return (
    <div className="flex">
      <button
        className="w-24 md:w-28 text-xs font-bold md:text-base rounded bg-gray500 hover:bg-black text-white m-5 p-2"
        type="button"
        onClick={() => deleteUser(profile.id)}
      >
        Supprimer le profil
      </button>
    </div>
  );
}

export default DeleteProfile;
