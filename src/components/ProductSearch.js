/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import API from '../APIClient';
import { ResultsContext } from '../contexts/ResultsContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DeviceContext } from '../contexts/DeviceContext';
import { DrawerContext } from '../contexts/DrawerContext';

export default function ProductSearch() {
  const [brandList, setBrandList] = useState(null);
  const [foodTypeList, setFoodTypeList] = useState(null);
  const [animalCategoryList, setAnimalCategoryList] = useState(null);
  const { profile } = useContext(CurrentUserContext);
  const { setResultsList } = useContext(ResultsContext);
  const { userDevice } = useContext(DeviceContext);
  const [statsInfos, setStatsInfos] = useState(null);
  const { setDrawer } = useContext(DrawerContext);

  useEffect(() => {
    API.get(`/searches`)
      .then((res) => {
        setBrandList(res.data[0]);
        setFoodTypeList(res.data[1]);
        setAnimalCategoryList(res.data[2]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (statsInfos)
      API.post(`/statistics`, statsInfos)
        .then(() => {})
        .catch((err) => console.log(err));
  }, [statsInfos]);

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (form) => {
    API.post(`/searches`, form)
      .then(async (res) => {
        setResultsList(res.data);

        // update statistics
        const userId = profile ? profile.id : null;
        setStatsInfos({
          userId,
          requestInfo: 'search',
          brand: form.brand,
          foodTypeId:
            form.foodTypeId !== '' ? parseInt(form.foodTypeId, 10) : null,
          animalCategoryId:
            form.animalCategoryId !== ''
              ? parseInt(form.animalCategoryId, 10)
              : null,
          searchText: form.searchedWords,
          device: userDevice.device,
          osName: userDevice.osName,
          requestSentAt: new Date(),
          ipv4Address: userDevice.ipv4Address,
          ipv6Address: userDevice.ipv6Address,
        });
      })
      .catch((err) => console.log(err));
  };

  const bigBrother = watch('brand');

  return (
    <div className="bg-grey h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 m-16">
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
              Marque <span className="text-danger">*</span> :
              <select
                {...register('brand', { required: true })}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une marque
                </option>
                {brandList &&
                  brandList.map((element) => (
                    <option key={element.brand} value={element.brand}>
                      {element.brand}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="foodTypeId">
              Type d'aliment :
              <select
                {...register('foodTypeId')}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez un type d'aliments
                </option>
                {foodTypeList &&
                  foodTypeList.map((element) => (
                    <option key={element.name} value={element.id}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="animalCategoryId">
              Pour :
              <select
                {...register('animalCategoryId')}
                defaultValue=""
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option key="title" value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {animalCategoryList &&
                  animalCategoryList.map((element) => (
                    <option key={element.name} value={element.id}>
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
              onClick={() => setDrawer(false)}
              type="submit"
              // eslint-disable-next-line no-unneeded-ternary
              disabled={bigBrother ? false : true}
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
