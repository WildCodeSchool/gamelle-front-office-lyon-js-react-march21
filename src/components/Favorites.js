/* eslint-disable no-console */
import { useEffect, useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import API from '../APIClient';
import ProductInfo from './ProductInfo';

export default function Favorites() {
  const location = useLocation();
  const { profile, toggleFoodInFavorites } = useContext(CurrentUserContext);
  const [favoritesList, setFavoritesList] = useState([]);
  const [statsInfos, setStatsInfos] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

  useEffect(() => {
    if (profile && statsInfos) {
      API.post(`/statistics`, statsInfos)
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [statsInfos]);

  useEffect(() => {
    if (profile) {
      API.get(`/favorites`)
        .then((res) => {
          setFavoritesList(res.data);
          // update statistics
          const userId = profile.id;
          setStatsInfos({
            ...statsInfos,
            userId,
            requestInfo: 'favorites',
            requestSentAt: new Date(),
          });
        })
        .catch((err) => console.log(err));
    }
  }, [profile]);

  const handleClickDelete = (event, item) => {
    event.stopPropagation();
    event.preventDefault();
    const { foodId } = item;
    API.delete(`/favorites/${foodId}`)
      .then(() => {
        toggleFoodInFavorites(item.foodId);
        setFavoritesList(favoritesList.filter((fav) => fav.foodId !== foodId));
        setStatsInfos({
          ...statsInfos,
          brand: item.Foods.brand,
          foodTypeId:
            item.Foods.foodTypeId !== ''
              ? parseInt(item.Foods.foodTypeId, 10)
              : null,
          animalCategoryId:
            item.Foods.animalCategoryId !== ''
              ? parseInt(item.Foods.animalCategoryId, 10)
              : null,
          foodId,
          requestInfo: 'removeFavorite',
          requestSentAt: new Date(),
        });
      })
      .catch((err) => console.log(err));
  };

  return favoritesList.length !== 0 ? (
    <div className="flex items-center flex-col justify-center m-5">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold m-16">
          Mes favoris
        </h1>
      </div>
      <br />

      <ul>
        {favoritesList.map((fav) => {
          return (
            <li key={fav.id} className="relative mb-6 rounded-lg w-full">
              <NavLink
                to={{
                  pathname: `/product-info-page/?id=${fav.foodId}`,
                  state: { background: location },
                }}
              >
                <div
                  className="bg-white rounded-lg w-full flex flex-col md:flex-row lg:flex-row items-center md:transform transition duration-500 hover:scale-95 lg:transform transition duration-500 hover:scale-105"
                  onClick={handleToggleModal}
                  role="presentation"
                >
                  <div className="absolute right-5 top-5">
                    <button
                      type="button"
                      aria-label="Favorite"
                      onClick={(event) => handleClickDelete(event, fav)}
                    >
                      <FontAwesomeIcon
                        className="text-3xl text-red-500"
                        icon={faTimesCircle}
                      />
                    </button>
                  </div>
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
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
      {showModalInfo ? (
        <div>
          <div
            role="presentation"
            className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={handleToggleModal}
          >
            <div className="w-4/5 h-3/4 md:h-2/3 lg:h-3/4 relative overflow-x-hidden rounded-lg">
              <div
                role="presentation"
                className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <ProductInfo />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div>
      {profile
        ? 'Désolé, votre liste de favoris est vide'
        : 'Vous devez être connecté pour accéder à votre liste de favoris'}
    </div>
  );
}
