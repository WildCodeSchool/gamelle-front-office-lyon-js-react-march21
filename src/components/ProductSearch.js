/* eslint-disable no-console */
import axios from 'axios';
import { useHistory } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ResultsContext from '../contexts/ResultsContext';

export default function ProductSearch() {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  const history = useHistory();
  const [brandList, setBrandList] = useState(null);
  const [foodTypeList, setFoodTypeList] = useState(null);
  const [animalCategoryList, setAnimalCategoryList] = useState(null);
  const { setResultsList } = useContext(ResultsContext);

  useEffect(() => {
    axios
      .get(`${apiBase}/searches`)
      .then((res) => {
        setBrandList(res.data[0]);
        setFoodTypeList(res.data[1]);
        setAnimalCategoryList(res.data[2]);
      })
      .catch((err) => console.log(err));
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = (form) => {
    axios
      .post(`${apiBase}/searches`, form)
      .then((res) => {
        setResultsList(res.data);
        history.push('/resultats');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Rechercher un produit
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="send"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="mb-3">
            <label htmlFor="brandName">
              Marque :
              <select
                {...register('brand', { required: true })}
                defaultValue="title"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="title" disabled>
                  Sélectionnez une marque
                </option>
                {brandList &&
                  brandList.map((element) => (
                    <option key={element.brand} value={element.brand}>
                      {element.brand}
                    </option>
                  ))}{' '}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="foodTypeName">
              Type d'aliment :
              <select
                {...register('foodTypeName', { required: true })}
                defaultValue="title"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="title" disabled>
                  Sélectionnez un type d'aliments
                </option>
                {foodTypeList &&
                  foodTypeList.map((element) => (
                    <option key={element.name} value={element.name}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="animalCategoryName">
              Pour :
              <select
                {...register('animalCategoryName', { required: 'required' })}
                defaultValue="title"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="title" disabled>
                  Sélectionnez une catégorie
                </option>
                {animalCategoryList &&
                  animalCategoryList.map((element) => (
                    <option key={element.name} value={element.name}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="searchedWords">
              Nom :
              <input
                {...register('searchedWords')}
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Vous pouvez saisir ici le nom de l'aliment"
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-darkpurple"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
