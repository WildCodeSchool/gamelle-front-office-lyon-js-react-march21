/* eslint-disable */
import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ResultsContext } from '../contexts/ResultsContext';
import ModalInfo from './ModalInfo';
import SwipDrawer from './SwipDrawer';

export default function ResultsProducts() {
  const location = useLocation();
  const { resultsList } = useContext(ResultsContext);

  return (
    resultsList.length !== 0 && (
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="m-6">Les résultats de votre recherche</h1>
        <div className="w-1/2">
          <ul>
            {resultsList.map((result) => (
              <li key={result.id} className="mb-6 rounded-lg">
                <NavLink
                  to={{
                    pathname: `/product-info-page/?id=${result.id}`,
                    state: { background: location },
                  }}
                >
                  <div className="bg-white rounded-lg w-full flex flex-col md:flex-row lg:flex-row items-center shadow-lg">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-40 rounded-lg md:rounded-xl lg:rounded-lg object-cover md:h-40 md:w-40 lg:h-40 lg:w-40 " // Taille d'image à redéfinir !!
                    />
                    <div className="flex flex-col justify-center items-center w-full">
                      <p className="font-bold">{result.brand}</p>
                      <p className="text-xs  w-full text-center md:text-base lg:text-base">
                        {result.name}
                      </p>
                    </div>
                    <ModalInfo />
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
