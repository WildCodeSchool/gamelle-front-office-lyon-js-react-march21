import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function DeleteProfile() {
  const { profile, deleteUser } = useContext(CurrentUserContext);
  return (
    <div className="flex justify-center items-centerborder rounded-lg bg-primary hover:bg-secondary text-white dark:bg-darkpurple dark:text-white w-30 h-10">
      <button type="button" onClick={() => deleteUser(profile.id)}>
        Supprimer le profil
      </button>
    </div>
  );
}

export default DeleteProfile;
