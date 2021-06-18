import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ResultsContext from '../contexts/ResultsContext';
import FoodContext from '../contexts/FoodContext';

export default function ResultsPage() {
  const { resultsList } = useContext(ResultsContext);
  const { setFoodDetails } = useContext(FoodContext);

  useEffect(() => {
    setFoodDetails([]);
  }, []);

  return resultsList.length !== 0 ? (
    <div className="flex items-center flex-col justify-center p-5">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold m-16">
          Les résultats de votre recherche
        </h1>
      </div>
      <br />

      <ul>
        {resultsList.map((result) => (
          <li key={result.id}>
            <NavLink
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
              to={{
                pathname: `/ficheproduit/?id=${result.id}`,
              }}
            >
              <img
                className=" flex-none h-20 w-20 object-cover rounded-xl mr-5 md:h-40 md:w-40 "
                src={result.image}
                alt={result.name}
              />
              <div>
                <p className="font-bold text-base md:text-xl ">
                  {result.brand}
                </p>
                <p className="text-sm md:text-base">{result.name}</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Désolé, votre recherche n'a produit aucun résultat</h1>
  );
}
