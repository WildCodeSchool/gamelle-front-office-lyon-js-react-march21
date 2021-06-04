/* eslint-disable */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function SignUp() {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });
  const onSubmit = (form) => {
    axios
      .post(`${apiBase}/users`, form)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-8 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer votre compte
          </h2>
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
              <label htmlFor="firstname">Prénom</label>
              <input
                id="firstname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="firstname"
                {...register('firstname')}
              />
            </div>
            <div className="w-1/2 ml-1">
              <label htmlFor="lastname">Nom</label>
              <input
                id="lastname"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="lastname"
                {...register('lastname')}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">Numero de téléphone</label>
            <input
              id="phoneNumber"
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="0610203040"
              {...register('phone')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email-address">Adresse Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              {...register('email')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              {...register('password', {
                required: 'this is a required',
                minLength: {
                  value: 8,
                },
              })}
            />
          </div>
          {errors.password && (
            <div className="text-danger mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} /> min length is 8
            </div>
          )}
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
