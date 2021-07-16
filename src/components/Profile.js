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
        firstname: firstname || '',
        lastname: lastname || '',
        email: email || '',
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
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold ">
              Votre profil
            </h1>
          </div>
          <br />
          <div className="flex flex-col items-center">
            <div className="shadow-lg rounded overflow-hidden m-5 w-full">
              <div className="top-0 bg-gray-500 w-full h-40 shadow-sm">
                <img
                  className="h-full w-full object-cover"
                  src="https://picsum.photos/1000/1000?random"
                  alt="random"
                />
              </div>
              <div className="bg-white flex flex-col items-center -mt-24">
                <div role="none" onClick={handleAvatarClick}>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    ref={avatarUploadRef}
                    onChange={handleAvatarFileInputChange}
                    style={{ display: 'none' }}
                  />
                  <Avatar avatarUrl={avatar} alt={`${firstName} avatar`} />
                </div>

                <div className="bg-white m-5">
                  <p className="text-gray-800 text-xl ">
                    <Controller
                      name="firstname"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full font-semibold text-center"
                          {...field}
                          label="Firstname"
                          autoComplete="off"
                        />
                      )}
                    />
                  </p>
                  <p className="text-gray-800 text-xl">
                    <Controller
                      name="lastname"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full font-semibold text-center"
                          {...field}
                          label="Lastname"
                          autoComplete="off"
                        />
                      )}
                    />
                  </p>
                  <p className="text-gray-800 font-normal text-xs">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          className="bg-transparent w-full text-center"
                          {...field}
                          label="Email"
                          autoComplete="off"
                        />
                      )}
                    />
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-24 md:w-28 text-xs font-bold md:text-base rounded bg-primary hover:bg-secondary text-white m-5 p-2"
                  >
                    Sauvegarder
                  </button>

                  <DeleteProfile />
                </div>
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
            </div>
          </div>
        </div>
      </form>

      {profile && profile.Animals && profile.Animals.length !== 0 && (
        <div className="flex flex-col items-center w-full">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold ">
              Mes animaux
            </h1>
          </div>
          <br />
          <div className=" w-10/12 md:w-5/12 lg:w-2/6 ">
            <ul>
              {profile.Animals.map((pet) => (
                <li
                  key={pet.id}
                  className="bg-white m-5 rounded shadow-lg md:transform transition duration-500 hover:scale-105"
                >
                  <NavLink to={`/petform/?id=${pet.id}`}>
                    <div className="flex flex-col md:flex-row items-center ">
                      <div className="m-2">
                        <img
                          className="h-20 w-20 md:w-32 md:h-32 lg:h-40 lg:w-40 rounded-full"
                          src={
                            pet.image ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW-vlzxatqDVDAQu4jpEfVlxcT_HXgembwISZjeZMdt2mm2fJv'
                          }
                          alt={pet.name}
                        />
                      </div>
                      <div className="m-2 md:ml-5">
                        <p className="text-sm font-bold lg:text-xl text-center md:text-left">
                          {pet.name}
                        </p>
                        <p className="text-xs lg:text-base text-center md:text-left ">
                          {pet.Breeds.name}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  ) : null;
}
