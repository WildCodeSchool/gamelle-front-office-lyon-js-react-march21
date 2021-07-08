/* eslint-disable */
import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ResultsContext } from '../contexts/ResultsContext';
import ModalInfo from './ModalInfo';

export default function ResultsProducts() {
  const location = useLocation();
  const { resultsList } = useContext(ResultsContext);

  return (
    resultsList.length !== 0 && (
      <div className="flex items-center flex-col justify-center relative">
        <div className="titre flex justify-center">
          <h1 className="mt-6 text-center text-5xl font-extrabold m-16">
            Les résultats de votre recherche
          </h1>
        </div>
        <br />
        <ul>
          {resultsList.map((result) => (
            <li key={result.id}>
              <NavLink
                className="flex items-center py-2 w-2/3 md:w-1/2 lg:w-full"
                to={{
                  pathname: `/product-info-pag/?id=${result.id}`,
                  state: { background: location },
                }}
              >
                <div className="flex items-center bg-white shadow-lg py-2 w-full rounded-md h-48 md:">
                  <img
                    className=" flex-none w-28 h-28 lg:h-20 lg:w-20 object-cover rounded-xl  md:h-40 md:w-40 "
                    src={result.image}
                    alt={result.name}
                  />
                  <div>
                    <p className="font-bold text-base md:text-xl ">
                      {result.brand}
                    </p>
                    <p className="text-sm md:text-base">{result.name}</p>
                  </div>
                  <ModalInfo />
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
