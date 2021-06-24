/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import qs from 'query-string';
import ProductInfo from './ProductInfo';
import FoodContext from '../contexts/FoodContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const apiBase = process.env.REACT_APP_API_BASE_URL;
function ModalInfo() {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { foodDetails, setFoodDetails } = useContext(FoodContext);
  const { id } = qs.parse(window.location.search);
  const { profile } = useContext(CurrentUserContext);
  const [favoriteStatus, setFavoriteStatus] = useState(null);
  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

  useEffect(() => {
    axios
      .get(`${apiBase}/foods/${id}`)
      .then(async (res) => {
        await setFoodDetails(res.data);
        if (profile !== null) {
          const userId = profile.id;
          const foodId = parseInt(id, 10);
          axios
            .post(`${apiBase}/histories`, { foodId, userId })
            .then((hist) => {
              setFavoriteStatus(hist.data.favoriteId);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div
        className=" px-3 py-2 bg-primary text-white font-bold uppercase text-xs cursor-pointer hover:opacity-75 dark:bg-darkpurple"
        onClick={handleToggleModal}
      >
        Show more
      </div>
      {showModalInfo ? (
        <div>
          <div
            className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={handleToggleModal}
          >
            <div className="w-3/4 h-1/2 relative my-6">
              {/*content*/}
              <div
                className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
              >
                {/*header*/}
                <ProductInfo />
                {/*body*/}
                <div className="relative p-6 flex justify-center align-center"></div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 blueGray-200 rounded-b">
                  <button
                    className="text-white font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 bg-primary  border border-transparent hover:bg-secondary rounded-lg dark:bg-darkpurple"
                    type="button"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}
export default ModalInfo;
