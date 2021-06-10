import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ResultsContext from '../contexts/ResultsContext';

export default function ResultsPage() {
  const { resultsList } = useContext(ResultsContext);

  return resultsList.length !== 0 ? (
    <div className="flex items-center flex-col justify-center">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold">
          Les résultats de votre recherche
        </h1>
      </div>
      <br />

      <ul>
        {resultsList.map((result) => (
          <li>
            <Link
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
              to={`/ficheproduit/${result.name}`}
            >
              <img
                className="w-40 h-40 bg-auto rounded-xl mr-5"
                src={result.image}
                alt={result.name}
              />

              <div>
                <p className="font-bold text-xl">{result.brand}</p>
                <p className="text-base">{result.name}</p>
                <p className="text-base">{result.barcode}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Désolé, votre recherche n'a produit aucun résultat</h1>
  );
}
