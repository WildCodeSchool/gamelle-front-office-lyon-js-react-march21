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
    <div className="flex items-center flex-col justify-center p-5">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold m-16">
          Mon historique
        </h1>
      </div>
      <br />

      <ul>
        {historyList.map((hist) => {
          const isFavorite = !!favoritesIdsList[hist.foodId];
          return (
            <li
              key={hist.consultedAt}
              className="relative mb-6 rounded-lg w-full"
            >
              <NavLink
                to={{
                  pathname: `/product-info-page/?id=${hist.foodId}`,
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
                      onClick={(event) => handleClickFavorite(event, hist)}
                      className={isFavorite ? 'isFavorite' : 'notFavorite'}
                    />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="flex-none h-20 w-20 object-cover rounded-xl mr-5 md:h-40 md:w-40"
                      src={hist.Foods.image}
                      alt="imageproduit"
                    />

                    <div>
                      <p className="font-bold text-base md:text-xl">
                        {hist.Foods.name}
                      </p>
                      <p className="text-sm md:text-base">{hist.Foods.brand}</p>
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
        ? 'Désolé, votre historique est vide'
        : 'Vous devez être connecté pour accéder à votre historique'}
    </div>
  );
}
