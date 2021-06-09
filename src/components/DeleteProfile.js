import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function DeleteProfile() {
  const { deleteUser } = useContext(CurrentUserContext);
  return (
    <>
      <button type="button" onClick={deleteUser}>
        Delete moi stp
      </button>
    </>
  );
}

export default DeleteProfile;
