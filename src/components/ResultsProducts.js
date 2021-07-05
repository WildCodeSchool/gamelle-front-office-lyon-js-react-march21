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
      <div className="flex items-center flex-col justify-center p-5 relative mx-10">
        <div className="titre flex justify-center">
          <h1 className="mt-6 text-center text-3xl font-extrabold m-16">
            Les résultats de votre recherche
          </h1>
        </div>
        <br />

        <ul>
          {resultsList.map((result) => (
            <li key={result.id}>
              <NavLink
                className="flex items-center bg-white shadow-lg px-5 py-2 m-5"
                to={{
                  pathname: `/product-info/?id=${result.id}`,
                  state: { background: location },
                }}
              >
                <div className="flex items-center bg-white shadow-lg px-5 py-2 m-5">
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
                    <div>
                      <ModalInfo />
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
