import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function SignIn() {
  const { login, setShowModal } = useContext(CurrentUserContext);
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="max-w-md w-full">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Connectez-vous
        </h2>
      </div>
      <div className="flex justify-center mt-4">
        <a
          className="border flex justify-center rounded-lg bg-gradient-to-r hover:from-googleblue hover:via-googlered hover:to-googleyellow"
          href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}
        >
          <FontAwesomeIcon
            className="flex items-center cursor-pointer mx-2 mt-1"
            icon={faGoogle}
          />
          <p className="mr-2">Continuer avec Google</p>
        </a>
      </div>
      <div className="flex justify-center mt-4">
        <a
          className="border flex justify-center rounded-lg bg-gradient-to-r hover:from-facebookdarkblue hover:via-facebookblue hover:to-white"
          href={`${process.env.REACT_APP_API_BASE_URL}/auth/facebook`}
        >
          <FontAwesomeIcon
            className="flex items-center cursor-pointer mx-2 mt-1"
            icon={faFacebook}
          />
          <p className="mr-2">Continuer avec Facebook</p>
        </a>
      </div>
      <form
        onSubmit={handleSubmit(login)}
        className="mt-6"
        action="send"
        method="POST"
      >
        <input type="hidden" name="remember" defaultValue="true" />

        <div className="mb-3">
          <label htmlFor="email-address">
            Adresse Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="croc.blanc@exemple.com"
              {...register('email')}
            />
          </label>
        </div>
        <div className="mb-5">
          <label htmlFor="password">
            Mot de passe
            <div className="flex justify-end">
              <FontAwesomeIcon
                className="absolute cursor-pointer flex z-50 mt-3 mr-3"
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
              />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="********"
                {...register('password')}
              />
            </div>
          </label>
        </div>
        <div>
          <h1 className="flex justify-end cursor-default">
            <NavLink
              to="/forgot-password"
              onClick={() => setShowModal(false)}
              className=" hover:underline cursor-pointer hover:text-info"
            >
              Mot de passe oublié ?
            </NavLink>
          </h1>
        </div>
        <label htmlFor="stayConnected" className="flex mb-1.5">
          Maintenir la connexion
          <div className="mt-0.5 ml-2">
            <input
              name="stayConnected"
              className="mb-3 cursor-pointer"
              type="checkbox"
              {...register('stayConnected')}
            />
          </div>
        </label>
        <div>
          <button
            type="submit"
            className="group relative uppercase w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-darkpurple"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
}
