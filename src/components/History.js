/* eslint-disable no-console */
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import API from '../APIClient';

export default function History() {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  const [historyList, setHistoryList] = useState([]);
  const { profile } = useContext(CurrentUserContext);

  useEffect(() => {
    if (profile) {
      API.get(`${apiBase}/histories`)
        .then((res) => {
          setHistoryList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClickFavorite = () => {
    console.log('clic');
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
          return (
            <li className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5">
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
