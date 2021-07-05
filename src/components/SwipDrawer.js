/* eslint-disable */
import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductSearch from './ProductSearch';

export default function SwipDrawer() {
  const [drawer, setDrawer] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setDrawer({ left: true });
    }, 1500);
  }, []);

  const leaveDrawer = (e) => {
    e.stopPropagation();
  };

  const toggleDrawer = (anchor, open) => () => {
    setDrawer({ ...drawer, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      role="presentation"
      onClick={(toggleDrawer(anchor, false), leaveDrawer)}
    >
      <ProductSearch />
    </div>
  );
  return (
    <div className="flex justify-between">
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={drawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {' '}
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
