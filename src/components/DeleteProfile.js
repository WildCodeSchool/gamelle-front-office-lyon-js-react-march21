import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function DeleteProfile() {
  const { profile, deleteUser } = useContext(CurrentUserContext);
  return (
    <div className="flex w-full md:w-full">
      <button
        className="font-bold rounded bg-danger hover:bg-red-800 text-white dark:bg-darkpurple dark:text-white m-5 p-2"
        type="button"
        onClick={() => deleteUser(profile.id)}
      >
        Supprimer le profil
      </button>
    </div>
  );
}

export default DeleteProfile;
