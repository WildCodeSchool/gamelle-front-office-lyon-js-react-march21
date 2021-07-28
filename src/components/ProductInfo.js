/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import qs from 'query-string';
import { NavLink } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  FacebookShareCount,
} from 'react-share';
import API from '../APIClient';
import { FoodContext } from '../contexts/FoodContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DetailsRating from './DetailsRating';
import ModalSignIn from './modalSignIn';

export default function ProductInfo() {
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);
  const {
    profile,
    toggleFoodInFavorites,
    favoritesIdsList,
    setShowModal,
    showModal,
  } = useContext(CurrentUserContext);
  const [statsInfos, setStatsInfos] = useState(null);
  const { addToast } = useToasts();

  useEffect(async () => {
    API.get(`/foods/${id}`)
      .then(async (res) => {
        await setFoodDetails(res.data);
        if (profile) {
          const userId = profile.id;
          const foodId = parseInt(id, 10);
          API.post(`/histories`, { foodId, userId })
            .then(() => {})
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

    const foodGamelle = await API.get(`/foods/gamelle/${id}`).then(
      (res) => res.data
    );

    // statistics
    const userId = profile ? profile.id : null;
    setStatsInfos({
      userId,
      requestInfo: 'foodDetails',
      brand: foodGamelle.brand,
      foodTypeId:
        foodGamelle.foodTypeId !== ''
          ? parseInt(foodGamelle.foodTypeId, 10)
          : null,
      animalCategoryId:
        foodGamelle.animalCategoryId !== ''
          ? parseInt(foodGamelle.animalCategoryId, 10)
          : null,
      searchText: foodGamelle.searchedWords,
      foodId: foodGamelle.id,
      requestSentAt: new Date(),
    });
  }, []);

  useEffect(() => {
    if (statsInfos)
      API.post(`/statistics`, statsInfos)
        .then(() => {})
        .catch((err) => console.log(err));
  }, [statsInfos]);

  const handleClickFavorite = async () => {
    const isFavorite = !!favoritesIdsList[id];
    const foodId = parseInt(id, 10);
    if (profile) {
      if (isFavorite) {
        API.delete(`/favorites/${foodId}`)
          .then(async () => {
            toggleFoodInFavorites(foodId);
            setStatsInfos({
              ...statsInfos,
              foodId,
              requestInfo: 'removeFavorite',
              requestSentAt: new Date(),
            });
          })
          .catch((err) => console.log(err));
      } else {
        API.post(`/favorites`, { foodId })
          .then(async () => {
            toggleFoodInFavorites(foodId);
            setStatsInfos({
              ...statsInfos,
              foodId,
              requestInfo: 'addFavorite',
              requestSentAt: new Date(),
            });
          })
          .catch((err) => console.log(err));
      }
    } else {
      addToast('Vous devez être connecté pour mettre un aliment en favori !', {
        appearance: 'error',
      });
      setShowModal(true);
    }
  };

  const handleNotConnected = () => {
    if (!profile) {
      addToast(
        'Vous devez être connecté pour donner votre avis sur un aliment !',
        {
          appearance: 'error',
        }
      );
      setShowModal(true);
    }
  };

  const shareUrl = `${window.location.origin}/product-info-page/?id=${id}`;
  const title = 'Gamelle : ';

  return (
    <>
      {foodDetails && (
        <>
          <div className="flex flex-col md:p-10">
            <div className="relative md:flex md:flex-col bg-white">
              <div className="absolute right-0 mr-5 mt-3">
                <button
                  type="button"
                  aria-label="Favorite"
                  onClick={() => handleClickFavorite(foodDetails)}
                  className={
                    // eslint-disable-next-line no-extra-boolean-cast
                    !!favoritesIdsList[id] ? 'isFavorite' : 'notFavorite'
                  }
                />
              </div>
              <div className="flex flex-col md:flex-col lg:flex-row items-center lg:p-10">
                <div key={foodDetails.id} className="flex-1 mt-14 md:m-5">
                  <img
                    className="h-full w-60 lg:max-w-xs rounded-xl object-cover "
                    src={foodDetails.image_aws_url}
                    alt={foodDetails.name}
                  />
                </div>

                <div className="m-3">
                  <div className="font-bold text-4xl text-center">
                    {foodDetails.brand}
                  </div>
                  <div className="text-base text-center">
                    {foodDetails.name}
                  </div>
                </div>
                <div className="flex flex-col md:flex-1 right-0 items-end">
                  <div className="flex flex-col justify-center items-center mr-5">
                    <DetailsRating />
                    <NavLink
                      to={profile ? `/give-advice/?id=${id}` : '#'}
                      onClick={handleNotConnected}
                    >
                      <button
                        className="btn btn-primary btn-primary:hover"
                        type="button"
                      >
                        Je donne mon avis
                      </button>
                    </NavLink>

                    <div className="flex mt-3 justify-center">
                      <div className="mr-3">
                        <TwitterShareButton
                          url={shareUrl}
                          title={title}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </div>
                      <div>
                        <FacebookShareButton
                          url={shareUrl}
                          title={title}
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={32} round />
                          <div>
                            <FacebookShareCount
                              url={shareUrl}
                              className="Demo__some-network__share-count"
                            >
                              {(count) => count}
                            </FacebookShareCount>
                          </div>
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-grey ">
                <p className="text-xm h-auto p-5">
                  <span className="text-xl">Composition : </span>
                  {foodDetails.ingredients_text ? (
                    foodDetails.ingredients_text
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 bg-gray-200">
                  Constituants analytiques (en %)
                </h1>
                <p className="text-xm md:text-xl px-5 py-1">
                  Humidité :{' '}
                  {foodDetails.humidity ? (
                    foodDetails.humidity
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xm md:text-xl px-5 py-1">
                  Protéines :{' '}
                  {foodDetails.proteins_100g ? (
                    foodDetails.energy_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xm md:text-xl px-5 py-1">
                  Mat. grasses brutes :{' '}
                  {foodDetails.fat_100g ? (
                    foodDetails.fat_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xm md:text-xl px-5 py-1">
                  Mat. minérales (ou cendres) :{' '}
                  {foodDetails.cendars_100g ? (
                    foodDetails.cendars_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xm md:text-xl px-5 py-1">
                  Cellulose brute :{' '}
                  {foodDetails.cellulose_100g ? (
                    foodDetails.cellulose_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="px-5 py-1">
                  <h1 className="text-2xl">Calcium et Phosphore :</h1>
                  <ul className="bg-grey m-5">
                    <li className="text-xm">
                      Calcium :{' '}
                      {foodDetails.calcium_100g ? (
                        foodDetails.calcium_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li className="text-xm">
                      Phosphore :{' '}
                      {foodDetails.phosphorus_100g ? (
                        foodDetails.phosphorus_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li className="text-xm">
                      Ratio calcium/phosphore :{' '}
                      {foodDetails.phosphorus_100g &&
                      foodDetails.calcium_100g ? (
                        (
                          foodDetails.calcium_100g / foodDetails.phosphorus_100g
                        ).toFixed(2)
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}{' '}
                    </li>
                  </ul>
                </div>
                <p className="text-xm md:text-xl px-5 py-1">
                  Sodium :{' '}
                  {foodDetails.sodium_100g ? (
                    foodDetails.sodium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xm md:text-xl px-5 py-1">
                  Potassium :{' '}
                  {foodDetails.potassium_100g ? (
                    foodDetails.potassium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="px-5 py-1">
                  <h1 className="text-2xl">Omega :</h1>
                  <ul className=" bg-grey m-5">
                    <li className="text-xm">
                      Omega 3 :{' '}
                      {foodDetails.omega3_fat_100g ? (
                        foodDetails.omega3_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li className="text-xm">
                      Omega 6 :{' '}
                      {foodDetails.omega6_fat_100g ? (
                        foodDetails.omega6_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                  </ul>
                </div>

                <p className="text-xm md:text-xl px-5 py-1">
                  Vitamines (en UI/Kg) :{' '}
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 bg-gray-200">
                  Additifs
                </h1>
                <p className="text-xm md:text-xl px-5 py-1">
                  Vitamines (en UI/Kg) :{' '}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && <ModalSignIn />}
    </>
  );
}
