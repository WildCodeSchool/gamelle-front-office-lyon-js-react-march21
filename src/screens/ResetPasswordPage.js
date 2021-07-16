import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useToasts } from 'react-toast-notifications';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function ResetPasswordPage() {
  const { addToast } = useToasts();
  const { resetPassword } = useContext(CurrentUserContext);
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const confirm = (form) => {
    if (password !== confirmedPassword) {
      addToast('Les mots de passe ne sont pas identiques', {
        appearance: 'error',
      });
    } else {
      resetPassword(form);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        onSubmit={handleSubmit(confirm)}
        className="w-1/3"
        action="send"
        method="POST"
      >
        <div className="mb-3">
          <label htmlFor="password" className="dark:text-white">
            Mot de passe<span style={{ color: 'red' }}>*</span>
            <input
              className="appearance-none rounded-none relative block px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm w-full"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              required
              placeholder="********"
              {...register('password', {
                required: 'this is a required',
                minLength: {
                  value: 8,
                },
              })}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmedPassword" className="dark:text-white">
            Veuillez confirmer votre mot de passe
            <span style={{ color: 'red' }}>*</span>{' '}
            <input
              className="flex appearance-none rounded-none relative px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm w-full"
              name="confirmedPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmedPassword}
              required
              placeholder="********"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </label>

          <FontAwesomeIcon
            className="cursor-pointer dark:text-white"
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary dark:bg-darkpurple w-full"
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}
