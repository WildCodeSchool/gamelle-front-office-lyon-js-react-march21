/* eslint-disable */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { NavLink } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

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
          className="border flex justify-center border rounded-lg bg-gradient-to-r hover:from-googleblue hover:via-googlered hover:to-googleyellow animate-slide-in"
          href="http://localhost:5000/auth/google"
        >
          <FontAwesomeIcon
            className="flex items-center cursor-pointer mx-2 mt-1"
            icon={faGoogle}
          />
          <p className="mr-2">Connectez vous avec votre compte Google</p>
        </a>
      </div>
      <div className="flex justify-center mt-4">
        <a
          className="border flex justify-center border rounded-lg bg-gradient-to-r hover:from-facebookdarkblue hover:via-facebookblue hover:to-white"
          href="http://localhost:5000/auth/facebook"
        >
          <FontAwesomeIcon
            className="flex items-center cursor-pointer mx-2 mt-1"
            icon={faFacebook}
          />
          <p className="mr-2">Connectez vous avec votre compte Facebook</p>
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
          <label htmlFor="email-address">Adresse Email</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="croc.blanc@exemple.com"
            {...register('email')}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            type={showPassword ? 'text' : 'password'}
            className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="********"
            {...register('password')}
          />
          <FontAwesomeIcon
            className="cursor-pointer flex mt-3"
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <NavLink to="/forgot-password" onClick={() => setShowModal(false)}>
          Mot de passe oublié ?
        </NavLink>
        <br />
        <input
          name="stayConnected"
          className="mr-3"
          type="checkbox"
          {...register('stayConnected')}
        />
        <label>Maintenir la connexion</label>
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
