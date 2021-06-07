import { useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';
import ResultsContext from './contexts/ResultsContext';

function App() {
  const [resultsList, setResultsList] = useState([]);

  return (
    <ResultsContext.Provider value={{ resultsList, setResultsList }}>
      <div className="bg-grey dark:bg-darkblue">
        <ToastProvider>
          <Header />
          <Main />
        </ToastProvider>
      </div>
    </ResultsContext.Provider>
  );
}

export default App;
