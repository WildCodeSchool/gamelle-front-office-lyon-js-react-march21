/* eslint-disable */
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import API from '../APIClient';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useState } from 'react';

export default function SignUp() {
  const [password, setPassword] = useState('');

  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });
  // --------- Appel a l'api --------- //
  const onSubmit = (form) => {
    API.post('/users', form)
      .then((res) =>
        addToast('La création de votre compte a été un succès !', {
          appearance: 'success',
        })
      )
      .catch((err) =>
        addToast('Il y a eu une erreur lors de la création de votre compte.', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  return (
    // --------- Creation du form pour créer un compte --------- //
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-8 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-gamelle font-extrabold dark:text-white">
            Créer votre compte
          </h2>
          <h3 className="mt-6 text-center text-sm font-gamelle dark:text-white">
            Les champs marqués d'un <span style={{ color: 'red' }}>*</span> sont
            requis pour la création de votre compte
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="send"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex">
            <div className="w-1/2 mr-1 mb-3">
              <label htmlFor="firstname" className="dark:text-white">
                Prénom<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Croc"
                {...register('firstname')}
              />
            </div>
            <div className="w-1/2 ml-1">
              <label htmlFor="lastname" className="dark:text-white">
                Nom<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Blanc"
                {...register('lastname')}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="dark:text-white">
              Numero de téléphone
            </label>
            <input
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              placeholder="0610203040"
              {...register('phone')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email-address" className="dark:text-white">
              Adresse Email<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              placeholder="croc.blanc@exemple.com"
              {...register('email')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="dark:text-white">
              Mot de passe<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              name="password"
              type="password"
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
          </div>
          <div>
            <PasswordStrengthBar
              password={password}
              minLength={8}
              scoreWords={[
                'Trop court',
                'Faible',
                'Moyen',
                'Fort',
                'Très fort',
              ]}
              shortScoreWord={'Trop court'}
            />
            {errors.password && (
              <div className="text-danger mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} /> 8 caractères
                minimums
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
