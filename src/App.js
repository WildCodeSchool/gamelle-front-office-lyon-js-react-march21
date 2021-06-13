import { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';
import FoodContext from './contexts/FoodContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';

function App() {
  const [resultsList, setResultsList] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);

  return (
    <div className="bg-grey dark:bg-darkblue">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <ResultsContext.Provider value={{ resultsList, setResultsList }}>
            <FoodContext.Provider value={{ foodDetails, setFoodDetails }}>
              <Header />
              <Main />
            </FoodContext.Provider>
          </ResultsContext.Provider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
