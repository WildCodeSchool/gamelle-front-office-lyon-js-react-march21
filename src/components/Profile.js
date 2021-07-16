import { useEffect, useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import AvatarPet from './AvatarPet';
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
    const { Animals } = profile;

    updateProfile({
      ...data,
      Animals,
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

  return profile ? (
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
      <div className="flex items-center flex-col justify-center m-5">
        <h2 className="my-6 text-center text-3xl font-extrabold">
          Mes animaux
        </h2>
        {profile.Animals && profile.Animals.length !== 0 && (
          <ul>
            {profile.Animals.map((pet) => {
              return (
                <li
                  key={pet.id}
                  className="relative bg-white mb-6 rounded-lg w-full p-2"
                >
                  <NavLink to={`/petform/?id=${pet.id}`}>
                    <div className="flex items-center">
                      <AvatarPet
                        imagePet={pet.image}
                        alt={`${pet.name} avatarPet`}
                      />
                      <div>
                        <p className="font-bold text-xl">{pet.name}</p>
                        <p className="text-base">{pet.Breeds.name}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  ) : null;
}
