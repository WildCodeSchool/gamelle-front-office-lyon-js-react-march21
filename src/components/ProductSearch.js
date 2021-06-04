import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function ProductSearch() {
  const apiBase = process.env.REACT_APP_API_BASE_URL;
  const { register, handleSubmit } = useForm();
  const onSubmit = (form) => {
    axios
      .post(`${apiBase}/searches`, form)
      .then((res) => console.log(res.data))
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
                {...register('brandName', { required: true })}
                defaultValue="title"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="title" disabled>
                  Sélectionnez une marque
                </option>
                <option value="Carrefour">Carrefour</option>
                <option value="Hill's Prescription Diet">
                  Hill's Prescription Diet
                </option>
                <option value="Friskies">Friskies</option>
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
                <option value="title" disabled>
                  Sélectionnez un type d'aliments
                </option>
                <option value="Aliments Secs">Aliments Secs</option>
                <option value="Aliments Humides ">Aliments Humides</option>
                <option value="Friandises">Friandises</option>
              </select>
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="animalCategoryName">
              Pour :
              <select
                {...register('animalCategoryName', { required: true })}
                defaultValue="title"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="title" disabled>
                  Sélectionnez une catégorie
                </option>
                <option value="Chaton">Chaton</option>
                <option value="Chat adulte">Chat adulte</option>
                <option value="Chat senior">Chat senior</option>
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
