/* eslint-disable */
import { useState, useContext, useEffect } from 'react';
import ResultsContext from '../contexts/ResultsContext';
import FoodContext from '../contexts/FoodContext';
import ModalInfo from './ModalInfo';

export default function ResultsProducts() {
  const { resultsList } = useContext(ResultsContext);
  const { setFoodDetails } = useContext(FoodContext);
  const [drawer, setDrawer] = useState(false);
  const handleToggleDrawer = () => {
    setDrawer(!drawer);
  };

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
                  <div
                    className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out${
                      drawer
                        ? ' transition-opacity opacity-100 duration-1000 -translate-x-0  '
                        : ' transition-all duration-1000 delay-1000 opacity-0 -translate-x-full  '
                    }`}
                  >
                    <section
                      className={` w-screen max-w-lg absolute bg-transparent h-full duration-1000 transition-all transform ${
                        drawer ? ' -translate-x-0 ' : ' -translate-x-full '
                      }`}
                    >
                      <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 h-full">
                        <header className=" font-bold text-lg"></header>
                      </article>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Désolé, votre recherche n'a produit aucun résultat</h1>
  );
}
