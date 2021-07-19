/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import qs from 'query-string';
import AvatarPet from './AvatarPet';
import API from '../APIClient';

export default function PetForm() {
  const { addToast } = useToasts();
  const [favoritesList, setFavoritesList] = useState([]);
  const [petFavoritesList, setPetFavoritesList] = useState([]);
  const [filteredFavoriteList, setFilteredFavoriteList] = useState([]);
  const [breedList, setBreedList] = useState(null);
  const [filteredBreedList, setFilteredBreedList] = useState(null);
  const [animalCategoryList, setAnimalCategoryList] = useState(null);
  const [petProfile, setPetProfile] = useState(null);
  const URLId = parseInt(qs.parse(window.location.search).id, 10);
  const [id, setId] = useState(URLId || null);
  const avatarUploadRef = useRef();
  const { handleSubmit, watch, register, setValue } = useForm({
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const name = watch('name');
  const image = watch('image');
  const chosenAnimalCategory = watch('animalCategoryId');

  useEffect(async () => {
    await API.get(`/pets`)
      .then((res) => {
        setBreedList(res.data[0]);
        setFilteredBreedList(res.data[0]);
        setAnimalCategoryList(res.data[1]);
      })
      .catch((err) => console.log(err));
    await API.get(`/favorites`)
      .then((res) => {
        setFavoritesList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (petFavoritesList) {
      const filteredFavorites = favoritesList.filter(
        (fav) =>
          !petFavoritesList.find((obj) => {
            return obj.Favorites.id === fav.id;
          })
      );
      setFilteredFavoriteList(filteredFavorites);
    }
  }, [petFavoritesList, favoritesList]);

  useEffect(() => {
    if (id) {
      API.get(`/pets/${id}`)
        .then((res) => {
          setPetProfile(res.data);
        })
        .catch((err) => console.log(err));
      API.get(`/pets/favorites/${id}`)
        .then((res) => {
          setPetFavoritesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    if (breedList && animalCategoryList) {
      if (chosenAnimalCategory === '') {
        setFilteredBreedList(breedList);
      } else {
        const category = animalCategoryList.find(
          (categ) => categ.id === parseInt(chosenAnimalCategory, 10)
        );
        const filterBreed = breedList.filter(
          (breed) =>
            ((category.name.includes('chien') ||
              category.name.includes('chiot')) &&
              breed.speciesId === 1) ||
            (category.name.includes('chat') && breed.speciesId === 2)
        );
        setFilteredBreedList(filterBreed);
      }
    }
  }, [chosenAnimalCategory, breedList]);

  useEffect(() => {
    if (filteredBreedList && id && petProfile) {
      setValue('animalCategoryId', petProfile.animalCategoryId);
      setValue('breedId', petProfile.breedId);
      setValue('name', petProfile.name);
    }
  }, [filteredBreedList, id, petProfile]);

  const handleAvatarClick = () => {
    avatarUploadRef.current.click();
  };

  const handleAvatarFileInputChange = (e) => {
    if (e.target.files[0]) {
      setValue('image', URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (form) => {
    const updatedForm = { ...form, id };

    if (id) {
      API.patch(`/pets/${id}`, updatedForm)
        .then((res) => {
          API.get(`/pets/${res.data.id}`)
            .then((resP) => {
              setPetProfile(resP.data);
            })
            .catch((err) => console.log(err));
          addToast('Votre animal a bien été mis à jour', {
            appearance: 'success',
          });
        })
        .catch(() => {
          addToast(
            'Il y a eu une erreur lors de la mise à jour de votre animal.',
            {
              appearance: 'error',
            }
          );
        });
    } else {
      API.post('/pets', form)
        .then((res) => {
          setId(res.data.id);
          window.location.replace(`/petform/?id=${res.data.id}`);
          addToast('Votre animal a bien été ajouté', {
            appearance: 'success',
          });
          setTimeout(() => {
            setId(res.data.id);
            window.location.replace(`/petform/?id=${res.data.id}`);
          }, 500);
        })
        .catch(() => {
          addToast("Il y a eu une erreur lors de l'ajout de votre animal.", {
            appearance: 'error',
          });
        });
    }
  };

  const handleClickFilteredFavorite = (fav) => {
    if (id) {
      API.post(`/pets/favorites`, { animalId: id, favoriteId: fav.id })
        .then(() => {
          API.get(`/pets/favorites/${id}`)
            .then((res) => {
              setPetFavoritesList(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClickDeleteFavorite = (petFav) => {
    if (id) {
      API.delete(`/pets/favorites/${petFav.id}`)
        .then(() => {
          API.get(`/pets/favorites/${id}`)
            .then((res) => {
              setPetFavoritesList(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeletePetProfile = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Êtes-vous certain ?')) {
      API.delete(`/pets/${id}`)
        .then(() => {
          window.location.replace(`/petform`);
        })
        .catch((err) => console.log(err));
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
          aria-hidden="true"
        >
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={avatarUploadRef}
            onChange={handleAvatarFileInputChange}
            style={{ display: 'none' }}
          />
          <AvatarPet imagePet={image} alt={`${name} image`} />
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
              <input
                type="text"
                required
                className="bg-grey appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Croc Blanc"
                {...register('name')}
              />
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="animalCategoryId">
              Catgéorie de votre animal <span className="text-danger">*</span>
              <select
                {...register('animalCategoryId', { required: true })}
                defaultValue=""
                className="appearance-none rounded-none relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {animalCategoryList &&
                  animalCategoryList.map((element) => (
                    <option key={element.id} value={element.id}>
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
                className="appearance-none rounded-none relative block w-96 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une race
                </option>
                {filteredBreedList &&
                  filteredBreedList.map((element) => (
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
              className="text-center font-bold rounded bg-primary
                hover:bg-secondary text-white  p-3 m-5 md:bg-white md:text-primary md:hover:bg-grey"
            >
              {URLId ? 'Modifier cet animal' : 'Ajouter un animal'}
            </button>
          </div>
          {URLId ? (
            <div className="flex flex-col">
              <button
                type="button"
                className="text-center font-bold rounded bg-red-500
                hover:bg-secondary text-white  p-3 m-5 md:text-white md:hover:bg-red-200"
                onClick={handleDeletePetProfile}
              >
                Supprimer cet animal
              </button>
            </div>
          ) : null}
        </form>
      </div>

      <div className="flex items-center flex-col justify-center m-5">
        <h2 className="my-6 text-center text-3xl font-extrabold">
          Les aliments favoris de mon animal
        </h2>
        {!URLId ? (
          <p>
            Veuillez d'abord ajouter cet animal avant de lui ajouter des favoris
          </p>
        ) : null}
        {petFavoritesList.length !== 0 && (
          <ul>
            {petFavoritesList.map((fav) => {
              return (
                <li
                  key={fav.id}
                  className="relative bg-white mb-6 rounded-lg w-full p-2"
                >
                  <button
                    type="button"
                    aria-label="Favorite"
                    onClick={() => handleClickDeleteFavorite(fav)}
                    className="absolute right-5 top-5"
                  >
                    <FontAwesomeIcon
                      className="text-3xl text-red-500"
                      icon={faTimesCircle}
                    />
                  </button>
                  <div className="flex items-center">
                    <img
                      className="w-40 h-40 bg-auto rounded-xl mr-5"
                      src={fav.Favorites.Foods.image}
                      alt="imageproduit"
                    />
                    <div>
                      <p className="font-bold text-xl">
                        {fav.Favorites.Foods.name}
                      </p>
                      <p className="text-base">{fav.Favorites.Foods.brand}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center flex-col justify-center m-5">
        <h2 className="my-6 text-center text-3xl font-extrabold">
          Ma liste de favoris
        </h2>
        {filteredFavoriteList.length !== 0 && (
          <ul>
            {filteredFavoriteList.map((fav) => {
              return (
                <li
                  key={fav.id}
                  className="relative bg-white mb-6 rounded-lg w-full p-2"
                >
                  <button
                    type="button"
                    aria-label="FilteredFavorites"
                    onClick={() => handleClickFilteredFavorite(fav)}
                  >
                    <div className="absolute right-5 top-5 notPetFavorite" />

                    <div className="flex items-center">
                      <img
                        className="w-40 h-40 bg-auto rounded-xl mr-5"
                        src={fav.Foods.image}
                        alt="imageproduit"
                      />
                      <div>
                        <p className="font-bold text-xl">{fav.Foods.name}</p>
                        <p className="text-base">{fav.Foods.brand}</p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
