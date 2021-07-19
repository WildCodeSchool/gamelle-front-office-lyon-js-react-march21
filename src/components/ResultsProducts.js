import { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ResultsContext } from '../contexts/ResultsContext';
import TotalRating from './TotalRating';
import ProductInfo from './ProductInfo';
import './ResultsProducts.css';

export default function ResultsProducts() {
  const location = useLocation();
  const { resultsList, hasSearched } = useContext(ResultsContext);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

  // eslint-disable-next-line no-nested-ternary
  return !hasSearched ? (
    <div
      className="flex flex-col justify-center items-center w-full"
      id="full-content"
    >
      <p className="text-4xl">Bienvenue !</p>
      <p className="hidden italic md:flex md:text-base lg:flex lg:text-lg">
        Pour effectuer une recherche veuillez cliquer sur la flèche à gauche de
        l'écran
      </p>
      <p className="flex md:hidden lg:hidden text-center text-xs italic">
        Pour effectuer une recherche veuillez cliquer sur l'icône de recherche
        en bas de votre écran
      </p>
    </div>
  ) : resultsList.length !== 0 ? (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="m-6">{`Les ${resultsList.length} résultats de votre recherche`}</h1>
      <div className="w-11/12">
        <ul>
          {resultsList.map((result) => (
            <li key={result.id} className="mb-6 rounded-lg w-full">
              <NavLink
                to={{
                  pathname: `/product-info-page/?id=${result.id}`,
                  state: { background: location },
                }}
              >
                <div
                  className="bg-white rounded-lg w-full flex flex-col p-5 md:flex-row lg:flex-row items-center md:transform transition duration-500 hover:scale-95 lg:transform transition duration-500 hover:scale-105"
                  onClick={handleToggleModal}
                  role="presentation"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="p-1 w-full h-72 rounded-lg md:rounded-xl lg:rounded-lg object-contain md:h-40 md:w-40 lg:h-40 lg:w-40 " // Taille d'image à redéfinir !!
                  />

                  <p className="pt-2 text-base w-full text-center font-bold">
                    {result.name}
                  </p>
                  <br />
                  <div className="flex justify-center p">
                    <TotalRating foodId={result.id} />
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        {showModalInfo ? (
          <div>
            <div
              role="presentation"
              className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              onClick={handleToggleModal}
            >
              <div className="w-4/5 h-3/4 md:h-2/3 lg:h-3/4 relative overflow-x-hidden rounded-lg">
                <div
                  role="presentation"
                  className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <ProductInfo />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <p className="text-4xl">
        Désolé, votre recherche n'a rendu aucun résultat
      </p>
    </div>
  );
}
