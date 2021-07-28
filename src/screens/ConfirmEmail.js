import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function ConfirmEmail() {
  const { validateEmail } = useContext(CurrentUserContext);
  const { handleSubmit } = useForm();
  return (
    <div className=" flex justify-center items-center ">
      <form onSubmit={handleSubmit(validateEmail)}>
        <div className="mb-3 dark:text-white">
          <h3>Veuillez confirmer votre email en cliquant sur le bouton</h3>
        </div>
        <div className=" flex rounded-lg bg-primary dark:bg-darkpurple hover:bg-secondary text-white justify-center items-center ">
          <button type="submit" className="uppercase">
            confirmez votre email
          </button>
        </div>
      </form>
    </div>
  );
}
