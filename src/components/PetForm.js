/* eslint-disable */
import { useEffect, useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentPetProfileContext } from '../contexts/CurrentPetProfileContext';
import AvatarPet from './AvatarPet';
import API from '../APIClient';

export default function PetForm() {
  const [breedList, setBreedList] = useState(null);
  const [animalCategoryList, setAnimalCategoryList] = useState(null);
  const avatarUploadRef = useRef();
  const { profilePet, getProfilePet, createPetProfile } = useContext(
    CurrentPetProfileContext
  );
  const { handleSubmit, watch, reset, register, setValue } = useForm({
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const name = watch('name');
  const image = watch('image');

  useEffect(() => {
    getProfilePet();
  }, []);

  useEffect(() => {
    if (profilePet) {
      const { name, imagePet } = profilePet;
      const valuesToUpdate = {
        name,
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

  useEffect(() => {
    API.get(`/pets`)
      .then((res) => {
        setBreedList(res.data[0]);
        setAnimalCategoryList(res.data[1]);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (form) => {
    if (profilePet === '') {
      addToast('Les champs sont vides', {
        appearance: 'error',
      });
    } else {
      form = { ...form, registeredAt: new Date() };
      createPetProfile(form);
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

          <div className="mb-3">
            <label htmlFor="animalCategoryId">
              Catgéorie de votre animal <span className="text-danger">*</span>
              <select
                {...register('animalCategoryId', { required: true })}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {animalCategoryList &&
                  animalCategoryList.map((element) => (
                    <option key={element.name} value={element.id}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="breedId">
              Race de votre animal <span className="text-danger">*</span>
              <select
                {...register('breedId', { required: true })}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une race
                </option>
                {breedList &&
                  breedList.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </label>
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
