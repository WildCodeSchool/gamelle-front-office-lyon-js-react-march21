/* eslint-disable */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useToasts } from 'react-toast-notifications';

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
    <form
      onSubmit={handleSubmit(confirm)}
      className="mt-8 space-y-6"
      action="send"
      method="POST"
    >
      <div className="mb-3">
        <label htmlFor="password" className="dark:text-white">
          Mot de passe<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
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
        <div>
          <div className="mb-3">
            <label htmlFor="confirmedPassword" className="dark:text-white">
              Veuillez confirmer votre mot de passe
              <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              name="confirmedPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmedPassword}
              required
              placeholder="********"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </div>
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-darkpurple"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </form>
  );
}
