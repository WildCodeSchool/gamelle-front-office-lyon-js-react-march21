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
      {foodDetails && (
        <>
          <div className="flex items-center flex-col justify-center p-5">
            <div className="titre ">
              <h1 className="mt-6 text-center text-3xl font-extrabold m-16">
                Fiche Produit
              </h1>
            </div>
            <br />

            <div className="flex flex-col bg-white shadow shadow-lg dark:bg-darkpurple w-6/12 m-10 ">
              <div className="flex items-center  border border-grey">
                <div key={foodDetails.id} className="m-5">
                  <img
                    className="mx-auto h-96 scale-0 rounded-xl"
                    src={foodDetails.image_aws_url}
                    alt={foodDetails.image_aws_url}
                  />
                </div>

                <div className="titre">
                  <div className="font-bold text-4xl">{foodDetails.brand}</div>
                  <div className="text-base">{foodDetails.name}</div>
                </div>
              </div>

              <div className="container">
                <p className="h-auto border border-grey p-5">
                  <span className="text-xl">Composition : </span>
                  {foodDetails.ingredients_text ? (
                    foodDetails.ingredients_text
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 border border-grey bg-gray-200">
                  Constituants analytiques (en %)
                </h1>
                <p className="text-xl border border-grey px-5 py-1">
                  Humidité :
                  {foodDetails.humidity ? (
                    foodDetails.humidity
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Protéines :{' '}
                  {foodDetails.proteins_100g ? (
                    foodDetails.energy_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Mat. grasses brutes :
                  {foodDetails.fat_100g ? (
                    foodDetails.fat_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Mat. minérales (ou cendres) :
                  {foodDetails.cendars_100g ? (
                    foodDetails.cendars_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Cellulose brute :
                  {foodDetails.cellulose_100g ? (
                    foodDetails.cellulose_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="border border-grey px-5 py-1">
                  <h1 className="text-2xl">Calcium et Phosphore :</h1>
                  <ul className="bg-grey m-5">
                    <li>
                      Calcium :
                      {foodDetails.calcium_100g ? (
                        foodDetails.calcium_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>
                      Phosphore :
                      {foodDetails.phosphorus_100g ? (
                        foodDetails.phosphorus_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>Ratio calcium/phosphore : </li>
                  </ul>
                </div>
                <p className="text-xl border border-grey px-5 py-1">
                  Sodium :
                  {foodDetails.sodium_100g ? (
                    foodDetails.sodium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <p className="text-xl border border-grey px-5 py-1">
                  Potassium :
                  {foodDetails.potassium_100g ? (
                    foodDetails.potassium_100g
                  ) : (
                    <span className="italic text-xs"> Inconnu</span>
                  )}
                </p>
                <div className="border border-grey px-5 py-1">
                  <h1 className="text-2xl">Omega :</h1>
                  <ul className=" bg-grey m-5">
                    <li>
                      Omega 3 :
                      {foodDetails.omega3_fat_100g ? (
                        foodDetails.omega3_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                    <li>
                      Omega 6 :
                      {foodDetails.omega6_fat_100g ? (
                        foodDetails.omega6_fat_100g
                      ) : (
                        <span className="italic text-xs"> Inconnu</span>
                      )}
                    </li>
                  </ul>
                </div>
                <p className="text-xl border border-grey px-5 py-1">
                  Vitamines (en UI/Kg) :
                </p>
                <h1 className="font-bold text-2xl px-10 py-6 border border-grey bg-gray-200">
                  Additifs
                </h1>
                <p className="text-xl border border-grey px-5 py-1">
                  Vitamines (en UI/Kg) :
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
