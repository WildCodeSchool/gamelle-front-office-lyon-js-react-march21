import { useContext } from 'react';
import SignIn from './SignIn';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function ModalSignIn() {
  const { showModal, setShowModal } = useContext(CurrentUserContext);
  return (
    <div>
      {showModal ? (
        <div>
          <div
            role="none"
            className="bg-opaque justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="w-11/12 md:w-1/3 relative my-6">
              <div
                role="none"
                className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="relative p-6 flex justify-center align-center">
                  <SignIn />
                </div>

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
        </div>
      ) : null}
    </div>
  );
}
