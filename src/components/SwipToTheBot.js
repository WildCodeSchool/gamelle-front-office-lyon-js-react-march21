import React, { useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';
import { DrawerContext } from '../contexts/DrawerContext';

export default function SwipToTheBot() {
  const { drawer, toggleDrawer, leaveDrawer } = useContext(DrawerContext);

  const list = (anchor) => (
    <div
      role="none"
      onClick={(e) => {
        toggleDrawer(anchor, false);
        leaveDrawer(e);
      }}
    >
      <ProductSearch />
    </div>
  );
  return (
    <>
      {['bottom'].map((anchor) => (
        <div key={anchor} className="w-screen flex fixed justify-end z-40">
          <div className="w-full">
            <section className="md:hidden fixed inset-x-0 bottom-0 z-10 bg-white shadow h-10 flex justify-center items-center">
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  onClick={toggleDrawer(anchor, true)}
                />
                <p className="text-xs">Recherche</p>
              </div>
            </section>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={drawer[anchor] || false}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </div>
      ))}
    </>
  );
}
