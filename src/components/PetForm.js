/* eslint-disable */
import { useEffect, useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentPetProfileContext } from '../contexts/CurrentPetProfileContext';
import AvatarPet from './AvatarPet';
// import DeleteProfilePet from './DeleteProfilePet';

export default function PetForm() {
  const avatarUploadRef = useRef();
  const { profilePet, getProfilePet, createPetProfile, updateProfilePet } =
    useContext(CurrentPetProfileContext);
  const { handleSubmit, watch, reset, register, setValue } = useForm({
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const [changeInput, setChangeInput] = useState(true);

  const onSubmit = (data) => {
    createPetProfile(data);
  };
  const name = watch('name');
  const image = watch('image');

  useEffect(() => {
    getProfilePet();
  }, []);

  useEffect(() => {
    if (profilePet) {
      const { name, imagePet } = profilePet;
      const valuesToUpdate = {
        name: '',
        image: imagePet || '',
      };
      reset(valuesToUpdate);
    }
  }, [profilePet]);

  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  const handleAvatarFileInputChange = (e) => {
    if (e.target.files[0]) {
      setValue('image', URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className="flex items-center flex-col justify-center p-5">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold">
          Ajouter votre animal
        </h1>
      </div>
      <br />

      <div className="flex flex-col items-center object-center md:bg-primary md:rounded md:shadow-lg p-3 md:w-2/4">
        <div
          className="flex flex-col items-center m-5"
          onClick={handleAvatarClick}
        >
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={avatarUploadRef}
            onChange={handleAvatarFileInputChange}
            style={{ display: 'none' }}
          />
          <AvatarPet imagePet={image} alt={`${name} image`} />
          <button type="button" className="border mt-1">
            Parcourir
          </button>
        </div>
        <br />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-auto m-4"
          action="send"
          method="POST"
        >
          <div className="w-full mr-1 mb-3">
            <label htmlFor="name">
              Nom de votre animal<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              required
              className="bg-grey appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
              placeholder="Croc Blanc"
              {...register('name')}
            />
          </div>

          <div className="flex flex-col">
            <button
              type="submit"
              className=" text-center	font-bold rounded bg-primary
                hover:bg-secondary text-white  p-3 m-5 md:bg-white md:text-primary md:hover:bg-grey"
            >
              Ajouter un animal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
