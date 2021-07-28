import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import {
  faExclamationTriangle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PasswordStrengthBar from 'react-password-strength-bar';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function SignUp() {
  const { addToast } = useToasts();
  const { createProfile } = useContext(CurrentUserContext);
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const confirm = (form) => {
    if (password !== confirmedPassword) {
      addToast('Les mots de passe ne sont pas identiques', {
        appearance: 'error',
      });
    } else {
      const newForm = { ...form, registeredAt: new Date() };
      createProfile(newForm);
    }
  };

  return (
    // --------- Creation du form pour créer un compte --------- //
    <div className="flex items-center justify-center px-4 sm:px-8 lg:px-8 p-5">
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
          onSubmit={handleSubmit(confirm)}
          className="mt-8"
          action="send"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex">
            <div className="w-1/2 mr-1 mb-3">
              <label htmlFor="firstname" className="dark:text-white">
                Prénom<span style={{ color: 'red' }}>*</span>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Croc"
                  {...register('firstname')}
                />
              </label>
            </div>
            <div className="w-1/2 ml-1 mb-3">
              <label htmlFor="lastname" className="dark:text-white">
                Nom<span style={{ color: 'red' }}>*</span>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Blanc"
                  {...register('lastname')}
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">
              Numero de téléphone
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                placeholder="0610203040"
                {...register('phone')}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="email-address">
              Adresse Email<span style={{ color: 'red' }}>*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                placeholder="croc.blanc@exemple.com"
                {...register('email')}
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Mot de passe<span style={{ color: 'red' }}>*</span>
              <div className="flex justify-end">
                <FontAwesomeIcon
                  className="absolute cursor-pointer flex z-30 mt-3 -ml-3"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                />
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
              </div>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmedPassword">
              Veuillez confirmer votre mot de passe
              <span style={{ color: 'red' }}>*</span>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                name="confirmedPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmedPassword}
                required
                placeholder="********"
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <PasswordStrengthBar
              password={password}
              minLength={8}
              scoreWords={[
                'Trop faible',
                'Faible',
                'Moyen',
                'Fort',
                'Très fort',
              ]}
              shortScoreWord={['Trop court']}
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
