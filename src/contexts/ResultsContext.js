import { createContext, useState } from 'react';

export const ResultsContext = createContext(null);

export default function ResultsContextProvider({ children }) {
  const [resultsList, setResultsList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentBrand, setCurrentBrand] = useState('');
  const [currentAnimalCategoryId, setCurrentAnimalCategoryId] = useState('');
  const [currentFoodTypeId, setCurrentFoodTypeId] = useState('');
  const [currentSearchedText, setCurrentSearchedText] = useState('');
  return (
    <ResultsContext.Provider
      value={{
        currentBrand,
        setCurrentBrand,
        currentAnimalCategoryId,
        setCurrentAnimalCategoryId,
        currentFoodTypeId,
        setCurrentFoodTypeId,
        resultsList,
        setResultsList,
        hasSearched,
        setHasSearched,
        currentSearchedText,
        setCurrentSearchedText,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}
