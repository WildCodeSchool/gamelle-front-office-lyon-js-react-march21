/* eslint-disable no-console */
import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import FavoritesContext from '../contexts/FavoritesContext';
import API from '../APIClient';

export default function Favorites() {
  const { favoritesList, setFavoritesList } = useContext(FavoritesContext);
  const { profile } = useContext(CurrentUserContext);

  useEffect(() => {
    if (profile) {
      API.get(`/favorites`)
        .then((res) => {
          setFavoritesList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClickDelete = (item) => {
    const { id } = item;
    API.delete(`/favorites/${id}`)
      .then(() => {
        API.get(`/favorites`)
          .then((result) => {
            setFavoritesList(result.data);
          })
          .catch((err) => console.log(err));
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
