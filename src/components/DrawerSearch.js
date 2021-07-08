/* eslint-disable */
import { useState } from 'react';
import ProductSearch from './ProductSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function DrawerSearch() {
  const [drawer, setDrawer] = useState(false);
  const handleToggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <div>
      <button
        type="button"
        className="w-20 dark:text-white absolute cursor-pointer flex justify-start bg-warning"
        onClick={handleToggleDrawer}
      >
        {drawer ? null : <FontAwesomeIcon icon={faSearch} />}
      </button>
      <div
        className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out${
          drawer
            ? ' transition-opacity opacity-100 duration-1000 -translate-x-0  '
            : ' transition-all duration-1000 delay-1000 opacity-0 -translate-x-full  '
        }`}
      >
        <section
          className={` w-screen max-w-lg absolute bg-transparent h-full duration-1000 transition-all transform ${
            drawer ? ' -translate-x-0 ' : ' -translate-x-full '
          }`}
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 h-full">
            <header className=" font-bold text-lg">
              <ProductSearch />
            </header>
          </article>
        </section>
        <section
          className=" w-screen h-full"
          onClick={() => {
            setDrawer(false);
          }}
        ></section>
      </div>
    </div>
  );
}

export default DrawerSearch;
