import { createContext, useState } from 'react';

export const FoodContext = createContext(null);

export default function FoodContextProvider({ children }) {
  const [foodDetails, setFoodDetails] = useState([]);

  return (
    <FoodContext.Provider value={{ foodDetails, setFoodDetails }}>
      {children}
    </FoodContext.Provider>
  );
}
