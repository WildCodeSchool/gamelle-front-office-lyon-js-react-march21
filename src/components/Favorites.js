/* eslint-disable no-console */
import { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DeviceContext from '../contexts/DeviceContext';
import API from '../APIClient';

export default function Favorites() {
  const { profile, toggleFoodInFavorites } = useContext(CurrentUserContext);
  const [favoritesList, setFavoritesList] = useState([]);
  const { userDevice } = useContext(DeviceContext);

  useEffect(() => {
    if (profile) {
      API.get(`/favorites`)
        .then((res) => {
          setFavoritesList(res.data);
          // update statistics
          const userId = profile.id;
          const statsInfos = {
            userId,
            requestInfo: 'favorites',
            device: userDevice.device,
            osName: userDevice.osName,
            requestSentAt: new Date(),
            ipv4Address: userDevice.ipv4Address,
            ipv6Address: userDevice.ipv6Address,
          };

          API.post(`/statistics`, statsInfos)
            .then(() => {})
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [profile]);

  const handleClickDelete = (item) => {
    const { foodId } = item;
    API.delete(`/favorites/${foodId}`)
      .then(() => {
        toggleFoodInFavorites(item.foodId);
        setFavoritesList(favoritesList.filter((fav) => fav.foodId !== foodId));
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
            <li
              key={fav.id}
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
            >
              <img
                className="w-40 h-40 bg-auto rounded-xl mr-5"
                src={fav.Foods.image}
                alt="imageproduit"
              />

              <div>
                <p className="font-bold text-xl">{fav.Foods.name}</p>
                <p className="text-base">{fav.Foods.brand}</p>
              </div>
              <button
                type="button"
                aria-label="Favorite"
                onClick={() => handleClickDelete(fav)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>
      {profile
        ? 'Désolé, votre liste de favoris est vide'
        : 'Vous devez être connecté pour accéder à votre liste de favoris'}
    </div>
  );
}
