/* eslint-disable */
import { useEffect, useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Logout from './Logout';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import DeleteProfile from './DeleteProfile';

export default function Profile() {
  const avatarUploadRef = useRef();
  const { profile, getProfile, savingProfile, loadingProfile, updateProfile } =
    useContext(CurrentUserContext);
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      avatarUrl: '',
    },
  });

  const onSubmit = (data) =>
    updateProfile({ ...data, avatar: avatarUploadRef.current.files[0] });

  const firstName = watch('firstname');
  const avatar = watch('avatarUrl');

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

  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  const handleAvatarFileInputChange = (e) => {
    if (e.target.files[0]) {
      setValue('avatarUrl', URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-col justify-center h-screen">
          <div className="titre ">
            <h1 className="mt-6 text-center text-3xl font-extrabold">
              {firstName ? `Bienvenue ${firstName} !` : `Bienvenue !`}
            </h1>
          </div>
          <br />
          <div className="flex items-center bg-primary rounded shadow shadow-lg p-3 dark:bg-darkpurple">
            <div
              className="flex justify-center items-center"
              onClick={handleAvatarClick}
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                ref={avatarUploadRef}
                onChange={handleAvatarFileInputChange}
                style={{ display: 'none' }}
              />
              <Avatar avatarUrl={avatar} alt={`${firstName} avatar`} />
              <button type="button" className="border">
                Change ta photo
              </button>
            </div>
            <br />

            <div className="flex items-center w-auto m-4">
              <ul className="listeDetail">
                <li className="bg-gray-200 w-auto text-center p-10">
                  <Controller
                    name="firstname"
                    control={control}
                    render={({ field }) => (
                      <input
                        className="bg-transparent"
                        {...field}
                        disabled={savingProfile || loadingProfile}
                        label="Firstname"
                        autoComplete="off"
                      />
                    )}
                  />
                </li>
                <li className="bg-white w-auto text-center p-10">
                  <Controller
                    name="lastname"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        disabled={savingProfile || loadingProfile}
                        label="Lastname"
                        autoComplete="off"
                      />
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
                        disabled={savingProfile || loadingProfile}
                        label="Email"
                        autoComplete="off"
                      />
                    )}
                  />
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div className="text-gray-700">
            <button
              disabled={savingProfile || loadingProfile}
              type="submit"
              className="text-white"
            >
              Sauvegarder
            </button>
            <p>Modifier votre profil</p>
            <p>Ajouter un animal</p>
            <Logout />
            <DeleteProfile />
          </div>
        </div>
      </form>
    </>
  );
}
