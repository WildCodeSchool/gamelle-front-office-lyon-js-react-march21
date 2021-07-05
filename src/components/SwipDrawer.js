/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';

export default function SwipDrawer() {
  const [state, setState] = useState({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setState({ top: true });
    }, 2000);
  }, []);

  const sprite = (e) => {
    e.stopPropagation();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div role="presentation" onClick={(toggleDrawer(anchor, false), sprite)}>
      <ProductSearch />
    </div>
  );
  return (
    <div className="flex hidden">
      {['top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            onDoubleClick={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
