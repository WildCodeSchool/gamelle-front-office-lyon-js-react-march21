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
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(resetPasswordEmail)}
        action="send"
        method="POST"
        className="w-1/3"
      >
        <div className="mb-3">
          <label htmlFor="email-address" className="dark:text-white">
            Adresse Email <span style={{ color: 'red' }}>*</span>{' '}
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
