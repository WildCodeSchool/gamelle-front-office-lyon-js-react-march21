import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function DeleteProfile() {
  const { profile, deleteUser } = useContext(CurrentUserContext);
  return (
    <>
      <button type="button" onClick={() => deleteUser(profile.id)}>
        Delete moi stp
      </button>
    </>
  );
}

export default DeleteProfile;
