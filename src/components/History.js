/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DeviceContext from '../contexts/DeviceContext';
import API from '../APIClient';

export default function History() {
  const [historyList, setHistoryList] = useState([]);
  const { profile, toggleFoodInFavorites, favoritesIdsList } =
    useContext(CurrentUserContext);
  const { userDevice } = useContext(DeviceContext);

  useEffect(() => {
    if (profile) {
      API.get(`/histories`)
        .then((res) => {
          setHistoryList(res.data);
          // update statistics
          const userId = profile.id;
          const statsInfos = {
            userId,
            requestInfo: 'history',
            device: userDevice.device,
            osName: userDevice.osName,
            requestSentAt: new Date(),
          };

          API.post(`/statistics`, statsInfos)
            .then(() => {})
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClickFavorite = async (item) => {
    const isFavorite = !!favoritesIdsList[item.foodId];

    if (isFavorite) {
      const { foodId } = item;
      API.delete(`/favorites/${foodId}`)
        .then(() => {
          toggleFoodInFavorites(item.foodId);
        })
        .catch((err) => console.log(err));
    } else {
      API.post(`/favorites`, { foodId: item.foodId })
        .then(() => {
          toggleFoodInFavorites(item.foodId);
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
              key={hist.id}
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
