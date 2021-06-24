/* eslint-disable */
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ProductInfo from './ProductInfo';
import ResultsProducts from './ResultsProducts';

export default function ModalInfo() {
  const history = useHistory();
  const [showModalInfo, setShowModalInfo] = useState(false);
  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

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
                  history.goBack();
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
