/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import FavoritesContext from '../contexts/FavoritesContext';
import API from '../APIClient';

export default function History() {
  const [historyList, setHistoryList] = useState([]);
  const { favoritesList, setFavoritesList } = useContext(FavoritesContext);
  const { profile } = useContext(CurrentUserContext);
  console.log('profile   ', profile);

  useEffect(() => {
    if (profile) {
      API.get(`/histories`)
        .then((res) => {
          setHistoryList(res.data);
        })
        .catch((err) => console.log(err));
      API.get(`/favorites`)
        .then((res) => {
          setFavoritesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClickFavorite = (item) => {
    if (item.favoriteId) {
      console.log('dejà fav');
    } else {
      API.get(`/favorites`)
        .then((res) => {
          console.log(res);
          // setHistoryList(res.data);
        })
        .catch((err) => console.log(err));
    }

    console.log(item.userId);
  };

  console.log('favoritesList   ', favoritesList);
  console.log('historyList   ', historyList);

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
                className={hist.favoriteId ? 'isFavorite' : 'notFavorite'}
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
