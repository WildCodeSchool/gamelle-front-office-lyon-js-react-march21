import { useEffect, useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import DeleteProfile from './DeleteProfile';

export default function Profile() {
  const avatarUploadRef = useRef();
  const { profile, getProfile, updateProfile } = useContext(CurrentUserContext);
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
    updateProfile({
      ...data,
      avatar: avatarUploadRef.current.files[0],
    });
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
          <div className="flex flex-col items-center">
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
                <button
                  type="button"
                  className="font-bold rounded bg-secondary hover:bg-green-700 text-white m-5 p-2"
                >
                  Changer la photo
                </button>
              </div>
              <br />

              <div className="flex items-center w-96 m-4">
                <ul className="w-full">
                  <li className="bg-gray-200 w-full text-center p-10">
                    <Controller
                      name="firstname"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full"
                          {...field}
                          label="Firstname"
                          autoComplete="off"
                        />
                      )}
                    />
                  </li>
                  <li className="bg-white w-full text-center p-10">
                    <Controller
                      name="lastname"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full"
                          {...field}
                          label="Lastname"
                          autoComplete="off"
                        />
                      )}
                    />
                  </li>
                  <li className="bg-gray-200 w-full text-center p-10">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full"
                          {...field}
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
                <NavLink
                  to="/petform/"
                  className="flex items-center font-bold rounded bg-blue-500
                hover:bg-blue-800 text-white
                m-5 p-2"
                >
                  Ajouter un animal
                </NavLink>
              </div>

              <button
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
        </div>
      </form>

      {profile && profile.Animals.length !== 0 && (
        <div className="flex flex-col items-center w-full">
          <h2 className="my-6 text-center text-3xl font-extrabold">
            Mes animaux
          </h2>
          <div className="w-4/12  min-w-1/4">
            <ul>
              {profile.Animals.map((pet) => (
                <li key={pet.id} className="mb-6 rounded-lg w-full">
                  <NavLink to={`/petform/?id=${pet.id}`}>
                    <div
                      className="bg-white rounded-lg w-full flex flex-col p-2 md:flex-row lg:flex-row items-center"
                      role="presentation"
                    >
                      <img
                        className="h-20 w-20 rounded-full object-cover md:h-32 md:w-32 lg:h-40 lg:w-40 m-2"
                        src={
                          pet.image ||
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv'
                        }
                        alt={pet.name}
                      />
                      <div className="flex flex-col p-2 ">
                        <p className="text-sm font-bold lg:text-xl text-center md:text-left">
                          {pet.name}
                        </p>
                        <p className="text-xs lg:text-base text-center md:text-left ">
                          {pet.Breeds.name}
                        </p>
                      </div>
                      <br />
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
