import React, { useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';
import { DrawerContext } from '../contexts/DrawerContext';

export default function SwipToTheRight() {
  const { drawer, toggleDrawer, leaveDrawer } = useContext(DrawerContext);

  const list = (anchor) => (
    <div role="none" onClick={(toggleDrawer(anchor, false), leaveDrawer)}>
      <ProductSearch />
    </div>
  );

  return (
    <>
      {['right'].map((anchor) => (
        <div key={anchor} className="flex">
          <Button
            style={{ backgroundColor: 'transparent' }}
            onClick={toggleDrawer(anchor, true)}
            title="Cliquer ici pour ouvrir la barre de recherche"
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              className="animate-reverseWiggle hidden md:flex lg:flex"
            />
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
