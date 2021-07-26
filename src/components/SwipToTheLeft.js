/* eslint-disable */
import React, { useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';
import { DrawerContext } from '../contexts/DrawerContext';
import './SwipToTheLeft.css';

export default function SwipToTheLeft() {
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
      {['left'].map((anchor) => (
        <div key={anchor} className="min-h-screen flex fixed z-50" id="drawer">
          <Button
            style={{ backgroundColor: 'transparent' }}
            onClick={toggleDrawer(anchor, true)}
            title="Cliquer ici pour ouvrir la barre de recherche"
          >
            <FontAwesomeIcon icon={faSearch} className="animate-wiggle z-50" />
          </Button>
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
