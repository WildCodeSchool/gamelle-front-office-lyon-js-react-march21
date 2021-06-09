import { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';
import CurrentUserContextProvider from './contexts/CurrentUserContext';

function App() {
  const [resultsList, setResultsList] = useState([]);
  return (
    <div className="bg-grey dark:bg-darkblue">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        placement="bottom-right"
      >
        <CurrentUserContextProvider>
          <ResultsContext.Provider value={{ resultsList, setResultsList }}>
            <Header />
            <Main />
          </ResultsContext.Provider>
        </CurrentUserContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
