/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import API from '../APIClient';
import ProductInfo from './ProductInfo';

export default function History() {
  const location = useLocation();
  const [historyList, setHistoryList] = useState([]);
  const { profile, toggleFoodInFavorites, favoritesIdsList } =
    useContext(CurrentUserContext);
  const [statsInfos, setStatsInfos] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

  useEffect(() => {
    if (profile) {
      API.get(`/histories`)
        .then(async (res) => {
          setHistoryList(res.data);
          // update statistics
          const userId = profile.id;
          await setStatsInfos({
            userId,
            requestInfo: 'history',
            requestSentAt: new Date(),
          });
        })
        .catch((err) => console.log(err));
    }
  }, [profile]);

  useEffect(() => {
    if (profile && statsInfos) {
      API.post(`/statistics`, statsInfos)
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [statsInfos]);

  const handleClickFavorite = async (event, item) => {
    event.stopPropagation();
    event.preventDefault();
    const isFavorite = !!favoritesIdsList[item.foodId];
    const { foodId } = item;
    if (isFavorite) {
      API.delete(`/favorites/${foodId}`)
        .then(async () => {
          toggleFoodInFavorites(item.foodId);
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
    } else {
      API.post(`/favorites`, { foodId })
        .then(async () => {
          toggleFoodInFavorites(item.foodId);
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
            requestInfo: 'addFavorite',
            requestSentAt: new Date(),
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return historyList.length !== 0 ? (
    <div className="flex items-center flex-col justify-center">
      <div className="mt-10 mb-16">
        <h1 className="text-center text-3xl font-extrabold">Mon historique</h1>
      </div>
      <br />
      <div className="w-10/12 md:w-9/12">
        <ul>
          {historyList.map((hist) => {
            const isFavorite = !!favoritesIdsList[hist.foodId];
            return (
              <li key={hist.consultedAt} className="relative mb-6">
                <NavLink
                  to={{
                    pathname: `/product-info-page/?id=${hist.foodId}`,
                    state: { background: location },
                  }}
                >
                  <div
                    className="p-5  bg-white rounded-lg w-full flex flex-col items-center md:flex-row md:transform transition duration-500 hover:scale-95 lg:transform lg:hover:scale-105"
                    onClick={handleToggleModal}
                    role="presentation"
                  >
                    <img
                      className="p-1 w-full h-72 rounded-lg md:rounded-xl lg:rounded-lg object-contain md:h-40 md:w-40 lg:h-40 lg:w-40"
                      src={hist.Foods.image}
                      alt={hist.Foods.name}
                    />

                    <p className="text-base w-full text-center font-bold">
                      {hist.Foods.name}
                    </p>
                    <div className="absolute right-1 top-1 md:right-3 md:top-3">
                      <button
                        type="button"
                        aria-label="Favorite"
                        onClick={(event) => handleClickFavorite(event, hist)}
                        className={isFavorite ? 'isFavorite' : 'notFavorite'}
                      />
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {showModalInfo ? (
        <div>
          <div
            role="presentation"
            className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={handleToggleModal}
          >
            <div className="w-11/12 h-4/5 md:h-2/3 lg:h-3/4 relative overflow-x-hidden rounded-lg">
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
        ? 'Désolé, votre historique est vide'
        : 'Vous devez être connecté pour accéder à votre historique'}
    </div>
  );
}
