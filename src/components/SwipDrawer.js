/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';
import { DrawerContext } from '../contexts/DrawerContext';

export default function SwipDrawer() {
  const { drawer, toggleDrawer, leaveDrawer } = useContext(DrawerContext);

  const list = (anchor) => (
    <div role="none" onClick={(toggleDrawer(anchor, false), leaveDrawer)}>
      <ProductSearch />
    </div>
  );

  return (
    <div className="w-screen min-h-screen flex justify-between fixed">
      {['left'].map((anchor) => (
        <div key={anchor} className="flex">
          <Button
            style={{ backgroundColor: 'transparent' }}
            onClick={toggleDrawer(anchor, true)}
            title="Cliquer ici pour ouvrir la barre de recherche"
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="animate-wiggle"
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
      {['right'].map((anchor) => (
        <div key={anchor} className="flex">
          <Button
            style={{ backgroundColor: 'transparent' }}
            onClick={toggleDrawer(anchor, true)}
            title="cliqué pour ouvrir la recherche"
          >
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              className="animate-reverseWiggle"
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
    </div>
  );
}
