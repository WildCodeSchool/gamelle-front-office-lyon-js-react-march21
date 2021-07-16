import { createContext, useState } from 'react';

export const ResultsContext = createContext(null);

export default function ResultsContextProvider({ children }) {
  const [resultsList, setResultsList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <ResultsContext.Provider
      value={{ resultsList, setResultsList, hasSearched, setHasSearched }}
    >
      {children}
    </ResultsContext.Provider>
  );
}
