/* eslint-disable */

import { useContext, useState } from 'react';
import SignIn from './SignIn';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function ModalSignIn() {
  const { showModal, setShowModal } = useContext(CurrentUserContext);
  return (
    <div>
      <div
        className=" px-3 py-2 bg-primary text-white font-bold uppercase text-sm cursor-pointer hover:opacity-75 dark:bg-darkpurple"
        onClick={() => setShowModal(true)}
      >
        S'identifier
      </div>
      {showModal ? (
        <div>
          <div
            className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
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
                {/*body*/}
                <div className="relative p-6 flex justify-center align-center">
                  <SignIn />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 blueGray-200 rounded-b">
                  <button
                    className="text-white font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 bg-primary  border border-transparent hover:bg-secondary rounded-lg dark:bg-darkpurple"
                    type="button"
                    onClick={() => setShowModal(false)}
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
