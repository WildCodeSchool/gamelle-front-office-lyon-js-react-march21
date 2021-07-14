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

export default function ProductInfo() {
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);
  const { profile, toggleFoodInFavorites, favoritesIdsList } =
    useContext(CurrentUserContext);
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
    }
  };

  const shareUrl = `${process.env.REACT_APP_FRONT_BASE_URL}/product-info-page/?id=${id}`;
  const title = 'Gamelle : ';

  return (
    <>
      {foodDetails && (
        <>
          {/* Global Container */}
          <div className="flex items-center flex-col">
            <div className="relative md:flex md:flex-col lg:w-10/12 md:w-10/12 md:m-10 bg-white">
              {/* Header Container */}
              <div className="flex items-center">
                <div key={foodDetails.id} className="m-5">
                  <img
                    className="flex-none h-40 object-cover rounded-xl mr-5 md:h-96 md:w-72"
                    src={foodDetails.image_aws_url}
                    alt={foodDetails.image_aws_url}
                  />
                </div>
                {/* Top or Left Container */}
                <div>
                  {/* Brand Section */}
                  <div className="font-bold text-3xl">{foodDetails.brand}</div>
                  {/* ProductName Section */}
                  <div className="text-base">{foodDetails.name}</div>
                </div>
                {/* TODO Adjust the display by reducing the gaps between mobile and laptop by being as responsive as possible */}
                <div className="border border-red-700">
                  {/* Favorite Section */}
                  <div className="absolute top-0 right-0 mr-3 mt-3">
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
                  {/* Rating Section */}
                  <div className="flex flex-col w-full right-0 items-end">
                    <div className="w-2/3 flex justify-center flex-col items-center">
                      {/* Stats Section */}
                      <DetailsRating />
                      {/* GiveAdvice Section */}
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
                      {/* Social Section */}
                      <div className="flex mt-3 justify-center">
                        <div className="mr-3">
                          {/* SocialButtons Section */}
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
              </div>
              {/* B Section */}
              <div className="container">
                <p className="h-auto border border-grey p-5">
                  <span className="text-xl">Composition : </span>
                  {foodDetails.ingredients_text ? (
                    foodDetails.ingredients_text
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 border border-grey bg-gray-200">
                  Constituants analytiques (en %)
                </h1>
                <p className="text-xl border border-grey px-5 py-1">
                  Humidité :{' '}
                  {foodDetails.humidity ? (
                    foodDetails.humidity
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Protéines :{' '}
                  {foodDetails.proteins_100g ? (
                    foodDetails.energy_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Mat. grasses brutes :{' '}
                  {foodDetails.fat_100g ? (
                    foodDetails.fat_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Mat. minérales (ou cendres) :{' '}
                  {foodDetails.cendars_100g ? (
                    foodDetails.cendars_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Cellulose brute :{' '}
                  {foodDetails.cellulose_100g ? (
                    foodDetails.cellulose_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="border border-grey px-5 py-1">
                  <h1 className="text-2xl">Calcium et Phosphore :</h1>
                  <ul className="bg-grey m-5">
                    <li>
                      Calcium :{' '}
                      {foodDetails.calcium_100g ? (
                        foodDetails.calcium_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>
                      Phosphore :{' '}
                      {foodDetails.phosphorus_100g ? (
                        foodDetails.phosphorus_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>
                      Ratio calcium/phosphore :{' '}
                      {foodDetails.phosphorus_100g &&
                      foodDetails.calcium_100g ? (
                        foodDetails.calcium_100g / foodDetails.phosphorus_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}{' '}
                    </li>
                  </ul>
                </div>
                <p className="text-xl border border-grey px-5 py-1">
                  Sodium :{' '}
                  {foodDetails.sodium_100g ? (
                    foodDetails.sodium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Potassium :{' '}
                  {foodDetails.potassium_100g ? (
                    foodDetails.potassium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="border border-grey px-5 py-1">
                  <h1 className="text-2xl">Omega :</h1>
                  <ul className=" bg-grey m-5">
                    <li>
                      Omega 3 :{' '}
                      {foodDetails.omega3_fat_100g ? (
                        foodDetails.omega3_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>
                      Omega 6 :{' '}
                      {foodDetails.omega6_fat_100g ? (
                        foodDetails.omega6_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                  </ul>
                </div>

                <p className="text-xl border border-grey px-5 py-1">
                  Vitamines (en UI/Kg) :{' '}
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 border border-grey bg-gray-200">
                  Additifs
                </h1>
                <p className="text-xl border border-grey px-5 py-1">
                  Vitamines (en UI/Kg) :{' '}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
