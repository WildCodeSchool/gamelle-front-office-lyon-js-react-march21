// import axios from 'axios';
import { useContext } from 'react';
// import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import ResultsContext from '../contexts/ResultsContext';
// import FoodContext from '../contexts/FoodContext';

export default function ResultsPage() {
  const { resultsList } = useContext(ResultsContext);

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
                pathname: `/ficheproduit`,
                state: {
                  productId: result.id,
                },
              }}
            >
              <img
                className="w-40 h-40 object-contain bg-gray-300 rounded-xl mr-5"
                src={result.image}
                alt={result.name}
              />
              <div>
                <p className="font-bold text-xl">{result.brand}</p>
                <p className="text-base">{result.name}</p>
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
