import { createContext, useState } from 'react';

export const DrawerContext = createContext(null);

export default function DrawerContextProvider({ children }) {
  const [drawer, setDrawer] = useState({
    left: true,
    right: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setDrawer({ ...drawer, [anchor]: open });
  };

  const leaveDrawer = (e) => {
    e.stopPropagation();
  };

  return (
    <DrawerContext.Provider
      value={{ drawer, setDrawer, toggleDrawer, leaveDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
