/* eslint-disable no-console */
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import FoodContext from '../contexts/FoodContext';

const apiBase = process.env.REACT_APP_API_BASE_URL;

export default function FicheProduit() {
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const location = useLocation();

  useEffect(() => {
    const productId = location.state != null ? location.state.productId : null;
    console.log('productId     ', productId);

    axios
      .get(`${apiBase}/foods/${productId}`)
      .then((res) => {
        setFoodDetails(res.data);
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
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
