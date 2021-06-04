/* eslint-disable */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import API from '../APIClient';

export default function Login() {
  const { addToast } = useToasts();
  const { register, handleSubmit } = useForm();
  const onSubmit = ({ email, password }) => {
    API.post('/auth/login', { email, password })
      .then((res) =>
        addToast('Connection réussie !', {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        })
      )
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          addToast('Email ou mot de passe incorrect !', {
            appearance: 'error',
          });
        } else window.console.error(err);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-8 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connecter vous
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
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
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              {...register('email')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Mot de passe</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
