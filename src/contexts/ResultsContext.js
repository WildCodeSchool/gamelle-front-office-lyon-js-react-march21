import { createContext, useState } from 'react';

export const ResultsContext = createContext(null);

export default function ResultsContextProvider({ children }) {
  const [resultsList, setResultsList] = useState([]);

  return (
    <ResultsContext.Provider value={{ resultsList, setResultsList }}>
      {children}
    </ResultsContext.Provider>
  );
}
