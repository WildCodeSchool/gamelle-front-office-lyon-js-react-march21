/* eslint-disable */
import { useEffect, useContext, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CurrentPetProfileContext } from '../contexts/CurrentPetProfileContext';
import AvatarPet from './AvatarPet';

export default function ProfilePet() {
  const avatarUploadRef = useRef();
  const {
    profilePet,
    getProfilePet,
    savingProfilePet,
    loadingProfilePet,
    updateProfilePet,
  } = useContext(CurrentPetProfileContext);
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      image: '',
      name: '',
      breedId: '',
      animalCategoryId: '',
    },
  });

  const [changeInput, setChangeInput] = useState(true);

  const onSubmit = (data) => {
    updateProfilePet({ ...data, avatar: avatarUploadRef.current.files[0] });
    setChangeInput(!changeInput);
  };
  const name = watch('name');
  const avatarPet = watch('imagePet');

  useEffect(() => {
    getProfilePet();
  }, []);

  useEffect(() => {
    if (profilePet) {
      const { avatarPet, name, breedId, animalCategoryId } = profilePet;
      const valuesToUpdate = {
        image: avatarPet || '',
        name,
        breedId,
        animalCategoryId,
      };
      reset(valuesToUpdate);
    }
  }, [profilePet]);

  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  const handleAvatarFileInputChange = (e) => {
    if (e.target.files[0]) {
      setValue('imagePet', URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-col justify-center p-5">
          <div className="titre ">
            <h1 className="mt-6 text-center text-3xl font-extrabold ">
              Votre animal
            </h1>
          </div>
          <br />
          <div className="flex items-center object-center p-3 m-5">
            <div
              className="flex flex-col justify-center items-center"
              onClick={handleAvatarClick}
            >
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                ref={avatarUploadRef}
                onChange={handleAvatarFileInputChange}
                style={{ display: 'none' }}
              />
              <AvatarPet imagePet={avatarPet} alt={`${name} avatarPet`} />
              <button type="button" className="border m-5">
                Change la photo
              </button>
            </div>
            <br />

            <div className="flex flex-col w-auto m-4">
              <div className="w-auto text-center m-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-transparent"
                      {...field}
                      disabled={
                        changeInput
                          ? true
                          : savingProfilePet || loadingProfilePet
                      }
                      label="name"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
              <div className="w-auto text-center m-2">
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-transparent"
                      {...field}
                      disabled={
                        changeInput
                          ? true
                          : savingProfilePet || loadingProfilePet
                      }
                      label="breed"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
              <div className="w-auto text-center m-2">
                <Controller
                  name="animalcategory"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-transparent"
                      {...field}
                      disabled={
                        changeInput
                          ? true
                          : savingProfilePet || loadingProfilePet
                      }
                      label="animalcategory"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
