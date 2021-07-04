/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DeviceContext } from '../contexts/DeviceContext';
import API from '../APIClient';

export default function History() {
  const [historyList, setHistoryList] = useState([]);
  const { profile, toggleFoodInFavorites, favoritesIdsList } =
    useContext(CurrentUserContext);
  const { userDevice } = useContext(DeviceContext);
  const [statsInfos, setStatsInfos] = useState(null);

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
            device: userDevice.device,
            osName: userDevice.osName,
            requestSentAt: new Date(),
            ipv4Address: userDevice.ipv4Address,
            ipv6Address: userDevice.ipv6Address,
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (profile && statsInfos) {
      API.post(`/statistics`, statsInfos)
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [statsInfos]);

  const handleClickFavorite = async (item) => {
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
    <div className="flex items-center flex-col justify-center m-5">
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
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
            >
              <img
                className="w-40 h-40 bg-auto rounded-xl mr-5"
                src={hist.Foods.image}
                alt="imageproduit"
              />

              <div>
                <p className="font-bold text-xl">{hist.Foods.name}</p>
                <p className="text-base">{hist.Foods.brand}</p>
              </div>

              <button
                type="button"
                aria-label="Favorite"
                onClick={() => handleClickFavorite(hist)}
                className={isFavorite ? 'isFavorite' : 'notFavorite'}
              />
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>
      {profile
        ? 'Désolé, votre historique est vide'
        : 'Vous devez être connecté pour accéder à votre historique'}
    </div>
  );
}
