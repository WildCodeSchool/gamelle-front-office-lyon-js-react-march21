/* eslint-disable */
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ProductInfo from './ProductInfo';
import ResultsProducts from './ResultsProducts';

export default function ModalInfo() {
  const history = useHistory();
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { id } = useParams();
  const handleToggleModal = () => {
    setShowModalInfo(!showModalInfo);
  };

  return (
    <div>
      <div
        className=" px-3 py-2 bg-primary text-white font-bold uppercase text-xs cursor-pointer hover:opacity-75"
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
            <div className="w-4/5 h-3/4 md:h-2/3 lg:h-3/4 relative overflow-x-hidden rounded-lg">
              {/*content*/}
              <div
                className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {/*header*/}
                <ProductInfo />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
