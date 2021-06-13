// import axios from 'axios';
import { useContext } from 'react';
// import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import ResultsContext from '../contexts/ResultsContext';
// import FoodContext from '../contexts/FoodContext';

export default function ResultsPage() {
  const { resultsList } = useContext(ResultsContext);
  // const history = useHistory();
  // const apiBase = process.env.REACT_APP_API_BASE_URL;
  // const { setFoodDetails } = useContext(FoodContext);

  // const goToDetails = (id) => {
  //   axios
  //     .get(`${apiBase}/foods/${id}`)
  //     .then((res) => {
  //       setFoodDetails(res);
  //       console.log('gotodetails    ', res);
  //       history.push(`/ficheproduit/${id}`);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return resultsList.length !== 0 ? (
    <div className="flex items-center flex-col justify-center">
      <div className="titre ">
        <h1 className="mt-6 text-center text-3xl font-extrabold">
          Les résultats de votre recherche
        </h1>
      </div>
      <br />

      <ul>
        {resultsList.map((result) => (
          <li key={result.id}>
            <NavLink
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
              to={{
                pathname: `/ficheproduit`,
                state: {
                  productId: result.id,
                },
              }}
            >
              {/* <button
              className="flex items-center bg-white shadow shadow-lg px-5 py-2 m-5"
              type="button"
              onClick={() => goToDetails(result.id)}
            > */}
              <img
                className="w-40 h-40 bg-auto rounded-xl mr-5"
                src={result.image}
                alt={result.name}
              />
              <div>
                <p className="font-bold text-xl">{result.brand}</p>
                <p className="text-base">{result.name}</p>
                <p className="text-base">{result.barcode}</p>
              </div>
              {/* </button> */}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <h1>Désolé, votre recherche n'a produit aucun résultat</h1>
  );
}
