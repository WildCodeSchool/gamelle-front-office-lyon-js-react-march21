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
      <p className="hidden italic md:flex md:text-base lg:flex lg:text-lg px-4">
        Pour effectuer une recherche, veuillez cliquer sur l'icône de recherche
        à gauche de l'écran
      </p>
      <p className="flex md:hidden lg:hidden text-center text-xs italic px-4">
        Pour effectuer une recherche, veuillez cliquer sur l'icône de recherche
        en bas de votre écran
      </p>
    </div>
  ) : resultsList.length !== 0 ? (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="m-6">{`Les ${resultsList.length} résultats de votre recherche`}</h1>
      <div className="w-9/12 md:w-8/12">
        <ul>
          {resultsList.map((result) => (
            <li key={result.id} className="mb-6 rounded-lg w-full shadow-xl">
              <NavLink
                to={{
                  pathname: `/product-info-page/?id=${result.id}`,
                  state: { background: location },
                }}
              >
                <div
                  className="py-7 p-5 bg-white rounded-lg w-full flex flex-col md:flex-row items-center md:transform transition duration-500 hover:scale-95 lg:transform lg:hover:scale-105"
                  onClick={handleToggleModal}
                  role="presentation"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="p-1 w-full h-72 rounded-lg md:rounded-xl lg:rounded-lg object-contain md:h-40 md:w-40 lg:h-40 lg:w-40 " // Taille d'image à redéfinir !!
                  />

                  <p className="text-base w-full text-center font-bold mt-3">
                    {result.name}
                  </p>
                  <br />
                  <div className="flex justify-center">
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
              className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none "
              onClick={handleToggleModal}
            >
              <div className="w-11/12 h-4/5 md:h-2/3 lg:h-3/4 relative overflow-x-hidden rounded-lg ">
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
