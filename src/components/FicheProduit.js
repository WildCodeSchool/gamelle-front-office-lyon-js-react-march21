/* eslint-disable no-console */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import qs from 'query-string';
import FoodContext from '../contexts/FoodContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const apiBase = process.env.REACT_APP_API_BASE_URL;

export default function FicheProduit() {
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);
  const { profile } = useContext(CurrentUserContext);
  const [favoriteStatus, setFavoriteStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBase}/foods/${id}`)
      .then(async (res) => {
        await setFoodDetails(res.data);
        if (profile !== null) {
          const userId = profile.id;
          const foodId = parseInt(id, 10);
          axios
            .post(`${apiBase}/histories`, { foodId, userId })
            .then((hist) => {
              console.log(hist);
              setFavoriteStatus(hist.data.favoriteId);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('foodDetails   ', foodDetails);

  return (
    <>
      <h1>Fiche produit</h1>
      {foodDetails && (
        <>
          <div className="flex items-center justify-center">
            <div
              key={foodDetails.id}
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
            >
              <img
                className="w-20 h-20 object-contain mr-4 rounded-full p-3"
                src={foodDetails.image_aws_url}
                alt={foodDetails.image_aws_url}
              />
              <div>
                <div className="font-bold text-xl">{foodDetails.brand}</div>
                <div className="text-base">{foodDetails.name}</div>
                <div className="text-base">
                  Protéines pour 100g : {foodDetails.proteins_100g}
                </div>
                <div className="text-base">
                  Energie pour 100g :
                  {foodDetails.energy_100g ? (
                    foodDetails.energy_100g
                  ) : (
                    <span className="italic text-xs"> inconnu</span>
                  )}
                </div>
                <div
                  className={favoriteStatus ? 'isFavorite' : 'notFavorite'}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
