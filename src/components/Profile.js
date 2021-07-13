import { useEffect, useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

  const [changeInput, setChangeInput] = useState(true);

  const onSubmit = (data) => {
    console.log('dans onSubmit');
    updateProfile({ ...data, avatar: avatarUploadRef.current.files[0] });
    setChangeInput(!changeInput);
  };
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
        <div className="flex items-center flex-col justify-center p-5">
          <div className="titre ">
            <h1 className="mt-6 text-center text-3xl font-extrabold ">
              Votre profil
            </h1>
          </div>
          <br />
          <div className="flex items-center object-center bg-primary rounded shadow-lg p-3">
            <div
              role="none"
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
                        disabled={
                          changeInput ? true : savingProfile || loadingProfile
                        }
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
                        className="bg-transparent"
                        {...field}
                        disabled={
                          changeInput ? true : savingProfile || loadingProfile
                        }
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
                        disabled={
                          changeInput ? true : savingProfile || loadingProfile
                        }
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
          <div className="flex">
            <div className="flex w-full md:w-full">
              <button
                type="button"
                className="font-bold rounded bg-blue-500
                hover:bg-blue-800 text-white
                m-5 p-2"
              >
                Ajouter un animal
              </button>
            </div>
            <button
              disabled={changeInput}
              type="submit"
              className="font-bold rounded bg-primary
              hover:bg-secondary text-white
              m-5 p-2"
            >
              Sauvegarder
            </button>
            <DeleteProfile />
          </div>
        </div>
      </form>
    </>
  );
}
