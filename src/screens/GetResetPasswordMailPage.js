/* eslint-disable */
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function GetResetPasswordMailPage() {
  const { resetPasswordEmail } = useContext(CurrentUserContext);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="min-h-screen flex justify-center py-12 px-4 sm:px-8 lg:px-8 shad">
      <form
        onSubmit={handleSubmit(resetPasswordEmail)}
        className="mt-6 "
        action="send"
        method="POST"
      >
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
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="group relative uppercase w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-darkpurple"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}
