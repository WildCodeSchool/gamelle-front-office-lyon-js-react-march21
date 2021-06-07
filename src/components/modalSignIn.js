/* eslint-disable */

import { useState } from "react";
import SignIn from "./SignIn";

export default function ModalSignIn() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        className=" px-3 py-2 bg-primary text-white font-bold uppercase text-xs cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        S'identifier
      </div>
      {showModal ? (
        <div>
          <div className="bg-transparent justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/2 h-1/2 relative my-6 ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <div className="relative p-6 flex justify-center align-center">
                  <SignIn />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 blueGray-200 rounded-b">
                  <button
                    className="text-white  font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 bg-primary  border border-transparent hover:bg-secondary rounded-lg"
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
      ) : null
      }
    </div >
  );
}