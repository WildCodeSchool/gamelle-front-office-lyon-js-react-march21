import { useContext } from 'react';
import ResultsContext from '../contexts/ResultsContext';

export default function ResultsPage() {
  const { resultsList } = useContext(ResultsContext);

  return resultsList.length !== 0 ? (
    <div>
      <h1>Les résultats de votre recherche</h1>
      <ul>
        {resultsList.map((result) => (
          <li key={result.id} className="flex m-5">
            <img
              className="w-20 h-20 rounded-xl mr-2"
              src={result.image}
              alt={result.name}
            />
            <div>
              <div className="font-bold">{result.brand}</div>
              <div>{result.name}</div>
              <div>{result.barcode}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Désolé, votre recherche n'a produit aucun résultat</h1>
  );
}
