import { useContext } from 'react';
import { CurrentPetProfileContext } from '../contexts/CurrentPetProfileContext';

function DeleteProfilePet() {
  const { profilePet, deletePet } = useContext(CurrentPetProfileContext);
  return (
    <div className="flex w-full md:w-full">
      <button
        className="font-bold rounded bg-danger hover:bg-danger text-white dark:bg-darkpurple dark:text-white m-5 p-2"
        type="button"
        onClick={() => deletePet(profilePet.id)}
      >
        Supprimer le profil de votre animal
      </button>
    </div>
  );
}

export default DeleteProfilePet;
