import { useEffect, useState, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Logout from './Logout';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Profile() {
  const { profile, getProfile } = useContext(CurrentUserContext);
  const [isLoading] = useState(true);
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      avatarUrl: '',
    },
  });

  const onSubmit = (data) => window.console.log(data);
  const firstName = watch('firstname');

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      const { firstname, lastname, avatarUrl, email } = profile;
      const valuesToUpdate = {
        firstname,
        lastname,
        email,
        avatarUrl: avatarUrl || '',
      };
      reset(valuesToUpdate);
    }
  }, [profile]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-col justify-center h-screen">
          <div className="titre ">
            <h1 className="mt-6 text-center text-3xl font-extrabold">
              {`Bienvenue ${firstName} !`}
            </h1>
          </div>
          <br />
          <div className="flex items-center bg-primary rounded shadow shadow-lg p-3 dark:bg-darkpurple">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv"
              alt="imageprofil"
              width="300"
              className="mr-4 rounded-full p-3"
            />
            <br />

            <div className="flex items-center w-auto m-4">
              <ul className="listeDetail">
                <li className="bg-gray-200 w-auto  text-center p-10">
                  <Controller
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="bg-transparent"
                        {...field}
                        disabled={isLoading}
                        label="Firstname"
                      />
                    )}
                  />
                </li>
                <li className="bg-white w-auto text-center p-10">
                  <Controller
                    name="lastname"
                    control={control}
                    render={({ field }) => (
                      <input {...field} disabled={isLoading} label="Lastname" />
                    )}
                  />
                </li>
                <li className="bg-gray-200 w-auto text-center p-10">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="bg-transparent"
                        {...field}
                        disabled={isLoading}
                        label="Email"
                        readOnly
                      />
                    )}
                  />
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div className="text-gray-700">
            <p>Modifier votre profil</p>
            <p>Ajouter un animal</p>
            <Logout />
          </div>
        </div>
      </form>
    </>
  );
}
